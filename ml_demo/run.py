import sys
import json
import time
import beanstalkc
import tornado.ioloop
import tornado.web

from threading import Thread
from job import jobs, JobInfo
from train import Trainer
from predict import Predictor

from config import BEANSTALK_HOST, BEANSTALK_PORT, BEANSTALK_YAML
from constant import TRAIN, PREDICT

io_loop = tornado.ioloop.IOLoop.instance()

def create_beanstalk():
    beanstalk = beanstalkc.Connection(host=BEANSTALK_HOST, port=BEANSTALK_PORT, parse_yaml=BEANSTALK_YAML)
    return beanstalk

class WorkflowHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("workflow.html")
    
class JobCheckHandler(tornado.web.RequestHandler):
    @tornado.web.asynchronous
    def get(self, jobId):
        jobId = int(jobId)
        jobInfo = jobs.get(jobId, None)
        if jobInfo is None:
            jobInfo = JobInfo(jobId)
            jobs[jobId] = jobInfo
        if jobInfo.data is not None:
            self.write(jobInfo.data)
            self.finish()
            return
        jobInfo.handlers.append(self)

class TrainHandler(tornado.web.RequestHandler):
    def post(self):
        data = json.loads(self.request.body)
        data["jobType"] = TRAIN
        beanstalk = create_beanstalk()
        ts = int(time.time())
        jobId = beanstalk.put(json.dumps(data))
        self.write(json.dumps({"jobId": jobId, "ts": ts}))
        beanstalk.close()
        return

class PredictHandler(tornado.web.RequestHandler):
    def post(self):
        data = json.loads(self.request.body)
        data["jobType"] = PREDICT
        beanstalk = create_beanstalk()
        ts = int(time.time())
        jobId = beanstalk.put(json.dumps(data))
        self.write(json.dumps({"jobId": jobId, "ts": ts}))
        beanstalk.close()
        return
    
def main():
    application = tornado.web.Application([
        (r"/train/", TrainHandler),
        (r"/predict/", PredictHandler),
        (r"/check/(\d*)/", JobCheckHandler),
        (r"/workflow/", WorkflowHandler),
        (r'/static/(.*)', tornado.web.StaticFileHandler, {'path': "./static/"})
    ], template_path="./template")
    
    application.listen(8888)
    io_loop.start()
    
def job_main():
    beanstalk = create_beanstalk()
    print "Job queue starts..."
    try:
        while True:
            try:
                job = beanstalk.reserve()
            except beanstalkc.DeadlineSoon:
                continue
            request = json.loads(job.body)
            jobId = job.jid
            print 'Working on job %s...' % jobId
            try:
                jobType = request["jobType"]
                if jobType == TRAIN:
                    category = request["category"]
                    model = request["model"]
                    trainer = Trainer.create(category, model)
                    if trainer:
                        data = {}
                        data["table_name"] = request["inputTableName"]
                        data["feature_names"] = request.get("features", None)
                        data["target_name"] = request.get("target", None)
                        ret = trainer.run(**data)
                        print 'Job %s finished.' % jobId
                    else:
                        ret = []
                        print 'No trainer for job %s.' % jobId
                elif jobType == PREDICT:
                    modelId = request["modelId"]
                    predictor = Predictor(modelId)
                    data = {}
                    data["table_name"] = request["inputTableName"]
                    ret = predictor.run(**data)
                    print 'Job %s finished.' % jobId
            except:
                ret = []
                print 'Error on job %s.' % jobId
            job.delete()
            #time.sleep(30)
            io_loop.add_callback(job_finished, jobId, ret)
    except (KeyboardInterrupt, SystemExit):
        beanstalk.close()
        sys.exit()

def job_finished(jobId, data):
    jobInfo = jobs.get(jobId, None)
    if jobInfo is None:
        jobInfo = JobInfo(jobId)
        jobs[jobId] = jobInfo
    jobInfo.data = data
    for h in jobInfo.handlers:
        h.write(jobInfo.data)
        h.finish()
    del jobInfo.handlers[:]
    
if __name__ == '__main__':
    job_thread = Thread(target=job_main)
    job_thread.daemon = True
    job_thread.start()
    main()
