$(function() {

    $( "#predict" ).button({
	disabled: true
    });
    
    $( "#input" ).accordion({
	collapsible: true,
	active: false
    });
    $( "#model" ).accordion({
	collapsible: true,
	active: false
    });
    $( "#workflow li" ).draggable({
	appendTo: "body",
	helper: "clone",
	cursor: "move"
    });

    var request = {};
    
    $( "#inputBox" ).droppable({
	accept: "#input li",
	activeClass: "ui-state-highlight",
	drop: function( event, ui ) {
	    $( this ).find( ".placeholder" ).remove();
	    $( this ).find( "span" ).remove();
	    var tableName = ui.draggable.attr("tableName");
	    request["inputTableName"] = tableName;
	    $( "<span></span>" ).text( ui.draggable.text() ).appendTo( this );
	}
    });

    $( "#modelBox" ).droppable({
	accept: "#model li",
	activeClass: "ui-state-highlight",
	drop: function( event, ui ) {
	    $( this ).find( ".placeholder" ).remove();
	    $( this ).find( "span" ).remove();
	    var category = ui.draggable.attr("category");
	    var model = ui.draggable.attr("model");
	    request["category"] = category;
	    request["model"] = model;
	    $( "<span></span>" ).text( ui.draggable.text() ).appendTo( this );
	}
    });

    var modelId;
    $( "#train" ).button().click(function( event ) {
	$('<span class="loading"></span>').text("running...").appendTo($("#modelBox"));
	$.ajax({
	    url: "http://localhost:8888/train/",
	    method: "POST",
	    data: JSON.stringify(request),
	    dataType: "json",
	    success: function(data){
		var jobId = data.jobId;
		$.ajax({
		    url: "http://localhost:8888/check/"+jobId+"/",
		    method: "GET",
		    dataType: "json",
		    success: function(data){
			$("#modelBox").find( ".loading" ).remove();
			$("#modelBox").addClass("ui-state-highlight");
			for (var name in data) {
			    if (name == "modelId") {
				modelId = data[name];
				$( "#predict" ).button({
				    disabled: false
				});
			    } else {
				var output = name + ": " + data[name];
				$("<span></span>").text(output).appendTo($("#modelBox"));
			    }
			}
		    }
		});
	    }});
    });

    $( "#predict" ).button().click(function( event ) {
	var predictRequest = {};
	predictRequest["modelId"] = modelId;
	predictRequest["inputTableName"] = request["inputTableName"];
	$('<span class="loading"></span>').text("running...").appendTo($("#outputBox"));
	$.ajax({
	    url: "http://localhost:8888/predict/",
	    method: "POST",
	    data: JSON.stringify(predictRequest),
	    dataType: "json",
	    success: function(data){
		var jobId = data.jobId;
		$.ajax({
		    url: "http://localhost:8888/check/"+jobId+"/",
		    method: "GET",
		    dataType: "json",
		    success: function(data){
			$("#outputBox").find( ".loading" ).remove();
			$("#outputBox").addClass("ui-state-highlight");
			var output = data["outputTableName"];
			$("#outputBox").find( ".placeholder" ).remove();
			$("#outputBox").find( "span" ).remove();
			$("<span></span>").text(output).appendTo($("#outputBox"));
		    }
		});
	    }});
    });
});
