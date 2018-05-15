var https = require('https');
var http = require('http');
var request = require('request');
var querystring = require('querystring');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var Cart = function(requestHelper) {
  this.requestHelper = requestHelper;
  this.createCart = function(userId) {
	return new Promise((resolve, reject) => {

    var RequestHelper = require('./requesthelper.js');
    requestHelper.getToken(function (token) {

      var options = {
        hostname: requestHelper.hostname,
        port: requestHelper.port,
        path: '/rest/v2/electronics/users/'+ userId + '/carts',
        method: 'POST',
        headers: {
        	'content-type': 'application/json'
        }
      };
      options.headers.Authorization = 'Bearer ' + token;
      var req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
          console.log("Cart.createCart():" + data);
          resolve(JSON.parse(data));
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
  },
  this.addToCart = function(userId, cartId, code, quantity) {
	return new Promise((resolve, reject) => {

    var RequestHelper = require('./requesthelper.js');
    requestHelper.getToken(function (token) {

      var options = {
        hostname: requestHelper.hostname,
        port: requestHelper.port,
        path: '/rest/v2/electronics/users/' + userId + '/carts/' + cartId + '/entries',
        method: 'POST',
        headers: {
        	'content-type': 'application/json'
        }
      };
      options.headers.Authorization = 'Bearer ' + token;
      var req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
          console.log("Cart.addToCart():" + data);
          var jsonData = JSON.parse(data);
          var errors = jsonData.errors;
          if (errors != null)
          {
            for (var i in errors) {
              error = errors[i];
              if (error.reason = "notFound")
              {
                reject("CartNotFound");
              }
            }
            reject(jsonData.errors);
          }
          resolve(jsonData);
        });
        res.on('end', () => {});
      });
      req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
        reject(e);
      });
      var body = {
        product: {
          code: code
        },
        quantity: quantity
      }
      req.write(JSON.stringify(body));
      req.end();

    });
   }) // end of promise
  },
  this.setAddress = function(userId, cartId, addressId) {
	return new Promise((resolve, reject) => {

    var RequestHelper = require('./requesthelper.js');
    requestHelper.getToken(function (token) {

      var body = querystring.stringify({
        addressId: addressId
      })
      var options = {
        hostname: requestHelper.hostname,
        port: requestHelper.port,
        path: '/rest/v2/electronics/users/'+ userId + '/carts/' + cartId + '/addresses/delivery',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': body.length
        }
      };
      options.headers.Authorization = 'Bearer ' + token;
      var req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', () => {});
        res.on('end', () => {
          console.log("Cart.setAddress()");
          resolve();
        });
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
  this.setDeliveryMode = function(userId, cartId, deliveryModeId) {
	return new Promise((resolve, reject) => {

    var RequestHelper = require('./requesthelper.js');
    requestHelper.getToken(function (token) {

      var body = querystring.stringify({
        deliveryModeId: deliveryModeId
      })
      var options = {
        hostname: requestHelper.hostname,
        port: requestHelper.port,
        path: '/rest/v2/electronics/users/'+ userId + '/carts/'+ cartId + '/deliverymode',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': body.length
        }
      };
      options.headers.Authorization = 'Bearer ' + token;
      var req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', () => {});
        res.on('end', () => {
          console.log("Cart.setDeliveryMode()");
          resolve();
        });
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
  this.setCreditCardPayment = function(userId, cartId, paymentDetailsId) {
	return new Promise((resolve, reject) => {

    var RequestHelper = require('./requesthelper.js');
    requestHelper.getToken(function (token) {

      var body = querystring.stringify({
        paymentDetailsId: paymentDetailsId
      })
      var options = {
        hostname: requestHelper.hostname,
        port: requestHelper.port,
        path: '/rest/v2/electronics/users/'+ userId + '/carts/'+ cartId + '/paymentdetails',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': body.length
        }
      };
      options.headers.Authorization = 'Bearer ' + token;
      var req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {});
        res.on('end', () => {
          console.log("Cart.setCreditCardPayment()");
          resolve();
        });
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
  this.getCarts = function(userId) {
  return new Promise((resolve, reject) => {
    var RequestHelper = require('./requesthelper.js');
    requestHelper.getToken(function (token) {

      var options = {
        hostname: requestHelper.hostname,
        port: requestHelper.port,
        path: '/rest/v2/electronics/users/' + userId + '/carts',
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      };
      options.headers.Authorization = 'Bearer ' + token;
      var req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
          console.log("Cart.getCarts():" + data);
          resolve(JSON.parse(data));
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
 },
  this.getCart = function(userId, cartId) {
	return new Promise((resolve, reject) => {
    var RequestHelper = require('./requesthelper.js');
    requestHelper.getToken(function (token) {

      var options = {
        hostname: requestHelper.hostname,
        port: requestHelper.port,
        path: '/rest/v2/electronics/users/' + userId + '/carts/' + cartId,
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      };
      options.headers.Authorization = 'Bearer ' + token;
      var req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
          console.log("Cart.getCart():" + data);
          resolve(JSON.parse(data));
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
module.exports = Cart;
