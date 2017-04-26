var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.all = function (cb) {
    db.get().collection('sitcoms').find().toArray(function (err, docs) {
        cb(err, docs)
    })
};

exports.findById = function (id, cb) {
    db.get().collection('sitcoms').findOne({ _id : ObjectID(id)}, function (err, doc) {
        cb(err, doc);
    })
};

exports.create = function (serial, cb) {
    db.get().collection('sitcoms').insertOne(serial, function (err, result) {
        cb(err, result);
    });
};

exports.update = function (id, newData, cb) {
    db.get().collection('sitcoms').updateOne(
        {_id : ObjectID(id)},
        newData,
        function (err, result) {
            cb(err, result);
        }
    );
};

exports.delete = function (id, cb) {
    db.get().collection('sitcoms').deleteOne(
        {_id : ObjectID(id)},
        function (err, result) {
            cb(err, result);
        }
    );
};