define(["jquery", "plotly", "jqueryui", "require"], function($, plotly, jqueryui, require) {
  return {
    prepareData: function() {
      var me = this;
      $.ajax({
        url: 'prepareEditModel',
        success: function(data) {
          me.buildselect('text', data.fields.Text);
          me.buildselect('number', data.fields.Number);
          me.buildselect('aggregates', data.aggregates);
          me.addChartType();
        }
      });
    },

    buildselect: function(id, array) {
      var select = $('<select id="div_' + id + '">').appendTo($('#' + id + ''));
      array.forEach(function(d) {
        $('<option>' + d + '</option>').appendTo(select);
      });
      select.selectmenu({
        width: 100
      });
      return select;
    },

    addChartType: function() {
      var me = this;
      var array = ['bar', 'line', 'pie', 'bubble'];
      var me = this;
      var select = me.buildselect('chart_type', array).change(function(item) {
        me.drawChartByType(g_data, item.currentTarget.value);
      });
    },

    bindDraw: function() {
      var me = this;
      $('#draw').click(function() {
        me.queryData();
      });
    },

    queryData: function() {
      var me = this;
      var text = $('#div_text').val();
      var number = $('#div_number').val();
      var aggregate = $('#div_aggregates').val();
      $.ajax({
        url: 'queryData',
        data: {
          'text': text,
          'number': number,
          'aggregate': aggregate
        },
        success: function(data) {
          me.drawChart(data);
          g_data = data;
        }
      });
    },

    drawChart: function(data) {
      var me = this;
      // var type = $('#div_chart_type').val();
      me.drawChartByType(data, 'bar');
      me.drawChartByType(data, 'line');
      me.drawChartByType(data, 'pie');
      me.drawChartByType(data, 'bubble');
    },

    drawChartByType: function(data, type) {
      var me = this;
      switch (type) {
        case 'bar':
          me.drawBarChart(data, type);
          break;
        case 'line':
          me.drawLineChart(data, type);
          break;
        case 'pie':
          me.drawPieChart(data);
          break;
        case 'bubble':
          me.drawBubbleChart(data);
          break;
        default:
          console.log('not supported chart');
      }
    },

    drawLineChart: function(data, type) {
      var d = [{
        x: data.x,
        y: data.y,
        type: type
      }];

      var layout = {
        showlegend: false
      };

      plotly.newPlot('dashboard_row_0_col_1', d, layout, {
        displayModeBar: false
      });
    },

    drawBarChart: function(data, type) {
      var d = [{
        x: data.x,
        y: data.y,
        type: type
      }];

      var layout = {
        showlegend: false
      };

      plotly.newPlot('dashboard_row_0_col_0', d, layout, {
        displayModeBar: false
      });
    },

    drawPieChart: function(data) {
      var data = [{
        values: data.y,
        labels: data.x,
        type: 'pie'
      }];
      var layout = {};
      plotly.newPlot('dashboard_row_1_col_0', data, layout);
    },

    drawBubbleChart: function(d) {
      var trace1 = {
        x: d.x,
        y: d.y,
        mode: 'markers',
        marker: {
          size: d.y
        }
      };
      var data = [trace1];
      var layout = {
        title: '',
        showlegend: false
      };
      plotly.newPlot('dashboard_row_1_col_1', data, layout);
    }
  }
});
