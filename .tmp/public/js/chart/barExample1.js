define(["jquery", "plotly", "jqueryui", "require"], function($, Plotly, jqueryui, require) {
  return {
    draw: function(renderTo) {
      var trace1 = {
        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        y: [2000000, 1400000, 2500000, 1600000, 1800000, 2200000, 1900000, 1500000, 1200000, 1600000, 1400000, 1700000],
        type: 'bar',
        name: 'Primary Product',
        marker: {
          color: 'rgb(49,130,189)',
          opacity: 0.7,
        }
      };

      var trace2 = {
        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        y: [1900000, 1400000, 2200000, 1400000, 1600000, 1900000, 1500000, 1400000, 1000000, 1200000, 1200000, 1600000],
        type: 'bar',
        name: 'Secondary Product',
        marker: {
          color: 'rgb(204,204,204)',
          opacity: 0.5
        }
      };

      var data = [trace1, trace2];

      var layout = {
        title: '2013 Sales Report',
        xaxis: {
          tickangle: -45
        },
        barmode: 'group'
      };

      Plotly.newPlot(renderTo, data, layout);
    }
  }
})
