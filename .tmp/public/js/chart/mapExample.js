define(["jquery", "plotly", "jqueryui", "require"], function($, Plotly, jqueryui, require) {
  return {
    draw: function(renderTo) {
      var data = [{
        type: 'scattergeo',
        mode: 'markers',
        locations: ['CHN', 'DEU', 'RUS', 'ESP'],
        marker: {
          size: [20, 30, 15, 10],
          color: [10, 20, 40, 50],
          cmin: 0,
          cmax: 50,
          colorscale: 'Greens',
          colorbar: {
            title: 'Some rate',
            ticksuffix: '%',
            showticksuffix: 'last'
          },
          line: {
            color: 'black'
          }
        },
        name: 'europe data'
      }];

      var layout = {
        'geo': {
          'scope': 'china',
          'resolution': 50
        }
      };

      Plotly.newPlot(renderTo, data, layout);
    }
  }
})
