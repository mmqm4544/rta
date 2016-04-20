define(["jquery", "plotly", "jqueryui", "require"], function($, Plotly, jqueryui, require) {
  return {
    draw: function(renderTo) {
      trace1 = {
        type: 'scatter',
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        mode: 'lines',
        name: 'Red',
        line: {
          color: 'rgb(219, 64, 82)',
          width: 3
        }
      };

      trace2 = {
        type: 'scatter',
        x: [1, 2, 3, 4],
        y: [12, 9, 15, 12],
        mode: 'lines',
        name: 'Blue',
        line: {
          color: 'rgb(55, 128, 191)',
          width: 1
        }
      };

      var layout = {
        width: $("#" + renderTo).width(),
        height: $("#" + renderTo).height()
      };

      var data = [trace1, trace2];

      Plotly.newPlot(renderTo, data, layout);
    }
  }
})
