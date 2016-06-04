define(["jquery", "plotly", "jqueryui", "require"], function($, plotly, jqueryui, require) {
  return {
    draw: function(renderTo) {
      var rawDataURL = '/files/2016-weather-data-seattle.csv';
      var xField = 'Date';
      var yField = 'Mean_TemperatureC';
      var selectorOptions = {
        buttons: [{
          step: 'month',
          stepmode: 'backward',
          count: 1,
          label: '1m'
        }, {
          step: 'month',
          stepmode: 'backward',
          count: 6,
          label: '6m'
        }, {
          step: 'year',
          stepmode: 'todate',
          count: 1,
          label: 'YTD'
        }, {
          step: 'year',
          stepmode: 'backward',
          count: 1,
          label: '1y'
        }, {
          step: 'all',
        }],
      };

      function prepData(rawData) {
        var x = [];
        var y = [];

        rawData.forEach(function(datum, i) {

          x.push(new Date(datum[xField]));
          y.push(datum[yField]);
        });

        return [{
          mode: 'lines',
          x: x,
          y: y
        }];
      };

      plotly.d3.csv(rawDataURL, function(err, rawData) {
        if (err) throw err;

        var data = prepData(rawData);
        var layout = {
          title: '气温数据',
          xaxis: {
            rangeselector: selectorOptions,
            rangeslider: {}
          },
          yaxis: {
            fixedrange: true
          }
        };

        plotly.plot(renderTo, data, layout);
      })
    }
  }
})
