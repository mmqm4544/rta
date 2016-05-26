var http = require('http');
var fs = require('fs');

var MySQLEvents = require('mysql-events');
var dsn = {
    host: "localhost",
    user: "root",
    password: "",
};

http.createServer(function(req, res) {
    
    if (req.headers.accept && req.headers.accept == 'text/event-stream') {
	if (req.url == '/events') {
	    sendSSE(req, res);
	} else {
	    res.writeHead(404);
	    res.end();
	}
    } else {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(fs.readFileSync(__dirname + '/sse-node.html'));
	res.end();
    }
}).listen(8000);

function sendSSE(req, res) {
    res.writeHead(200, {
	'Content-Type': 'text/event-stream',
	'Cache-Control': 'no-cache',
	'Connection': 'keep-alive'
    });

    var mysqlEventWatcher = MySQLEvents(dsn);
    var watcher = mysqlEventWatcher.add(
	'test.test',
	function (oldRow, newRow) {
	    var id = (new Date()).toLocaleTimeString();
	    
	    //row inserted
	    if (oldRow === null) {
		//insert code goes here
		var data = id + ": "+ newRow.table + " is changed.";
		constructSSE(res, id, data);
		console.log(newRow);
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
