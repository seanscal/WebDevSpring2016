require('dotenv').config();

var express         = require('express');
var bodyParser      = require('body-parser');
var multer          = require('multer');
var passport        = require('passport');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var app = express();


// install and require the mongoose library
var mongoose      = require('mongoose');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/cs5200';

 //use remote connection string
 //if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
console.log(connectionString);

//connect to the database
var db = mongoose.connect(connectionString);

multer();

app.use(session({
    secret: process.env.WEBDEV_SESSION_SECRET,
    resave: true,
    saveUninitialized: true}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

require("./public/assignment3/server/app.js")(app, db);
require("./public/assignment4/server/app.js")(app, db, mongoose);
require("./public/assignment5/server/app.js")(app, db, mongoose);

require("./public/project/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);