/**
 * 接口地址与请求方法
 * @type {{ name : {path: string, method: string} }}
 */
const common = {
  getToken: {
    path: 'mgg/sso/auth/weixin',
    method: 'GET',
    port: '8002'
  },
  login: {
    path: 'mgg/sso/authentication/mobile',
    method: 'POST',
    port: '8002'
  },
  storeOrder: {
    path: 'mgg/order/order/shareToorder',
    method: 'POST',
    port: '8004'
  },
  storeAddOrder: {
    path: 'mgg/order/order/shareAddorder',
    method: 'POST',
    port: '8004'
  },
  storeRegister: {
    path: 'mgg/user/register/mobile',
    method: 'POST',
    port: '8004'
  },
  categoryList: {
    path: 'mgg/goods/category/list',
    method: 'GET',
    port: '8002'
  },
  goods: {
    path: 'mgg/goods/:id',
    method: 'GET',
    port: '8002'
  },
  cartAdd: {
    path: 'mgg/order/cart/add',
    method: 'POST',
    port: '8004'
  },
  shopInfo: {
    path: 'mgg/user/shop/info/:id',
    method: 'GET',
    port: '8004'
  },
  cartList: {
    path: 'mgg/order/cart/list',
    method: 'POST',
    port: '8004'
  },
  cartUpdate: {
    path: 'mgg/order/cart/update',
    method: 'POST',
    port: '8004'
  },
  cartDelete: {
    path: 'mgg/order/cart/cartDeleteAll',
    method: 'POST',
    port: '8004'
  },
  beforeOrder: {
    path: 'mgg/order/order/toorder',
    method: 'POST',
    port: '8004'
  },
  orderAdd: {
    path: 'mgg/order/order/addorder',
    method: 'POST',
    port: '8004'
  },
  orderList: {
    path: 'mgg/order/order/orderlist',
    method: 'POST',
    port: '8004'
  },
  orderCount: {
    path: 'mgg/order/order/orderCount',
    method: 'POST',
    port: '8004'
  },
  addressAdd: {
    path: 'mgg/order/address/add',
    method: 'POST',
    port: '8004'
  },
  orderDetail: {
    path: 'mgg/order/order/orderInfo',
    method: 'POST',
    port: '8004'
  },
  sms: {
    path: 'mgg/sso/code/sms',
    method: 'GET'
  },
  pay: {
    path: 'qqs/appwx/sign',
    method: 'POST'
  },
  mine: {
    path: 'mgg/user/index/info',
    method: 'GET'
  },
  indexSwiper: {
    path: 'mgg/activity/app/index',
    method: 'GET'
  },
  plate: {
    path: 'mgg/goods/list/plate',
    method: 'GET'
  },
  category: {
    path: 'mgg/goods/list/category',
    method: 'GET'
  },
  visit: {
    path: 'mgg/user/shop/:id/visit',
    method: 'GET'
  },
  share: {
    path: 'qqs/weixinactivity/shareToFriend.do',
    method: 'POST'
  }
}

export default common
