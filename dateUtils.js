#!/usr/bin/env node

var sleep = require('sleep');

var tzoDate = new Date();
//the time difference between UTC time and local time, in minutes
var tzo = tzoDate.getTimezoneOffset();
//local UTC offset in milliseconds
var tzoMsecs = tzo * 60*1000;
//console.log("time zone offset: "+tzo); //should be 240 for EST

//date utility methods
exports.today = function() {
    return formatDate(new Date());
}

exports.localTimeZoneToday = function() {
    var d = new Date();
    //calling getTime() will give you the local time . . . ?
    var tzDate = new Date(d.getTime() + tzoMsecs);
    //console.log("localTimeZoneToday: "+tzDate.toLocaleString());
    return formatDate(tzDate);
}

var formatDate = function(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();
    var secs = date.getSeconds();
    var msecs = date.getMilliseconds();

    return year+"-"+pad(month,2)+"-"+pad(day,2)+" "+pad(hour,2)+":"+pad(min,2)+":"+pad(secs,2)+":"+msecs;

}
exports.formatDate = formatDate;

exports.addMinutes = function (date, minutes) {
    //console.log("adding "+minutes+" minutes to date: "+date.toISOString());
	//return new Date(date.getTime() + minutes*60000);
    date.setMinutes(date.getMinutes() + minutes);
    //console.log("minutes added: "+date.toISOString());
    return date;
}

exports.timeStamp = function() {
	return new Date().getTime();
}

exports.sleep = function(milliSeconds) {
    var startTime = new Date().getTime();
    setTimeout(function(){
        return console.log("paused: "+milliSeconds+" milliSeconds");
    },milliSeconds);
    //while (new Date().getTime() < (startTime + milliSeconds));
}

exports.sleepBlock = function(seconds) {
    sleep.sleep(seconds);
    return;
}

//specify sleep time in microseconds:
//(1 second is 1,000,000 microseconds)
exports.microSleepBlock = function(microseconds) {
    sleep.usleep(microseconds);
    return;
}

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}


