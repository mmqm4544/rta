define(["jquery", "plotly", "jqueryui", "require"], function($, Plotly, jqueryui, require) {
  return {
    draw: function(renderTo) {
      var trace1 = {
        x: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
        y: [20, 14, 23, 25, 22],
        marker: {
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']
        },
        type: 'bar'
      };

      var data = [trace1];

      var layout = {
        title: 'Least Used Feature'
      };

      Plotly.newPlot(renderTo, data, layout);
    }
  }
})
