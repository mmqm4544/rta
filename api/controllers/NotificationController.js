/**
 * NotificationController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var MySQLEvents = require('mysql-events');
var dsn = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306'
};

module.exports = {
  /**
   * `NotificationController.subscribe()`
   */
    subscribe: function (req, res) {
	if (req.headers.accept && req.headers.accept == 'text/event-stream') {
	    sendSSE(req, res);
	}
	else {
	    res.writeHead(404);
	    res.end();
	}
    }
};

function sendSSE(req, res) {
    res.writeHead(200, {
	'Content-Type': 'text/event-stream',
	'Cache-Control': 'no-cache',
	'Connection': 'keep-alive'
    });

    var table_status = {
	"aw_classic" : 0
    };

    var mysqlEventWatcher = MySQLEvents(dsn);
    var watcher = mysqlEventWatcher.add(
	'mydb.aw_classic',
	function (oldRow, newRow) {
	    table_status["aw_classic"] += 1;
	    //row inserted
	    if (oldRow === null) {
		//insert code goes here
	    }
	    
	    //row deleted
	    if (newRow === null) {
		//delete code goes here
	    }
	    
	    //row updated
	    if (oldRow !== null && newRow !== null) {
		//update code goes here
	    }
	}
    );

    setInterval(function() {
	if (table_status["aw_classic"] > 0) {
	    var change_times = table_status["aw_classic"];
	    table_status["aw_classic"] = 0;
	    var id = (new Date()).toLocaleTimeString();
	    var data = id + ": "+ "aw_classic" + " is changed for " + change_times + " times.";
	    constructSSE(res, id, data);
	}
    }, 5000);
}

function constructSSE(res, id, data) {
    res.write('id: ' + id + '\n');
    res.write("data: " + data + '\n\n');
}
