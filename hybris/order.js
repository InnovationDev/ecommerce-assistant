var https = require('https');
var http = require('http');
var request = require('request');
var querystring = require('querystring');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var Order = function(requestHelper) {
  this.requestHelper = requestHelper;
  this.placeOrder = function(userId, cartId) {
	return new Promise((resolve, reject) => {

    var RequestHelper = require('./requesthelper.js');
    requestHelper.getToken(function (token) {
      var body = querystring.stringify({
        cartId: cartId
      })
      var options = {
        hostname: requestHelper.hostname,
        port: requestHelper.port,
        path: '/rest/v2/electronics/users/' + userId + '/orders',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': body.length
        }
      };
      options.headers.Authorization = 'Bearer ' + token;
      var req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (order) => {
          console.log("Order.placeOrder():" + order);
          resolve(JSON.parse(order));
        });
        res.on('end', () => {});
      });
      req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
        reject(e);
      });
      req.write(body);
      req.end();

    });
   }) // end of promise
 },
 this.getOrders = function(userId) {
 return new Promise((resolve, reject) => {

   var RequestHelper = require('./requesthelper.js');
   requestHelper.getToken(function (token) {

     var options = {
       hostname: requestHelper.hostname,
       port: requestHelper.port,
       path: '/rest/v2/electronics/users/' + userId + '/orders',
       method: 'GET',
       headers: {
         'content-type': 'application/json'
       }
     };
     options.headers.Authorization = 'Bearer ' + token;
     var req = https.request(options, (res) => {
       res.setEncoding('utf8');
       res.on('data', (order) => {
         console.log("Order.getOrders():" + order);
         resolve(JSON.parse(order));
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
module.exports = Order;
