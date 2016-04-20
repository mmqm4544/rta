define(["jquery", "plotly", "jqueryui", "require"], function($, Plotly, jqueryui, require) {
  return {
    draw: function(renderTo) {
      // Base

      var xData = ['Product Revenue', 'Services Revenue', 'Total Revenue', 'Fixed Costs', 'Variable Costs', 'Total Costs', 'Total'];

      var yData = [400, 660, 660, 590, 400, 400, 340];

      var textList = ['$430K', '$260K', '$690K', '$-120K', '$-200K', '$-320K', '$370K'];

      //Base

      var trace1 = {
        x: xData,
        y: [0, 430, 0, 570, 370, 370, 0],
        marker: {
          color: 'rgba(1,1,1,0.0)'
        },
        type: 'bar'
      };

      //Revenue

      var trace2 = {
        x: xData,
        y: [430, 260, 690, 0, 0, 0, 0],
        type: 'bar',
        marker: {
          color: 'rgba(55,128,191,0.7)',
          line: {
            color: 'rgba(55,128,191,1.0)',
            width: 2
          }
        }
      };

      //Cost

      var trace3 = {
        x: xData,
        y: [0, 0, 0, 120, 200, 320, 0],
        type: 'bar',
        marker: {
          color: 'rgba(219, 64, 82, 0.7)',
          line: {
            color: 'rgba(219, 64, 82, 1.0)',
            width: 2
          }
        }
      };

      //Profit

      var trace4 = {
        x: xData,
        y: [0, 0, 0, 0, 0, 0, 370],
        type: 'bar',
        marker: {
          color: 'rgba(50,171, 96, 0.7)',
          line: {
            color: 'rgba(50,171,96,1.0)',
            width: 2
          }
        }
      };

      var data = [trace1, trace2, trace3, trace4];

      var layout = {
        title: 'Annual Profit 2015',
        barmode: 'stack',
        paper_bgcolor: 'rgba(245,246,249,1)',
        plot_bgcolor: 'rgba(245,246,249,1)',
        width: $("#" + renderTo).width(),
        height: $("#" + renderTo).height(),
        showlegend: false,
        annotations: []
      };

      for (var i = 0; i < 7; i++) {
        var result = {
          x: xData[i],
          y: yData[i],
          text: textList[i],
          font: {
            family: 'Arial',
            size: 14,
            color: 'rgba(245,246,249,1)'
          },
          showarrow: false
        };
        layout.annotations.push(result);
      };

      Plotly.newPlot(renderTo, data, layout);
    }
  }
})
