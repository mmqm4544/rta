define(["jquery", "plotly", "jqueryui", "require"], function($, Plotly, jqueryui, require) {
  return {
    draw: function(renderTo) {
      var url = './files/data.json';

      Plotly.d3.json(url, function(err, rawData) {
        if (err) throw err;

        plot(rawData);
      });

      function plot(rawData) {
        var data = Object.keys(rawData).map(function(k) {
          var pts = rawData[k];

          return {
            type: 'scatterternary',
            mode: 'lines',
            name: k,
            a: pts.map(function(d) {
              return d.clay
            }),
            b: pts.map(function(d) {
              return d.sand
            }),
            c: pts.map(function(d) {
              return d.silt
            }),
            line: {
              color: '#c00'
            }
          };
        });

        var layout = {
          ternary: {
            sum: 100,
            aaxis: makeAxis('Clay'),
            baxis: makeAxis('Sand'),
            caxis: makeAxis('Silt')
          },
          showlegend: false,
          width: $("#" + renderTo).width(),
          annotations: [{
            showarrow: false,
            text: 'Replica of Daven Quinn\'s block',
            x: 0.15,
            y: 1.1
          }]
        };

        Plotly.plot(renderTo, data, layout);
      }

      function makeAxis(title) {
        return {
          title: title,
          ticksuffix: '%',
          min: 0.01,
          linewidth: 2,
          ticks: 'outside',
          ticklen: 8,
          showgrid: true,
        };
      }
    }
  }
})
