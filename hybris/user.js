var https = require('https');
var http = require('http');
var request = require('request');
var querystring = require('querystring');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var User = function(requestHelper) {
  this.requestHelper = requestHelper;
  this.getUser = function(userId) {

  	return new Promise((resolve, reject) => {
    var RequestHelper = require('./requesthelper.js');
    requestHelper.getToken(function (token) {

      var options = {
        hostname: requestHelper.hostname,
        port: requestHelper.port,
        path: '/rest/v2/electronics/users/' + userId,
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      };
      options.headers.Authorization = 'Bearer ' + token;

		var req = https.request(options, (res) => {
        	res.setEncoding('utf8');
        	res.on('data', (user) => {
            console.log("User.getUser():" + user);
				    resolve(JSON.parse(user));
        	});//end of data
        	res.on('end', () => {});
		});//end of request

		req.on('error', (e) => {
			console.log(`problem with request: ${e.message}`);
			reject(e);
		});//end of error

		req.end();

	}); //end of request helper
   }) // end of promise
  },//end of get user
  this.getPaymentInfos = function(userId) {
	return new Promise((resolve, reject) => {

    var RequestHelper = require('./requesthelper.js');
    requestHelper.getToken(function (token) {

      var options = {
        hostname: requestHelper.hostname,
        port: requestHelper.port,
        path: '/rest/v2/electronics/users/' + userId + '/paymentdetails',
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      };
      options.headers.Authorization = 'Bearer ' + token;
      var req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (paymentdetails) => {
          console.log("User.getPaymentInfos():" + paymentdetails);
          resolve(JSON.parse(paymentdetails));
        });
        res.on('end', () => {});
      });
      req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
        reject(e);
      });
      req.end();

    });
   }) // end of promise
  }
}
module.exports = User;
