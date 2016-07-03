require.config({
  baseUrl: ".",
  paths: {
    "jquery": "/js/dependencies/jquery",
    "plotly": "/js/dependencies/plotly"
  }
});

require(["jquery","plotly"], function($,Plotly) {
  $(document).ready(function() {
    /*$.ajax({
      url: 'getInfo',
      success: function(data) {
         alert(data);
      }
    });*/
    var me = this;
    var lineChartId = "plotly-line-chart";
    var donutChartId = "plotly-donut-chart";

    var plotDiv = document.getElementById(lineChartId);

    var data = [{
    	x: [ new Date() ],
    	y: [Math.random()]
    }];

    Plotly.plot(plotDiv, data, { title: 'Random Over Time'});

    setInterval(function(){
    	var update = {
    		x: [[ new Date() ]],
    		y: [[ Math.random() ]]
    	};

        Plotly.extendTraces(plotDiv, update, [0], 10);
    }, 500);

  });
});
