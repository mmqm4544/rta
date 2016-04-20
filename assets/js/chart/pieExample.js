define(["jquery", "plotly", "jqueryui", "require"], function($, Plotly, jqueryui, require) {
  return {
    draw: function(renderTo) {
      var data = [{
        values: [16, 15, 12, 6, 5, 4, 42],
        labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World'],
        domain: {
          x: [0, .48]
        },
        name: 'GHG Emissions',
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
      }, {
        values: [27, 11, 25, 8, 1, 3, 25],
        labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World'],
        text: 'CO2',
        textposition: 'inside',
        domain: {
          x: [.52, 1]
        },
        name: 'CO2 Emissions',
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
      }];

      var layout = {
        title: 'Global Emissions 1990-2011',
        annotations: [{
          font: {
            size: 20
          },
          showarrow: false,
          text: 'GHG',
          x: 0.17,
          y: 0.5
        }, {
          font: {
            size: 20
          },
          showarrow: false,
          text: 'CO2',
          x: 0.82,
          y: 0.5
        }],
        width: $("#" + renderTo).width(),
        height: $("#" + renderTo).height()
      };

      Plotly.newPlot(renderTo, data, layout);
    }
  }
})
