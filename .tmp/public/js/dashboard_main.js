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
    "3dExample5": "/js/chart/3dExample5"
  }
});

require(["dashboard", "jquery", "jqueryui", "dashboardChart", "timeline",
    "barChartwithLinePlot", "pieExample", "barExample",
    "bubbleExample", "bubbleExample1", "barExample1", "barExample2", "barExample3", "barExample4",
    "lineExample", "lineExample1", "lineExample2", "lineExample3", "lineExample4",
    "lineExample5", "lineExample6", "lineExample7", "lineExample8", "lineExample9", "lineExample10",
    "multipleChartTypesExample", "multipleSubplotsExample", "autoResizeExample", "mapExample", "mapExample1",
    "3dExample", "3dExample1", "3dExample2", "3dExample3", "3dExample4", "3dExample5"
  ],
  function(dashboard, $, jqueryui, chart, timeline,
    barChartwithLinePlot, pieExample, barExample,
    bubbleExample, bubbleExample1, barExample1, barExample2, barExample3, barExample4,
    lineExample, lineExample1, lineExample2, lineExample3, lineExample4, lineExample5,
    lineExample6, lineExample7, lineExample8, lineExample9, lineExample10, multipleChartTypesExample,
    multipleSubplotsExample, autoResizeExample, mapExample, mapExample1, _3dExample, _3dExample1,
    _3dExample2, _3dExample3, _3dExample4, _3dExample5) {
    var dashboard = new dashboard({
      row: 18,
      column: 2,
      renderTo: 'dashboard'
    });
    dashboard.create();

    $(document).ready(function() {
      chart.prepareData();
      chart.bindDraw();
      $('#draw').button().height(35);
      timeline.draw('dashboard_row_2_col_0');
      barChartwithLinePlot.draw('dashboard_row_2_col_1');
      pieExample.draw('dashboard_row_3_col_0');
      barExample.draw('dashboard_row_3_col_1');
      bubbleExample.draw('dashboard_row_4_col_0');
      bubbleExample1.draw('dashboard_row_4_col_1');
      barExample1.draw('dashboard_row_5_col_0');
      barExample2.draw('dashboard_row_5_col_1');
      barExample3.draw('dashboard_row_6_col_0');
      barExample4.draw('dashboard_row_6_col_1');
      lineExample.draw('dashboard_row_7_col_0');
      lineExample1.draw('dashboard_row_7_col_1');
      lineExample2.draw('dashboard_row_8_col_0');
      lineExample3.draw('dashboard_row_8_col_1');
      lineExample4.draw('dashboard_row_9_col_0');
      lineExample5.draw('dashboard_row_9_col_1');
      lineExample6.draw('dashboard_row_10_col_0');
      lineExample7.draw('dashboard_row_10_col_1');
      lineExample8.draw('dashboard_row_11_col_0');
      lineExample9.draw('dashboard_row_11_col_1');
      lineExample10.draw('dashboard_row_12_col_0');
      multipleChartTypesExample.draw('dashboard_row_12_col_1');
      multipleSubplotsExample.draw('dashboard_row_13_col_0');
      autoResizeExample.draw('dashboard_row_13_col_1');
      mapExample.draw('dashboard_row_14_col_0');
      mapExample1.draw('dashboard_row_14_col_1');
      _3dExample.draw('dashboard_row_15_col_0');
      _3dExample1.draw('dashboard_row_15_col_1');
      _3dExample2.draw('dashboard_row_16_col_0');
      _3dExample3.draw('dashboard_row_16_col_1');
      _3dExample4.draw('dashboard_row_17_col_0');
      _3dExample5.draw('dashboard_row_17_col_1');
    });

  });
