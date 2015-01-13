var express = require('express')
bodyParser = require('body-parser'),
logger = require('morgan'),
fullContactSvc = require('./fullContactSvc');

var PORT = 2900;
var app = express();
 
//app.set('port', process.env.PORT || config.port);
app.use(logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser());


app.get('/fullcontact/xml/info', fullContactSvc.infoXml);
 
app.listen(PORT);
console.log('FullContact Service Listening on port '+PORT+'...');