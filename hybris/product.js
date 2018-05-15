var https = require('https');
var http = require('http');
var request = require('request');
var querystring = require('querystring');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var Product = function(requestHelper) {

  	this.requestHelper = requestHelper;
  	this.getProduct = function(code) {
		return new Promise((resolve, reject) => {

    	var RequestHelper = require('./requesthelper.js');
    	requestHelper.getToken(function (token) {

      	var options = {
        	hostname: requestHelper.hostname,
        	port: requestHelper.port,
        	path: '/rest/v2/electronics/products/' + code + '?fields=code,name,description,images(url),price',
        	method: 'GET',
        	headers: {
          	'Accept': 'application/json'
        	}
      	};
      	var req = https.request(options, (res) => {
        	res.setEncoding('utf8');
        	res.on('data', (product) => {
          	console.log("Product.getProduct():" + product);
          	return resolve(JSON.parse(product));
        	});
        	res.on('end', () => {});
      	});
      	req.on('error', (e) => {
        	console.log(`problem with request: ${e.message}`);
        	return reject(e);
      	});
      	req.end();

    	});//end request helper
    }) // end of promise
  },
  this.searchProduct = function(code) {
  return new Promise((resolve, reject) => {

    var RequestHelper = require('./requesthelper.js');
    requestHelper.getToken(function (token) {

      var options = {
        hostname: requestHelper.hostname,
        port: requestHelper.port,
        path: '/rest/v2/electronics/products/search?query=' + code,
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      };
      var req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (product) => {
          console.log("Product.searchProduct():" + product);
          return resolve(JSON.parse(product));
        });
        res.on('end', () => {});
      });
      req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
        return reject(e);
      });
      req.end();

    });//end request helper
  }) // end of promise
  } //end getProduct
}
module.exports = Product;
