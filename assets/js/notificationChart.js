require.config({
  baseUrl: ".",
  paths: {
    "jquery": "/js/dependencies/jquery",
    "plotly": "/js/dependencies/plotly",
    "require": "/js/dependencies/require",
    "jqueryui": "/js/lib/jquery-ui",
    "dashboard": "/js/chart/dashboard",
    "dashboardChart": "/js/chart/dashboardChart",
    "timeline": "/js/chart/timeline",
    "barChartwithLinePlot": "/js/chart/barChartwithLinePlot",
    "pieExample": "/js/chart/pieExample",
    "barExample": "/js/chart/barExample",
    "bubbleExample": "/js/chart/bubbleExample",
    "bubbleExample1": "/js/chart/bubbleExample1",
    "barExample1": "/js/chart/barExample1",
    "barExample2": "/js/chart/barExample2",
    "barExample3": "/js/chart/barExample3",
    "barExample4": "/js/chart/barExample4",
    "lineExample": "/js/chart/lineExample",
    "lineExample1": "/js/chart/lineExample1",
    "lineExample2": "/js/chart/lineExample2",
    "lineExample3": "/js/chart/lineExample3",
    "lineExample4": "/js/chart/lineExample4",
    "lineExample5": "/js/chart/lineExample5",
    "lineExample6": "/js/chart/lineExample6",
    "lineExample7": "/js/chart/lineExample7",
    "lineExample8": "/js/chart/lineExample8",
    "lineExample9": "/js/chart/lineExample9",
    "lineExample10": "/js/chart/lineExample10",
    "multipleChartTypesExample": "/js/chart/multipleChartTypesExample",
    "multipleSubplotsExample": "/js/chart/multipleSubplotsExample",
    "autoResizeExample": "/js/chart/autoResizeExample",
    "mapExample": "/js/chart/mapExample",
    "mapExample1": "/js/chart/mapExample1",
    "3dExample": "/js/chart/3dExample",
    "3dExample1": "/js/chart/3dExample1",
    "3dExample2": "/js/chart/3dExample2",
    "3dExample3": "/js/chart/3dExample3",
    "3dExample4": "/js/chart/3dExample4",
    "3dExample5": "/js/chart/3dExample5",
    "jqueryevent": "/js/jquery.event"
  }
});

require(["dashboard", "jquery", "jqueryui", "dashboardChart", "timeline",
    "barChartwithLinePlot", "pieExample", "barExample",
    "bubbleExample", "bubbleExample1", "barExample1", "barExample2", "barExample3", "barExample4",
    "lineExample", "lineExample1", "lineExample2", "lineExample3", "lineExample4",
    "lineExample5", "lineExample6", "lineExample7", "lineExample8", "lineExample9", "lineExample10",
    "multipleChartTypesExample", "multipleSubplotsExample", "autoResizeExample", "mapExample", "mapExample1",
    "3dExample", "3dExample1", "3dExample2", "3dExample3", "3dExample4", "3dExample5", "jqueryevent"
  ],
  function(dashboard, $, jqueryui, chart, timeline,
    barChartwithLinePlot, pieExample, barExample,
    bubbleExample, bubbleExample1, barExample1, barExample2, barExample3, barExample4,
    lineExample, lineExample1, lineExample2, lineExample3, lineExample4, lineExample5,
    lineExample6, lineExample7, lineExample8, lineExample9, lineExample10, multipleChartTypesExample,
    multipleSubplotsExample, autoResizeExample, mapExample, mapExample1, _3dExample, _3dExample1,
    _3dExample2, _3dExample3, _3dExample4, _3dExample5, jqueryevent) {
    var dashboard = new dashboard({
      row: 2,
      column: 2,
      renderTo: 'dashboard'
    });
    dashboard.create();
    var dashboardChart = new chart();
    $(document).ready(function() {
      dashboardChart.prepareData();
      dashboardChart.bindDraw();
      var source = new EventSource('/subscribe');
      source.onmessage = function(e) {
        console.log("table is changed; querying data...");
        $(jqueryevent).trigger("notification");
      };
    });

  });
