/**
 * Created by AliHyder on 1/17/16.
 */
var express = require('express');
var app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.listen(port, ipaddress);