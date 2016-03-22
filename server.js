var express = require('express');
var app = express();
var http = require('http');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var domain = "http://localhost:3000/";
var STATURL = "http://nhlwc.cdnak.neulion.com/fs1/nhl/league/playerstatsline/20152016/2/NJD/iphone/playerstatsline.json"

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/cs5200';
var db = connectionString;




// use remote connection string
// if running in remote server
//if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
//    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//        process.env.OPENSHIFT_APP_NAME;
//
//    var domain = "http://kevinscalabrini-webdev2016.rhcloud.com/";
//}
//
//// connect to the database
//var db = mongoose.connect(connectionString);
//
//
//var CourseSchema = new mongoose.Schema({
//    title: String,
//    seats: {type: Number, default: 25},
//    starts: {type: Date, default: Date.now}
//});
//
//var Course = mongoose.model("Course", CourseSchema);

//Course.create({title: "NEW", seats: 32},
//    function(err, results){
//        console.log(err);
//        console.log(results);
//    });


app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

require("./public/assignment3/server/app.js")(app, db);
require("./public/project/server/app.js")(app, db);

//bring in project api
app.get('/api/playerStats', function (req, res) {
    var options = {
        host: 'nhlwc.cdnak.neulion.com',
        path: '/fs1/nhl/league/playerstatsline/20152016/2/NJD/iphone/playerstatsline.json',
        method: 'GET'
    }

    var request = http.request(options, function (response) {
        var body = ""
        response.on('data', function (data) {
            body += data;
        });
        response.on('end', function () {
            res.send(JSON.parse(body));
        });
    });
    request.on('error', function (e) {
        console.log('Problem with request: ' + e.message);
    });
    request.end();
});



app.get('/api/gameInfo', function (req, res) {
    var str = "";
    var count = 0;
    var options = {
        host: 'live.nhle.com',
        path: '/GameData/20152016/201502' + str + '/gc/gcbx.jsonp?=JSON_CALLBACK',
        method: 'GET'
    }

    var request = http.request(options, function (response) {
        var body = ""
        response.on('data', function (data) {
            body += data;
        });
        response.on('end', function () {
            var y = body.replace("GCBX.load(", "");
            var data = JSON.parse(y.replace("})", "}"));
            if (data.shotSummary[0].shots[0].ht == "NJD" || data.shotSummary[0].shots[0].at == "NJD") {
                console.log(data.gid);
                if (arr.indexOf(data.gid) == -1) {
                    arr.push(data.gid);
                    console.log(arr.indexOf(data.gid));
                    console.log(arr.length + " games");
                }
            }
        });
    });
    request.on('error', function (e) {
        console.log('Problem with request: ' + e.message);
    });
    request.end();
});

app.listen(port, ipaddress);


// This code was used to get the game id's that the Devils participated in
/*            response.on('end', function () {
 var y = body.replace("GCBX.load(", "");
 var data = JSON.parse(y.replace("})", "}"));
 if (data.shotSummary[0].shots[0].ht == "NJD" || data.shotSummary[0].shots[0].at == "NJD") {
 arr.push(data.gid);
 console.log(arr);
 console.log(arr.length + " games");
 }
 });
 */