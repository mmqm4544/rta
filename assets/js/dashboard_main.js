require.config({
  baseUrl: ".",
  paths: {
    "jquery": "/js/dependencies/jquery",
    "plotly": "/js/dependencies/plotly",
    "require": "/js/dependencies/require",
    "jqueryui": "/js/lib/jquery-ui",
    "dashboard": "/js/chart/dashboard",
    "dashboardChart": "/js/chart/dashboardChart"
  }
});

require(["dashboard", "jquery", "jqueryui", "dashboardChart"], function(dashboard, $, jqueryui, chart) {
  var dashboard = new dashboard({
    row: 1,
    column: 1,
    renderTo: 'dashboard'
  });
  dashboard.create();

  $(document).ready(function() {
    chart.prepareData();
    chart.bindDraw();
    $('#draw').button().height(35);
  });

});
