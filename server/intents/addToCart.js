const config = require('../config.js');
const Hybris = require('../../hybris/hybris.js');
var hybris = new Hybris();

var hostname = config.HYBRIS_HOSTNAME;
var port = config.HYBRIS_PORT;
var clientId = config.HYBRIS_CLIENT_ID;
var clientSecret = config.HYBRIS_CLIENT_SECRET;
var username = config.HYBRIS_USERNAME;
var password = config.HYBRIS_PASSWORD;

//var productCode = '1934793'; //PowerShot A480
//var quantity = 1;
var deliveryModeId = 'standard-gross';

var promises = [];

function addToCart(product_code, quantity){

	// YaaS 초기화 및 언어 설정
  hybris.init(hostname, port, clientId, clientSecret, username, password);
  return hybris.cart.getCart('current', 'current')
  .then((data) => {console.log('CARTS ARE: ' + data);
  hybris.cart.addToCart('current', 'current', product_code, quantity)})
  .then((cart) => {
    console.log("Cart: " + cart)
    return [{
      type: 'quickReplies',
      content: {
        title: `Your product has been successfully added to cart!`,
        buttons: [{ title: 'Start over', value: 'Start over'}],
      },
    }];
  })

	// YaaS에서 모든 카테고리 가져오고 사용자 input과 Matching하는 카테고리 있는지 확인
}
module.exports = addToCart;
