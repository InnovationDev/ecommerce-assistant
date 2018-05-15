const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const viewOrder = require('./intents/viewOrder.js');
const orderProduct = require('./intents/orderProduct.js');
const viewCart = require('./intents/viewCart.js');
const addToCart = require('./intents/addTocart.js');
const searchProduct = require('./intents/searchProduct.js');
const viewCatalog = require('./intents/viewCatalog.js');
var path = require('path');

const app = express();

app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, 'public')));


app.post('/errors', (req,res) => {
	console.error(req.body);
	res.sendStatus(200);
});
//

app.post('/search-product', (req, res) => {
	console.log('[POST] /search-product');
	console.log(req.body.conversation.memory)

	const memory = req.body.conversation.memory;
	const product_code = memory.product_code.value;
	console.log(`PRODUCT CODE = ${product_code}`)

	return searchProduct(product_code).then((card) => res.json({
			replies: card,
		})
  ).catch((err) => console.error('hybrisApi::searchProduct error: ', err));
});

app.post('/view-catalog', (req, res) => {
	console.log('[POST] /view-catalogs');
	//const memory = req.body.conversation.memory;
	//const products = memory.product.value;

	return viewCatalog().then((carouselle) => res.json({
			replies: carouselle,
		})
  ).catch((err) => console.error('hybrisApi::searchProduct error: ', err));
});

/* Cart Operations */
app.post('/view-cart', (req, res) => {
	console.log('[POST] /view-cart');

	return viewCart().then((text) => res.json({
			replies: text,
		})
  ).catch((err) => console.error('hybrisApi::viewCart error: ', err));
});

app.post('/add-to-cart', (req, res) => {
	var product_code = '1934793'; //PowerShot A480
	var quantity = 1;
	console.log('[POST] /add-to-cart');
	// const memory = req.body.conversation.memory;
	// const product_code = memory.product.value;
	// const quantity = memory.number.value;

	return addToCart(product_code, quantity).then((text) => res.json({
			replies: text,
		})
  ).catch((err) => console.error('hybrisApi::addToCart error: ', err));
});

/* Order Operations */
app.post('/view-order', (req, res) => {
	console.log('[POST] /view-order');

	return viewOrder().then((carouselle) => res.json({
			replies: carouselle,
		})
  ).catch((err) => console.error('hybrisApi::viewOrder error: ', err));
});

app.post('/order-product', (req, res) => {
	console.log('[POST] /order-product');
	// const memory = req.body.conversation.memory;
	// const order = memory.order.value;

	return orderProduct()
		.then((carouselle) => res.json({
			replies: carouselle,
		})).catch((err) => console.error('yaasApi::orderProduct error: ', err));
});


app.listen(config.SERVER_PORT, () => console.log(`App started on port ${config.SERVER_PORT}`));
