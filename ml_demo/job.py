jobs = {}

class JobInfo(object):
    def __init__(self, jobId):
        self.jobId = jobId
        self.data = None
        self.handlers = []
