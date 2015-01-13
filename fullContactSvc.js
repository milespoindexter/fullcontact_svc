#!/usr/bin/env node

var js2xmlparser = require("js2xmlparser");
var net = require('net');
var fcClient = require('./fullContactClient');
var dateUtils = require('./dateUtils');

process.on('uncaughtException', function(err) {
    console.log(dateUtils.today()+'| FullContactSvc caught exception: ' + err);
    console.log(err.stack);
});

var server = net.createServer(function (socket) {
    socket.on('error', function(err){
        console.log(dateUtils.today()+'| FullContactSvc caught socket IO exception: ' + err);
    });
});

exports.infoXml = function(req, res) {
    var apiKey = req.query.apiKey;
    var email = req.query.email;
    
    email = email.replace(/%3A/g, ':').replace(/%2E/g,'.').replace(/%2D/g,'-').replace(/%2F/g,'/');

    //console.log('FullContact email: '+email);

    fcClient.getData(email, apiKey, "xml", function(err, dataXml) {
        if(err) {
            res.send({'error':'Error getting FullContact data: '+err});
        }
        //convert to xml
        //var dataXml = js2xmlparser( "response", JSON.parse(data) );
        //res.header('Content-Type', 'text/xml');

        //for INFA work-around: replace <status> tag with <statusRC>
        dataXml = dataXml.replace(/status>/g, 'statusRC>')

        res.contentType('text/xml');
        res.send(dataXml);
    });
}


