'use strict';
var RequestHelper = require('./requesthelper.js');
var ProductService = require('./product.js');
var CartService = require('./cart.js');
var UserService = require('./user.js');
var OrderService = require('./order.js');
var CatalogService = require('./catalog.js');
var Hybris = function() {
	this.init = function(hostname, port, clientId, clientSecret, username, password) {
		this.requestHelper = new RequestHelper(hostname, port, clientId, clientSecret, username, password);
		this.product = new ProductService(this.requestHelper);
		this.cart = new CartService(this.requestHelper);
		this.user = new UserService(this.requestHelper);
		this.order = new OrderService(this.requestHelper);
		this.catalog = new CatalogService(this.requestHelper);
	}
};
module.exports = Hybris;
