define(["jquery", "plotly", "jqueryui", "require"], function($, Plotly, jqueryui, require) {
  return {
    draw: function(renderTo) {
      var trace1 = {
        x: [20, 14, 23],
        y: ['giraffes', 'orangutans', 'monkeys'],
        name: 'SF Zoo',
        orientation: 'h',
        marker: {
          color: 'rgba(55,128,191,0.6)',
          width: 1
        },
        type: 'bar'
      };

      var trace2 = {
        x: [12, 18, 29],
        y: ['giraffes', 'orangutans', 'monkeys'],
        name: 'LA Zoo',
        orientation: 'h',
        type: 'bar',
        marker: {
          color: 'rgba(255,153,51,0.6)',
          width: 1
        }
      };

      var data = [trace1, trace2];

      var layout = {
        title: 'Colored Bar Chart',
        barmode: 'stack'
      };

      Plotly.newPlot(renderTo, data, layout);
    }
  }
})
