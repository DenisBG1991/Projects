var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');
var sitcomsController = require('./controller/sitcoms');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.send("Hello API");
});

app.get('/sitcoms', sitcomsController.all);

app.get('/sitcoms/:id', sitcomsController.findById);

app.post('/sitcoms', sitcomsController.create);

app.put('/sitcoms/:id', sitcomsController.update);

app.delete('/sitcoms/:id', sitcomsController.delete);

db.connect('mongodb://localhost:27017/myapi', function (err) {
    if (err){
        return console.log(err);
    }
    app.listen(3012, function () {
    console.log("API app started");
    });
});