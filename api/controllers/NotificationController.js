/**
 * NotificationController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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

    var id = (new Date()).toLocaleTimeString();

    // Sends a SSE every 5 seconds on a single connection.
    setInterval(function() {
    	constructSSE(res, id, (new Date()).toLocaleTimeString());
    }, 5000);

    constructSSE(res, id, (new Date()).toLocaleTimeString());
}

function constructSSE(res, id, data) {
    res.write('id: ' + id + '\n');
    res.write("data: " + data + '\n\n');
}
