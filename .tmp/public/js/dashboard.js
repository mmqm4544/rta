require.config({
  baseUrl: ".",
  paths: {
    "jquery": "/js/dependencies/jquery",
    "plotly": "/js/dependencies/plotly",
    "require": "/js/dependencies/require",
    "jqueryui": "/js/lib/jquery-ui",
    "dashboard": "/js/chart/dashboard"
  }
});

require(["dashboard", "jquery", "jqueryui"], function(dashboard, $, jqueryui) {
  var dashboard = new dashboard({
    renderTo: 'dashboard'
  });
  dashboard.create();
});
