const config = require('../config.js');
const Hybris = require('../../hybris/hybris.js');
var hybris = new Hybris();

var hostname = config.HYBRIS_HOSTNAME;
var port = config.HYBRIS_PORT;
var clientId = config.HYBRIS_CLIENT_ID;
var clientSecret = config.HYBRIS_CLIENT_SECRET;
var username = config.HYBRIS_HOSTNAME;
var password = config.HYBRIS_PASSWORD;

var productCode = '1934793'; //PowerShot A480
var quantity = 1;
var deliveryModeId = 'standard-gross';

var promises = [];

function discoverProduct(){

	// YaaS 초기화 및 언어 설정
  hybris.init(hostname, port, clientId, clientSecret, username, password);
  return hybris.product.getProduct(productCode)
  .then((product) => {
    console.log("Product: " + product.name)
    console.log("Stock: " + product.stock.stockLevel)
    return [{
      type: 'card',
      content: {
        title: `${product.name}`,
        subtitle: 'PRODUCT1',
        imageUrl: '',
        buttons: [
          { title: 'Add to Cart', type: 'BUTTON_TYPE', value: 'Add to Cart'},
          { title: 'Purchase', type: 'BUTTON_TYPE', value: 'Purchase'},
        ],
      },
    }];
    // return [{
    //   type: 'quickReplies',
    //   content: {
    //     title: `${product.name} 제품이 존재합니다!`,
    //     buttons: [{ title: 'Start over', value: 'Start over'}],
    //   },
    // }];
  })

	// YaaS에서 모든 카테고리 가져오고 사용자 input과 Matching하는 카테고리 있는지 확인
}
module.exports = discoverProduct;
