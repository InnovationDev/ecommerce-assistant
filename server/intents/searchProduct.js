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

var promises = [];

function searchProduct(product_id){

	// YaaS 초기화 및 언어 설정
  hybris.init(hostname, port, clientId, clientSecret, username, password);

  // return hybris.catalog.getCatalogs().then((catalog) => {console.log(catalog)});

  return hybris.product.searchProduct(product_id)
  .then((product) => {
    product_len = product.products.length < 10 ? product.products.length : 10;

    console.log(`Product Length : ${product_len}`)

    const products = product.products.slice(0, product_len).map(product_id => (product_id.code));
    console.log(`Products are : ${products}`)

    // Product의 ID별 제품 정보
    for(var i in products){
    // 제품 정보 추가
      promises.push(hybris.product.getProduct(products[i])
      )
    }

    return Promise.all(promises).then(values => {
      console.log(`VALUES : ${values[0]}`)

      const cards = values.slice(0,product_len).map(product => ({
        title: product.name,
        imageUrl: 'https://localhost:9002' + product.images[0].url,
        subtitle: `${product.price.value} ${product.price.currencyIso}`,
        buttons: [
          { title: 'Add to Cart', type: 'postback', value: 'Add to Cart'},
          { title: 'Order Product', type: 'postback', value: 'Purchase'},
          { title: 'Back to Menu', type: 'postback', value: 'Back to Menu'},
        ],
      }));
      promises = []

      console.log(cards)

      // 카드들을 carousel 형식으로 Recast AI에 보냄
      return [
        { type: 'carousel', content: cards },
      ];

    }).catch(errorResponse => console.log(errorResponse));



    // return [{
    //   type: 'card',
    //   content: {
    //     title: product.name,
    //     subtitle: product.description,
    //     imageUrl: 'https://localhost:9002' + product.images[0].url,
    //     buttons: [
    //       { title: 'Add to Cart', type: 'postback', value: 'Add to Cart'},
    //       { title: 'Order Product', type: 'postback', value: 'Purchase'},
    //       { title: 'Back to Menu', type: 'postback', value: 'Back to Menu'},
    //       ],
    //     },
    //   }
    // ];
  })
}
module.exports = searchProduct;
