define(["jquery", "plotly", "jqueryui", "require"], function($, Plotly, jqueryui, require) {
  return {
    draw: function(renderTo) {
      var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 11, 12, 13],
        text: ['Asize: 40', 'Bsize: 60', 'Csize: 80', 'Dsize: 100'],
        mode: 'markers',
        marker: {
          color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
          size: [40, 60, 80, 100]
        }
      };

      var data = [trace1];

      var layout = {
        title: 'Bubble Chart Hover Text',
        showlegend: false,
        width: $("#" + renderTo).width(),
        height: $("#" + renderTo).height()
      };

      Plotly.newPlot(renderTo, data, layout);
    }
  }
})
