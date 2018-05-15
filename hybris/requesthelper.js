'use strict';
var https = require('https');
var http = require('http');
var request = require('request');
var querystring = require('querystring');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var RequestHelper = function(hostname, port, clientId, clientSecret, username, password) {

	this.hostname = hostname;
	this.port = port;
	this.clientId = clientId;
	this.clientSecret = clientSecret;
	this.username = username;
	this.password = password;

	this.getToken = function(callback) {

		var options = {
			hostname: hostname,
			port: port,
			path: '/authorizationserver/oauth/token',
			method: 'POST',
			headers: {
  			}
		};
		var body = {
			'client_id' : clientId,
			'client_secret' : clientSecret,
			'grant_type' : 'password',
			'username' : username,
			'password' : password
		};
		options.path = options.path + "?" + querystring.stringify(body);

		var req = https.request(options, (res) => {
			res.setEncoding('utf8');
			res.on('data', (data) => {
      				var response = JSON.parse(data);
      				this.accessToken = response.access_token;
      				console.log("RequestHelper.getToken():" + this.accessToken);
      				callback(this.accessToken);
    			});
    		res.on('end', () => {});
  		});
		req.on('error', (e) => {
			console.log(`problem with request: ${e.message}`);
		});
		req.end();
	};

};
module.exports = RequestHelper;
