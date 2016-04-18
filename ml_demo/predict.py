import os

from sklearn.externals import joblib

from preprocessing import SQLPreprocessor
from db import DBClient


class Predictor(object):
    def __init__(self, modelId):
        self.modelId = modelId
        self.client = DBClient.create()

    def run(self, **kargs):
        modelId = self.modelId
        table_name = kargs.get("table_name")
        feature_names = joblib.load('./model/%s_feature_names.pkl' % modelId)
        pipeline = joblib.load('./model/%s_pipeline.pkl' % modelId)
        if os.path.exists('./model/%s_le.pkl'):
            le = joblib.load('./model/%s_le.pkl' % modelId)
        else:
            le = None
        preprocessor = SQLPreprocessor(self.client, table_name)
        records, data = preprocessor.getPredictData(feature_names)

        predicted = pipeline.predict(data)
        if le is not None:
            predicted = le.inverse_transform(predicted).tolist()

        outputTableName = preprocessor.outputPredictedData(feature_names, records, predicted)
        
        return {"outputTableName": outputTableName}
