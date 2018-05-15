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

function viewOrder(){

	// YaaS 초기화 및 언어 설정
  hybris.init(hostname, port, clientId, clientSecret, username, password);
  return hybris.order.getOrders('current')
  .then((orders) => {
    console.log('ORDERS!!!!!!!!!!!!!!!!!');
    console.log(orders)
    console.log(orders.orders[0].total)
    console.log('ORDERS!!!!!!!!!!!!!!!!!');

    order = orders.orders;
    order_len = orders.orders.length;

    const cards = order.slice(0,order_len).map(product => ({
    title: product.code,
    imageUrl: '',
    subtitle: `${product.total.value} ${product.total.currencyIso}`,
    //price: product.body.prices[0].originalAmount,
    //category: product.body.categories[0].name,
    buttons: [
        {
          type: 'postback',
          value: 'order details',
          title: 'details',
        },
      ],
    }));

    // 카드들을 carousel 형식으로 Recast AI에 보냄
    return [
      {
        type: 'text',
        content: `You have ${order_len} orders.`,
      },
      { type: 'carousel', content: cards },
    ];

  })

}
module.exports = viewOrder;
