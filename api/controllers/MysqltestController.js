/**
 * MysqltestController
 *
 * @description :: Server-side logic for managing mysqltests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var mysql = require('mysql');

var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	port:'3306',
	database:'mydb',
});

connection.connect(function(err){
			if(err){
				console.log(err);
				return;
			}
			console.log('connect success');
		});

var editModel = {};
var types = ['Text','Number','Geo'];
var aggregates = ['max','min','sum','avg'];


module.exports = {
	
	sails : function(req,res){
		connection.connect(function(err){
			if(err){
				console.log(err);
				return;
			}
			console.log('connect success');
		});
	},
	
	
	prepareEditModel : function(req,res){
		editModel.types = types;
		editModel.aggregates = aggregates;
		var fields = {};
		var Text = [];
		var Number = [];
		var All = [];
		connection.query('desc aw_classic',function(err,rows,field){
			rows.forEach(function(row){
				if(row.Type == 'text'){
					Text.push(row.Field);
				} else if(row.Type.indexOf('int') != -1 || row.Type.indexOf('double') != -1){
					Number.push(row.Field);
				} 
				All.push(row.Field);
			});		
			fields.Text = Text;
			fields.Number = Number;
			fields.All = All;
			editModel.fields = fields;
			res.send(editModel);
		});
	},
	
	queryData : function(req,res){
		var params = req.allParams();
		var text = params.text;
		var number = params.number;
		var aggregate = params.aggregate;
		var sql = "select " + text + " as x," + aggregate + "(" + number + ") as y" + " from aw_classic group by " + text  ;
		connection.query(sql, function(err,rows,field){
			var data = {};
			var x = [];
			var y = [];
			rows.forEach(function(row){
				x.push(row.x);
				y.push(row.y);
			});	
			data.x = x;
			data.y = y;
			res.send(data);
		});
	},
	
	/*queryPreviewData: function(req,res){
		var sql = "select * from aw_classic limit 10";
		connection.query(sql, function(err, rows, field){
			rows.forEach(function(row){
				res.send(rows);
			});
	},*/
	
	
	goHome : function(req,res){
		connection.end(function(err){
			if(err){       
				return;
			}
			console.log('[connection end] succeed!');
		});
	},
	
	
};

