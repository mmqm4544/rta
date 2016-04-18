import os

from datetime import datetime

"""
Work with database driver that is compliant with Python Database API Specification v2.0 (PEP 249)
"""

SQLITE = "sqlite"
MYSQL = "mysql"

DATASET_DIR = "./dataset"

DEFAULT_DB_NAME = "test"

DATE_FORMAT = "%Y-%m-%d"

class NoConnectionException(Exception):
    pass
    
class DBClient(object):
    def __init__(self, **kwargs):
        self.conf = kwargs
        self.conn = None

    def connect(self):
        pass
    
    def query(self, stmt, *args):
        if not self.conn:
            raise NoConnectionException
        ret = None
        cursor = self.conn.cursor()
        cursor.execute(stmt, args)
        if stmt.startswith("SELECT") or stmt.startswith("select"):
            ret = cursor.fetchall()
        cursor.close()
        return ret

    def commit(self):
        if not self.conn:
            raise NoConnectionException
        self.conn.commit()

    def close(self):
        if not self.conn:
            raise NoConnectionException
        self.conn.close()

    def getTableSchema(self, name):
        pass

    @classmethod
    def create(cls):
        from config import DB_TYPE, DB_DATABASE, DB_HOST, DB_PORT, DB_USER, DB_PWD
        client = None
        if DB_TYPE == SQLITE:
            client = SQLiteClient()
            client.connect(database="%s.db" % DB_DATABASE)
        elif DB_TYPE == MYSQL:
            client = MySQLClient()
            client.connect(host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PWD, database=DB_DATABASE)
        return client


class SQLiteClient(DBClient):
    def __init__(self, **kwargs):
        pass

    def connect(self, **kwargs):
        database = kwargs.get("databse", DEFAULT_DB_NAME)
        import sqlite3
        self.conn = sqlite3.connect("%s.db" % database)

    def getTableSchema(self, name):
        if not self.conn:
            raise NoConnectionException
        cursor = self.conn.cursor()
        cursor.execute("PRAGMA table_info (%s)" % name)
        result = cursor.fetchall()
        ret = []
        for col in result:
            ret.append({"name": col[1], "type": col[2]})
        return ret

class MySQLClient(DBClient):
    def __init__(self, **kwargs):
        pass

    def connect(self, **kwargs):
        host = kwargs.get("host", "localhost")
        port = kwargs.get("port", 3306)
        user = kwargs.get("user", "root")
        password = kwargs.get("password", "")
        database = kwargs.get("databse", DEFAULT_DB_NAME)
        import MySQLdb
        self.conn = MySQLdb.connect(host=host, port=port, user=user, passwd=password, db=database)

    def getTableSchema(self, name):
        if not self.conn:
            raise NoConnectionException
        cursor = self.conn.cursor()
        cursor.execute("DESCRIBE %s" % name)
        result = cursor.fetchall()
        ret = []
        for col in result:
            ret.append({"name": col[0], "type": col[1]})
        return ret
    
def init_dataset():
    client = DBClient.create()
    for file_name in os.listdir(DATASET_DIR):
        if file_name.endswith(".csv"):
            with open(os.path.join(DATASET_DIR, file_name), 'rU') as csv_file:
                value_list = []
                for idx, line in enumerate(csv_file.readlines()):
                    tokens = line.strip().split(',')
                    if idx == 0:
                        name_list = tokens
                    elif idx == 1:
                        type_list = infer_schema((tokens, ))
                    if idx != 0:
                        value_list.append(tokens)
                table_name = os.path.splitext(file_name)[0]
                client.query("drop table if exists %s" % table_name)
                client.query("create table %s (%s)" % (table_name, ','.join(['%s %s' % (name, _type) for name, _type in zip(name_list, type_list)])))
            for value in value_list:
                transform_value = []
                for item, _type in zip(value, type_list):
                    if _type == "float":
                        item = str(float(item))
                    elif _type == "int":
                        item = str(int(item))
                    else:
                        if '"' not in item:
                            item = '"%s"' % item
                    transform_value.append(item)
                client.query("insert into %s values (%s)" % (table_name, ','.join(transform_value)))
        else:
            print "[%s] file format is not supported." % file_name
        client.commit()

def infer_schema(some_rows):
    attr_type_list = []
    for idx, row in enumerate(some_rows):
        if idx == 0:
            for value in row:
                attr_type = 'string'
                try:
                    value = int(value)
                    attr_type = 'int'
                except ValueError:
                    try:
                        value = float(value)
                        attr_type = 'float'
                    except ValueError:
                        pass
                try:
                    value = datetime.strptime(value, DATE_FORMAT)
                    attr_type = 'date'
                except (TypeError, ValueError):
                    pass
                attr_type_list.append(attr_type)
        else:
            pass
    return attr_type_list
        
if __name__ == '__main__':
    init_dataset()
