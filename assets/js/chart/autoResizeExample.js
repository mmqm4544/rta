define(["jquery", "plotly", "jqueryui", "require"], function($, Plotly, jqueryui, require) {
  return {
    draw: function(renderTo) {
      (function() {
        var d3 = Plotly.d3;

        var WIDTH_IN_PERCENT_OF_PARENT = 100,
          HEIGHT_IN_PERCENT_OF_PARENT = 100;

        var gd3 = d3.select('#' + renderTo)
          .append('div')
          .style({
            width: WIDTH_IN_PERCENT_OF_PARENT + '%',
            height: HEIGHT_IN_PERCENT_OF_PARENT + '%'
          });

        var gd = gd3.node();

        Plotly.plot(gd, [{
          type: 'bar',
          x: [1, 2, 3, 4],
          y: [5, 10, 2, 8],
          marker: {
            color: '#C8A2C8',
            line: {
              width: 2.5
            }
          }
        }], {
          title: 'Auto-Resize',
          font: {
            size: 16
          }
        });

        window.onresize = function() {
          Plotly.Plots.resize(gd);
        };

      })();
    }
  }
})
