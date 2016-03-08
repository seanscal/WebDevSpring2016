var express = require('express');
var app = express();
var http = require('http');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var STATURL = "http://nhlwc.cdnak.neulion.com/fs1/nhl/league/playerstatsline/20152016/2/NJD/iphone/playerstatsline.json"

app.use(express.static(__dirname + '/public'));


app.get('/api/playerStats', function(req, res){
    var options = {
        host : 'nhlwc.cdnak.neulion.com',
        path : '/fs1/nhl/league/playerstatsline/20152016/2/NJD/iphone/playerstatsline.json',
        method : 'GET'
    }

    var request = http.request(options, function(response){
        var body = ""
        response.on('data', function(data) {
            body += data;
        });
        response.on('end', function() {
            res.send(JSON.parse(body));
        });
    });
    request.on('error', function(e) {
        console.log('Problem with request: ' + e.message);
    });
    request.end();
});

app.get('/api/playerInfo', function(req, res){
    var options = {
        host : 'nhlwc.cdnak.neulion.com',
        path : '/fs1/nhl/league/teamroster/NJD/iphone/clubroster.json',
        method : 'GET'
    }

    var request = http.request(options, function(response){
        var body = ""
        response.on('data', function(data) {
            body += data;
        });
        response.on('end', function() {
            res.send(JSON.parse(body));
        });
    });
    request.on('error', function(e) {
        console.log('Problem with request: ' + e.message);
    });
    request.end();
});

app.listen(port, ipaddress);