**This is a prototype application to show some simple machine learning workflows.**

##Environment

* Database: [SQLite](https://docs.python.org/2/library/sqlite3.html) (Python has a built-in one)
* Database: [MySQL](https://www.mysql.com/downloads/) (not fully supported in this applciation yet)
* Work queue service: [beanstalkd](http://kr.github.io/beanstalkd/)
* Python libraries
	* Python >= 2.6
	* Web framework: ```pip install tornado```
	* Machine learning: ```pip install scikit-learn```
	* Beanstalkd driver: ```pip install beanstalkc```
	* MySQL driver: ```pip install MySQL-python```

##Configuration
* Edit config.py

	Configure database and work queue including hostname and port etc.
* Load deafault data

	Default datasets are stored in ```./dataset``` in CSV format.
	
	Run ```python db.py``` to load default datasets into database.
	
* Create dir to store machine learning models

	```mkdir model```


##Run

* Run ```python run.py``` to start web server at [http://localhost:8888](http://localhost:8888)

##API
####create a training job (async)
	URL: /train/
	
	Method: POST
	
	Input:
		inputTableName: required, SQL table name for tranining
		category: required, machine learning category including classification, regression, and clustering
		model: required, model type of the category
		features: features used to train the model, default is all the columns except the target
		target: target used as predict label or value in the model, default is the last column
		
	Input example:
		{
			"inputTableName": "iris",
			"category": "classification",
			"model": "svm",
			"features": ["sepal_width", "sepal_length"],
			"target": "class"
		}
		
	Output:
		jobId: job id to identify the training job
		ts: timestamp to indicate when the job is created
		
	Output example:
		{
			"jobId": 1,
			"ts": 1234567
		}

####create a prediction job (async)
	URL: /predict/
	
	Method: POST
	
	Input:
		inputTableName: required, SQL table name for prediction
		modelId: required, machine learning model for prediction		
	Input example:
		{
			"inputTableName": "iris",
			"modelId": "abcdefg"",
		}
		
	Output:
		jobId: job id to identify the prediction job
		ts: timestamp to indicate when the job is created
		
	Output example:
		{
			"jobId": 2,
			"ts": 1234567
		}
		
####check the result of a job (sync)
	URL: /check/(\d*)/
	
	Method: GET
	
	Input:
		jobId: job id to check
		
	Input example:
		/check/1/
		
	Output:
		results of the job
		
		//for tranining
		modelId: model id of the trained model
		//and also other indicators to show how good is the model
		
		//for prediction
		outputTableName: SQL table name of the prediction results
		
	Output example:
		{
			"modelId": "abcdefg",
			"precision": 0.6,
			"recall": 0.8
		}
		
		{
			"outputTableName": "iris_test_1234567"
		}

##Demo page
[http://localhost:8888/workflow/](http://localhost:8888/workflow/)

This page shows how to configure a simple machine learning workflow by invoking related APIs.

