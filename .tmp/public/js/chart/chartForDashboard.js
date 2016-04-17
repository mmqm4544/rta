define([jquery, require], function($, require) {
  /*config paremeter start*/
  var _col = 1;
  var _row = 1;
  var _renderToDivId = null;
  var _class = null;
  var id = '_dashboard';
  /*config paremeter end*/

  /*global parameters start*/
  var dashboard_class = 'dashboard';
  var dashboard_main_class = 'dashboard-main';
  var dashboard_conf_class = 'dashboard-conf';
  /*global parameters end*/
  var dashboard = new function(config) {
    var me = this;
    me._id = config.id;
    me._col = config.column;
    me._row = config.row;
    me._renderToDivId = config.renderTo;
    me._class = config.class;
  };

  dashboard.prototype.create = function() {
    var me = this;
    var template = '<div></div>';
    var renderto = $('#' + me._renderToDivId);

    var dashboard = $(template, {
      'id': me.id,
      'class': me.dashboard
    });

    var dashboard_main = $(template, {
      'class': me.dashboard_main
    });

    var dashboard_conf = $(template, {
      'class': me.dashboard_conf
    });
    dashboard.append(dashboard_main).append(dashboard_conf);
    renderto.append(dashboard);
  };

  /**/
  dashboard.prototype.createByRow = function() {
    var me = this;


  };

  dashboard.prototype.createRow = function(rowId) {
    var me = this;
    var namerow = 'row';
    var namecol = 'col';
    var clsrow = '';
    var clscol = '';
    var row = this.createCell(rowId, namerow, clsrow);
    for (var i = 0; i < me._col; i++) {
      var cell = this.createCell(i, namecol, clscol);
      row.append(cell);
    }
    return row;
  };

  dashboard.prototype.createCell = function(id, name, cls) {
    var me = this;
    var template = '<div></div>'
    var row = $(template, {
      'id': 'dashboard_' + name '_' + id,
      'class': cls
    });
  };

  return dashboard;
});
