var Sitcoms = require('../models/sitcoms');

exports.all = function (req, res) {
    Sitcoms.all(function (err, docs) {
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
};

exports.findById = function (req, res) {
    Sitcoms.findById(req.params.id, function (err, doc) {
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    });
};

exports.create = function (req, res) {
    var serial = {
        name: req.body.name
    };
    Sitcoms.create(serial, function (err) {
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(serial);
    });
};

exports.update = function (req, res) {
    Sitcoms.update(req.params.id, {name : req.body.name}, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
};

exports.delete = function (req, res) {
    Sitcoms.delete(req.params.id, function (err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
};