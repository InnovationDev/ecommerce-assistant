const config = require('../config.js');
const Hybris = require('../../hybris/hybris.js');
var hybris = new Hybris();

var hostname = config.HYBRIS_HOSTNAME;
var port = config.HYBRIS_PORT;
var clientId = config.HYBRIS_CLIENT_ID;
var clientSecret = config.HYBRIS_CLIENT_SECRET;
var username = config.HYBRIS_USERNAME;
var password = config.HYBRIS_PASSWORD;


// var productCode = '1934793'; //PowerShot A480
// var quantity = 1;
var deliveryModeId = 'standard-gross';

var promises = [];

function searchCategory(product_code){

	// YaaS 초기화 및 언어 설정
  hybris.init(hostname, port, clientId, clientSecret, username, password);

  // return hybris.catalog.getCatalogs().then((catalog) => {console.log(catalog)});

  return hybris.product.getProduct(product_code)
  .then((product) => {
    console.log("Product: " + product.name)
    //console.log("Stock: " + product.stock.stockLevel)
    return [{
      type: 'card',
      content: {
        title: product.name,
        subtitle: product.description,
        imageUrl: 'https://localhost:9002' + product.images[0].url,
        buttons: [
          { title: 'Add to Cart', type: 'postback', value: 'Add to Cart'},
          { title: 'Order Product', type: 'postback', value: 'Purchase'},
          { title: 'Back to Menu', type: 'postback', value: 'Back to Menu'},
          ],
        },
      }
    ];
  })
}
module.exports = searchCategory;
