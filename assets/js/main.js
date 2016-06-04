require.config({
    baseUrl: ".",
    paths: {
	"jquery": "/js/dependencies/jquery",
	"plotly": "/js/dependencies/plotly",
	"require": "/js/dependencies/require",
	"jqueryui": "/js/lib/jquery-ui",
	"chart": "/js/chart/chart"
    }
});

require(["chart", "jquery", "jqueryui"], function(chart, $, jqueryui) {
    $(document).ready(function() {
	chart.prepareData();
	chart.bindDraw();
	$('#draw').button().width($('.main-config').width() - 12);

	var source = new EventSource('/subscribe');
	source.onmessage = function(e) {
	    console.log("table is changed; querying data...")
	    chart.queryData();
	};
    });
});
