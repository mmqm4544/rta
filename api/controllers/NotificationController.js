/**
 * NotificationController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var http = require('http');
var fs = require('fs');

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

    var mysqlEventWatcher = MySQLEvents(dsn);
    var watcher = mysqlEventWatcher.add(
	'mydb.aw_classic',
	function (oldRow, newRow) {
	    var id = (new Date()).toLocaleTimeString();
	    var data = id + ": "+ "aw_classic" + " is changed.";
	    constructSSE(res, id, data);
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
}

function constructSSE(res, id, data) {
    res.write('id: ' + id + '\n');
    res.write("data: " + data + '\n\n');
}
