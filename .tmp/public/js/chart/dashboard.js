define('dashboard', ["jquery", "require"], function($, require) {

  var dashboard = function(config) {
    var me = this;
    // me._id = config.id;
    me._col = config.column;
    me._row = config.row;
    me._renderToDivId = config.renderTo;
    // me._class = config.class;
    return this;
  };

  /*config paremeter start*/
  dashboard.prototype._col = 1;
  dashboard.prototype._row = 1;
  dashboard.prototype._renderToDivId = null;
  // dashboard.prototype._class = null;
  dashboard.prototype._id = '_dashboard';
  /*config paremeter end*/

  /*global parameters start*/
  dashboard.prototype.dashboard_class = 'dashboard';
  dashboard.prototype.dashboard_main_class = 'dashboard-main';
  dashboard.prototype.dashboard_conf_class = 'dashboard-conf';
  /*global parameters end*/

  dashboard.prototype.create = function() {
    var me = this;
    var template = '<div></div>';
    var renderto = $('#' + me._renderToDivId);

    var dashboard = $(template, {
      'id': me._id,
      'class': me.dashboard_class
    });

    var dashboard_main = $(template, {
      'class': me.dashboard_main_class
    });

    var dashboard_conf = $(template, {
      'class': me.dashboard_conf_class
    });
    dashboard.append(dashboard_conf).append(dashboard_main);
    renderto.append(dashboard);
    me.createConfig(dashboard_conf);
    me.createByRow(dashboard_main);
  };

  dashboard.prototype.createConfig = function(dashboard_conf) {
    dashboard_conf.append($('<div id="chart_type" class="conf-select"></div>'));
    dashboard_conf.append($('<div id="text" class="conf-select"></div>'));
    dashboard_conf.append($('<div id="number" class="conf-select"></div>'));
    dashboard_conf.append($('<div id="aggregates" class="conf-select"></div>'));
    dashboard_conf.append($('<div id="draw" class="draw-button">show</div>'));
  };

  /**/
  dashboard.prototype.createByRow = function(dashboard_main) {
    var me = this;
    var height = dashboard_main.height();
    var width = dashboard_main.width();
    var cellHeight = 500; // height / me._row - 2 - 10;
    for (var i = 0; i < me._row; i++) {
      var row = me.createRow(i, cellHeight, width);
      dashboard_main.append(row);
    }
  };

  dashboard.prototype.createRow = function(rowId, height, width) {
    var me = this;
    var namerow = 'row';
    var namecol = 'col';
    var clsrow = '';
    var clscol = '';
    var rowName = namerow + '_' + rowId + '_';
    var row = this._createRow(rowId, namerow, clsrow, height, width);
    for (var i = 0; i < me._col; i++) {
      var col = this.createCell(i, rowName + namecol, clscol, height, 100 / me._col);
      row.append(col);
    }
    return row;
  };

  dashboard.prototype._createRow = function(id, name, cls, height, width) {
    var me = this;
    var template = '<div></div>'
    var cell = $(template, {
      'id': 'dashboard_' + name + '_' + id,
      'class': cls,
      css: {
        'height': height,
        'width': '100%',
        'border': '1px solid orange'
      }
    });
    return cell;
  };

  dashboard.prototype.createCell = function(id, name, cls, height, width) {
    var me = this;
    var template = '<div></div>';
    var tempChart = '<div></div>';
    var cell = $(template, {
      'id': 'dashboard_' + name + '_' + id,
      'class': cls,
      css: {
        'height': height - 10,
        'width': 'calc(' + width + '% - 12px)',
        'border': '1px solid green',
        'display': 'inline-flex',
        'padding': 5
      }
    });
    return cell;
  };

  return dashboard;
});
