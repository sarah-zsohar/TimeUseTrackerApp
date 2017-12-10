const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var app = express();

// let server = require('http').Server(app);
const request = require('request');



// console.log("we are running" + port);
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     //and remove cacheing so we get the most recent comments
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
// });



app.use(bodyParser.urlencoded({
    extended: true
}));


var kits = [];
var port = process.env.PORT || 9000;
var server = app.listen(port, function () {
    console.log('Server has started on port ' + port);
});

const pg = require('pg');
const prompt = require('prompt');
var client_string = process.env.CLIENT_STRING;
var client = new pg.Client(client_string);

prompt.start();
client.connect();

app.post('/postData', function(req, res){
    var activity = req.body.activity
    var current_time = Date.now()
    let _res = res;
    const update = `UPDATE daily_time_data SET end_time='${current_time}' where end_time IS NULL`
    const insert = `INSERT into daily_time_data(activity, start_time) values ('${activity}', '${current_time}'); `
    client.query(update, function(err, result){
        if(err){
            _res.sendStatus(400);
        }else{
             client.query(insert, function(err, result){
                  if(err){
                    _res.sendStatus(400);
                  }else{
                    _res.sendStatus(200)
                  }
             })
        }
  });
})
app.get('/getData', function (req, res) {
    let _res = res;
    client.query("SELECT * from daily_time_data", (err, res) => {
    if(err){
        _res.sendStatus(400);
    }else{
        let data = res.rows;
        const responseObj = {
            message: "Success",
            data: data,
        };
            _res.status(200).json(responseObj);
    }
    });
});

var exports = app;