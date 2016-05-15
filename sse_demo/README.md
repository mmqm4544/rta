##JavaScript API
To subscribe to an event stream, create an EventSource object and set up a handler for the message event:

```
var source = new EventSource('/subscribe');
source.addEventListener('message', function(e) {
  console.log(e.data);
}, false);

```
When updates are pushed from the server, the onmessage handler fires. When connection is closed, the browser will automatically reconnect to the source.

##Event Stream Format

Construct a plaintext response, served with a text/event-stream Content-Type. In its basic form, the response should contain a "data:" line, followed by your message, followed by two "\n" characters to end the stream:

```
data: My message\n\n
```

##Demo

Run ```python run.py```

Open ```http://localhost:5000``` to subscribe server-sent events

Open ```http://localhost:5000/publish``` to send messages to subscribers

##Reference

[Realtime server using the SSE protocol](http://flask.pocoo.org/snippets/116/)

[Stream Updates with Server-Sent Events](http://www.html5rocks.com/en/tutorials/eventsource/basics/)
