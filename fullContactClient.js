#!/usr/bin/env node

var dateUtils = require('./dateUtils');
var https = require('https');
var sleep = require('sleep');

//String TEST_URL = "https://api.fullcontact.com/v2";

var options = {
  hostname: 'api.fullcontact.com',
  port: 443,
  path: '/v2',
  method: 'GET'
};

var counter = 1;
var rateLimitRemaining = 600;
var rateLimitReset = 2;

var X_RATE_LIMIT = "x-rate-limit-remaining";
var X_RATE_RESET = "x-rate-limit-reset";

exports.getData = function(email, apiKey, format, cb) {

  var body = '';

  //console.log(dateUtils.today()+"| handling FullContact request number "+(counter++));
  console.log(dateUtils.today()+"| FullContact X-Rate-Limit-Remaining: "+rateLimitRemaining);
  console.log(dateUtils.today()+"| FullContact X-Rate-Limit-Reset: "+rateLimitReset);

  //check if we have to pause before making this request . . .
  if(rateLimitRemaining <= 50) {
      //pause the amount specified
      var pause = 1;
      if(rateLimitReset > 1) { //sometimes this value is 0 or a negative number!
        pause = ( Number(rateLimitReset) + 2);
      }
      
      console.log(dateUtils.today()+"| FullContact service pausing for "+pause+" seconds . . .");
      //var delay = pause * 1000;
      //var delay = pause * 1; //multiply times one to make sure this is a number, not string
      //dateUtils.sleep(delay);
      //dateUtils.microSleepBlock(delay);
      sleep.sleep( Number(pause) );
      //sleep.usleep(delay);

      console.log(dateUtils.today()+"| Pause completed. Resuming service.");
  }


  if(format === "xml") {
    options['path'] = "/v2/person.xml?email="+email+
                    "&apiKey="+apiKey;

  }
  else {
    options['path'] = "/v2/person.json?email="+email+
                    "&apiKey="+apiKey;

  }
  
  //console.log(dateUtils.today()+"| FullContact request: https://"+options['hostname']+options['path']);

  var fcCallback = function(fcRes) {
    //console.log(dateUtils.today()+"| FC STATUS: " + fcRes.statusCode);
    //console.log(dateUtils.today()+"| FC HEADERS: " + JSON.stringify(fcRes.headers));
    var headers = fcRes.headers;
    try {
      rateLimitRemaining = headers[X_RATE_LIMIT] || 40;
      rateLimitReset = headers[X_RATE_RESET] || 2;
      //console.log(dateUtils.today()+"| "+X_RATE_LIMIT+": "+rateLimitRemaining);
      //console.log(dateUtils.today()+"| "+X_RATE_RESET+": "+rateLimitReset);

    }
    catch(headErr) {
      //console.log(dateUtils.today()+"| could not get rate limit headers from FullContact.");
    }


    fcRes.setEncoding('utf8');

    fcRes.on('data', function (chunk) {
      //console.log(dateUtils.today()+"| FB CHUNK: " + chunk);
      body += chunk;
      
    });

    fcRes.on('error', function(e) {
      //console.log(dateUtils.today()+"| problem with FullContact request: " + e.message);
      cb(e.message);
    });

    fcRes.on('end', function() {
      //console.log(dateUtils.today()+"| FC request completed: " + body);
      cb(null, body);

    });


  }

  //check headers to see if we should pause before hitting site . . .
  https.request(options, fcCallback).end();


}