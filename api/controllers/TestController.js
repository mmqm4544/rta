/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var MongoClient = require('mongodb').MongoClient,
  test = require('assert');
// Connection url
var url = 'mongodb://localhost:27017/test';

module.exports = {
  getAll: function(req, res) {

  },

  reset: function(req, res) {

  },

  buildData: function() {

  },

  listAllCollections: function(req, res) {
    var collections = [];
    MongoClient.connect(url, function(err, db) {
      // List the database collections available
      db.listCollections().toArray(function(err, items) {
        test.equal(null, err);
        items.forEach(function(item) {
          collections.push(item.name);
        });
        db.close();
        res.send(collections);
      });
    });
  },

  listAllDatabases: function(req, res) {
    var databases = [];
    // Connect using MongoClient
    MongoClient.connect(url, function(err, db) {
      // Use the admin database for the operation
      var adminDb = db.admin();
      // List all the available databases
      adminDb.listDatabases(function(err, dbs) {
        test.equal(null, err);
        test.ok(dbs.databases.length > 0);
        dbs.databases.forEach(function(db) {
          databases.push(db.name);
        });
        db.close();
        res.send(databases);
      });
    });
  },

  listAllDataInCollection: function(req, res) {
    var data = [];
    var collectionName = req.allParams().collectionName;
    MongoClient.connect(url, function(err, db) {
      var collection = db.collection(collectionName);
      collection.find({}).toArray(function(err, items) {
        items.forEach(function(item) {
          data.push(item);
        });
        db.close();
        res.send(data);
      });
    });
  },

  listAllFieldsName: function(req, res) {

  }
};
