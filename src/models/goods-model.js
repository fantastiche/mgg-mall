import apiConfig from '../configs/api-config'
import $http, {login} from '../util/api-util'

const GoodsModel = {
  // 商品详情
  getToken: function (params, successCallback, failCallback, token) {
    let api = apiConfig.getToken
    login(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 商品详情
  login: function (params, successCallback, failCallback, token) {
    let api = apiConfig.login
    login(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  storeOrder: function (params, successCallback, failCallback, token) {
    let api = apiConfig.storeOrder
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  storeAddOrder: function (params, successCallback, failCallback, token) {
    let api = apiConfig.storeAddOrder
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  storeRegister: function (params, successCallback, failCallback, token) {
    let api = apiConfig.storeRegister
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 商品详情
  categoryList: function (params, successCallback, failCallback, token) {
    let api = apiConfig.categoryList
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 商品详情
  goods: function (params, successCallback, failCallback, token) {
    let api = apiConfig.goods
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 加入购物车
  cartAdd: function (params, successCallback, failCallback, token) {
    let api = apiConfig.cartAdd
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 购物车编辑
  cartUpdate: function (params, successCallback, failCallback, token) {
    let api = apiConfig.cartUpdate
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 购物车列表
  cartList: function (params, successCallback, failCallback, token) {
    let api = apiConfig.cartList
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 购物车编辑
  cartDelete: function (params, successCallback, failCallback, token) {
    let api = apiConfig.cartDelete
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 获取预支付信息
  beforeOrder: function (params, successCallback, failCallback, token) {
    let api = apiConfig.beforeOrder
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 提交订单
  orderAdd: function (params, successCallback, failCallback, token) {
    let api = apiConfig.orderAdd
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 提交订单
  orderList: function (params, successCallback, failCallback, token) {
    let api = apiConfig.orderList
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 提交订单
  orderDetail: function (params, successCallback, failCallback, token) {
    let api = apiConfig.orderDetail
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 添加地址
  addressAdd: function (params, successCallback, failCallback, token) {
    let api = apiConfig.addressAdd
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 店主信息
  shopInfo: function (params, successCallback, failCallback, token) {
    let api = apiConfig.shopInfo
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 获取验证码
  sms: function (params, successCallback, failCallback, token) {
    let api = apiConfig.sms
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 获取验证码
  pay: function (params, successCallback, failCallback, token) {
    let api = apiConfig.pay
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 我的
  mine: function (params, successCallback, failCallback, token) {
    let api = apiConfig.mine
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 我的
  orderCount: function (params, successCallback, failCallback, token) {
    let api = apiConfig.orderCount
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 我的
  indexSwiper: function (params, successCallback, failCallback, token) {
    let api = apiConfig.indexSwiper
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 我的
  plate: function (params, successCallback, failCallback, token) {
    let api = apiConfig.plate
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 我的
  category: function (params, successCallback, failCallback, token) {
    let api = apiConfig.category
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 我的
  visit: function (params, successCallback, failCallback, token) {
    let api = apiConfig.visit
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  },
  // 获取验证码
  share: function (params, successCallback, failCallback, token) {
    let api = apiConfig.share
    $http(api, params, function (res) {
      successCallback(res.data)
    }, function (res) {
      failCallback(res)
    }, token)
  }
}

export default GoodsModel
