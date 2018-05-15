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

function viewCart(){

	// YaaS 초기화 및 언어 설정
  hybris.init(hostname, port, clientId, clientSecret, username, password);
  return hybris.cart.getCart('current', 'current')
  .then((cart) => {

    entries = cart.entries;
    cart_len = cart.entries.length;

    const cards = entries.slice(0,cart_len).map(product => ({
    title: product.product.name,
    imageUrl: 'product.imageUrl',
    subtitle: `${product.totalPrice.value} ${product.totalPrice.currencyIso}`,
    //price: product.body.prices[0].originalAmount,
    //category: product.body.categories[0].name,
    buttons: [
        {
          type: 'postback',
          value: 'purchase',
          title: 'purchase',
        },
      ],
    }));

    // 카드들을 carousel 형식으로 Recast AI에 보냄
    return [
      {
        type: 'text',
        content: `You have ${cart.totalItems} items in your cart with total price of ${cart.totalPrice.value} ${cart.totalPrice.currencyIso}.`,
      },
      { type: 'carousel', content: cards },
    ];

  })

}
module.exports = viewCart;
