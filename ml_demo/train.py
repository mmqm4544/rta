import uuid
import numpy as np

from sklearn import preprocessing
from sklearn.feature_extraction import DictVectorizer
from sklearn import cross_validation
from sklearn import svm
from sklearn import linear_model
from sklearn import cluster
from sklearn import metrics
from sklearn.pipeline import Pipeline
from sklearn.externals import joblib

from preprocessing import SQLPreprocessor
from db import DBClient
from constant import *

class Trainer(object):
    def __init__(self):
        self.modelId = str(uuid.uuid1())
        self.client = DBClient.create()
        
    def run(self, **kargs):
        pass

    @classmethod
    def create(cls, category, modelType):
        trainer = None
        if category == CLASSIFICATION:
            trainer = ClassificationTrainer.create(modelType)
        elif category == REGRESSION:
            trainer = RegressionTrainer.create(modelType)
        elif category == CLUSTERING:
            trainer = ClusteringTrainer.create(modelType)
        return trainer
        
class ClassificationTrainer(Trainer):
    def prepare(self, table_name, feature_names, target_name):
        #Get train data
        preprocessor = SQLPreprocessor(self.client, table_name)
        result = preprocessor.getTrainData(feature_names=feature_names, target_name=target_name, is_supervised=True)
        feature_names, target_name, data, targets = result
        labels = np.ravel(targets)

        #Transform label for prediction
        le = preprocessing.LabelEncoder()
        le.fit(labels)
        targets = le.transform(labels)
        
        self.feature_names = feature_names
        self.target_name = target_name
        
        return data, targets, le

    def persist(self, le, pipeline):
        modelId = self.modelId
        joblib.dump(self.feature_names, './model/%s_feature_names.pkl' % modelId)
        joblib.dump(self.target_name, './model/%s_target_name.pkl' % modelId)
        joblib.dump(pipeline, './model/%s_pipeline.pkl' % modelId)
        joblib.dump(le, './model/%s_le.pkl' % modelId)
        
    @classmethod
    def create(cls, modelType):
        trainer = None
        if modelType == "svm":
            trainer = SVMTrainer()
        return trainer

class RegressionTrainer(Trainer):
    def prepare(self, table_name, feature_names, target_name):
        preprocessor = SQLPreprocessor(self.client, table_name)
        
        result = preprocessor.getTrainData(feature_names=feature_names, target_name=target_name, is_supervised=True)

        feature_names, data, targets = result
        targets = np.ravel(targets)

        self.feature_names = feature_names
        self.target_name = target_name
        
        return data, targets

    def persist(self, pipeline):
        modelId = self.modelId
        joblib.dump(self.feature_names, './model/%s_feature_names.pkl' % modelId)
        joblib.dump(self.target_name, './model/%s_target_name.pkl' % modelId)
        joblib.dump(pipeline, './model/%s_pipeline.pkl' % modelId)
        
    @classmethod
    def create(cls, modelType):
        trainer = None
        if modelType == "lr":
            trainer = LRTrainer()
        return trainer

class ClusteringTrainer(Trainer):
    def prepare(self, table_name, feature_names, target_name):
        preprocessor = SQLPreprocessor(self.client, table_name)
        result = preprocessor.getTrainData(feature_names=feature_names, target_name=target_name, is_supervised=False)
        
        feature_names, target_name, data, targets = result
        if targets is not None:
            labels = np.ravel(targets)
            le = preprocessing.LabelEncoder()
            le.fit(labels)
            targets = le.transform(labels)
            
        self.feature_names = feature_names
        
        return data, targets

    def persist(self, pipeline):
        modelId = self.modelId
        joblib.dump(self.feature_names, './model/%s_feature_names.pkl' % modelId)
        joblib.dump(pipeline, './model/%s_pipeline.pkl' % modelId)
        
    @classmethod
    def create(cls, modelType):
        trainer = None
        if modelType == "kmeans":
            trainer = KMeansTrainer()
        return trainer    
        
class SVMTrainer(ClassificationTrainer):
    def run(self, **kargs):
        table_name = kargs.get("table_name")
        feature_names = kargs.get("feature_names")
        target_name = kargs.get("target_name")
        
        data, targets, le = self.prepare(table_name, feature_names, target_name)
        
        #create train and test data
        n_samples = len(data)
        X_train, X_test, y_train, y_test = cross_validation.train_test_split(data, targets, test_size=0.4, random_state=250)
        
        #pipeline for classification
        pipeline = Pipeline([
            ('vect', DictVectorizer()),
            ('clf', svm.SVC()),
        ])

        #fit model, test model
        pipeline.fit(X_train, y_train)
        predicted = pipeline.predict(X_test)
        precision = metrics.precision_score(y_test, predicted, average="weighted")
        recall = metrics.recall_score(y_test, predicted, average='weighted')

        self.persist(le, pipeline)

        return {"modelId": self.modelId, "precision": precision, "recall": recall}

class LRTrainer(RegressionTrainer):
    def run(self, **kargs):
        table_name = kargs.get("table_name")
        feature_names = kargs.get("feature_names")
        target_name = kargs.get("target_name")
        
        data, targets = self.prepare(table_name, feature_names, target_name)
        
        pipeline = Pipeline([
            ('vect', DictVectorizer()),
            ('clf', linear_model.LinearRegression()),
        ])
        
        n_samples = len(data)
        X_train, X_test, y_train, y_test = cross_validation.train_test_split(data, targets, test_size=0.4, random_state=250)
        
        pipeline.fit(X_train, y_train)
        predicted = pipeline.predict(X_test)
        
        mean_squared_error = metrics.mean_squared_error(y_test, predicted)
        r2_score = metrics.r2_score(y_test, predicted)

        self.persist(pipeline)
        
        return {"modelId": self.modelId, "mean_squared_error": mean_squared_error, "r2_score": r2_score}

class KMeansTrainer(ClusteringTrainer):
    def run(self, **kargs):
        table_name = kargs.get("table_name")
        feature_names = kargs.get("feature_names")
        target_name = kargs.get("target_name")
        n = kargs.get("n_clusters", DEFAULT_CLUSTER_NUMBER)

        #targets can be used for evaluation purpose
        data, targets = self.prepare(table_name, feature_names, target_name)
            
        pipeline = Pipeline([
            ('vect', DictVectorizer()),
            ('clf', cluster.KMeans(n_clusters=n))])
                
        pipeline.fit(data)
        predicted = pipeline.predict(data)

        self.persist(pipeline)

        if targets is not None:
            return {"modelId": self.modelId, "adjusted_rand_score": metrics.adjusted_rand_score(targets, predicted)}
        else:
            return {"modelId": self.modelId}
        
