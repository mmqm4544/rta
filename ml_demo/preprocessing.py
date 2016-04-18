import time

from datetime import datetime

from db import DATE_FORMAT

class Preprocessor(object):
    pass

class SQLPreprocessor(Preprocessor):
    def __init__(self, client, table_name):
        self.client = client
        self.table_name = table_name
        self.meta_data = client.getTableSchema(self.table_name)

    def getTrainData(self, **kwargs):
        feature_names = kwargs.get("feature_names", None)
        target_name = kwargs.get("target_name", None)
        is_supervised = kwargs.get("is_supervised", False)
        
        client = self.client
        table_name = self.table_name
        meta_data = self.meta_data
        if is_supervised and not target_name:
            #use last column as default target
            target_name = meta_data[-1]["name"]
        if not feature_names:
            feature_names = []
            for item in meta_data:
                item_name = item["name"]
                if item_name != target_name:
                    feature_names.append(item_name)
        data = []
        targets = None
        if target_name != None:
            targets = client.query('select %s from %s' % (target_name, table_name))
        feature_records = client.query('select %s from %s' % (",".join(feature_names), table_name))
        self.transform(feature_names, feature_records, data)
        return feature_names, target_name, data, targets

    def getPredictData(self, feature_names):
        client = self.client
        table_name = self.table_name
        feature_idx = []
        records = client.query('select %s from %s' % (','.join(feature_names), table_name))
        data = []
        self.transform(feature_names, records, data)
        return records, data

    def outputPredictedData(self, feature_names, records, targets, isContinuous=False):
        outputTableName = self.createOutputTable(feature_names, isContinuous)
        self.insertOutputTable(feature_names, records, targets, outputTableName, isContinuous)
        self.client.commit()
        return outputTableName
        
    def createOutputTable(self, feature_names, isContinuous):
        client = self.client
        table_name = self.table_name
        meta_data = self.meta_data
        outputTableName = "%s_test_%s" % (table_name, int(time.time()))
        table_schema = []
        for feature_name in feature_names:
            for item in meta_data:
                if item["name"] == feature_name:
                    table_schema.append("%s %s" % (item["name"], item["type"]))
        if isContinuous:
            table_schema.append("predicted_value float")
        else:
            table_schema.append("predicted_value string")
        table_schema = "(%s)" % ",".join(table_schema)
        create_stmt = "create table if not exists %s %s" % (outputTableName, table_schema)
        client.query(create_stmt)
        return outputTableName

    def insertOutputTable(self, feature_names, records, targets, outputTableName, isContinuous):
        meta_data = self.meta_data
        client = self.client
        feature_types = []
        for feature_name in feature_names:
            for idx, item in enumerate(meta_data):
                if feature_name == item['name']:
                    feature_types.append(item['type'])
        
        values = []
        for i, record in enumerate(records):
            transform_record = []
            for idx, item in enumerate(record):
                if feature_types[idx] == "string" or feature_types[idx] == "date":
                    transform_record.append('"%s"' % item)
                else:
                    transform_record.append(str(item))
            if isContinuous:
                transform_record.append('%s' % targets[i])
            else:
                transform_record.append('"%s"' % targets[i])
            values.append('(%s)' % ','.join(transform_record))
        insert_stmt = "insert into %s values %s" % (outputTableName, ','.join(values))
        client.query(insert_stmt)
        
    def transform(self, feature_names, records, data):
        meta_data = self.meta_data
        #preprocessing for datetime attribute
        date_idx = []
        for idx, feature_name in enumerate(feature_names):
            feature_type = ''
            for item in meta_data:
                if item["name"] == feature_name:
                    feature_type = item["type"]
            if feature_type == "date":
                date_idx.append(idx)
        for record in records:
            transform_record = []
            for idx in range(len(record)):
                if idx in date_idx:
                    transform_record.append(datetime.strptime(record[idx], DATE_FORMAT).toordinal())
                else:
                    transform_record.append(record[idx])
            data.append(dict(zip(feature_names, transform_record)))
