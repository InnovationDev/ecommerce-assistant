var https = require('https');
var http = require('http');
var request = require('request');
var querystring = require('querystring');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var Catalog = function(requestHelper) {

  	this.requestHelper = requestHelper;
  	this.getCatalogs = function(code) {
		return new Promise((resolve, reject) => {

    	var RequestHelper = require('./requesthelper.js');
    	requestHelper.getToken(function (token) {

      	var options = {
        	hostname: requestHelper.hostname,
        	port: requestHelper.port,
        	path: '/rest/v2/electronics/catalogs/electronicsProductCatalog/Online/categories/1',
        	method: 'GET',
        	headers: {
          	'Accept': 'application/json'
        	}
      	};
      	var req = https.request(options, (res) => {
        	res.setEncoding('utf8');
        	res.on('data', (catalogs) => {
          	console.log("Catalog.getCatalogs():" + catalogs);
            // console.log(typeof catalogs)
            // console.log(`Length : ${catalogs.catalogs}`)
            // console.log('AAI!!!!!!!!!!')
          	return resolve(JSON.parse(catalogs));
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
module.exports = Catalog;
