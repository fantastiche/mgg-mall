import Vue from 'vue'
import Router from 'vue-router'
import PageTransition from '../components/PageTransition/PageTransition'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageTransition',
      component: PageTransition,
      children: [{
        path: '/',
        redirect: '/enter'
      }, {
        path: '/enter',
        name: 'enter',
        component: resolve => require(['../views/enter.vue'], resolve)
      }, {
        path: '/index',
        name: 'index',
        component: resolve => require(['../views/Index/index.vue'], resolve)
      }, {
        path: '/storeGoods',
        name: 'storeGoods',
        component: resolve => require(['../views/store/store-goods.vue'], resolve)
      }, {
        path: '/storeInfo',
        name: 'storeInfo',
        component: resolve => require(['../views/store/store-info.vue'], resolve)
      }, {
        path: '/register',
        name: 'register',
        component: resolve => require(['../views/Register/register.vue'], resolve)
      }, {
        path: '/registerConfirm',
        name: 'registerConfirm',
        component: resolve => require(['../views/Register/register-confirm.vue'], resolve)
      }, {
        path: '/mine',
        name: 'mine',
        component: resolve => require(['../views/Mine/mine.vue'], resolve)
      }, {
        path: '/shoppingCart',
        name: 'shoppingCart',
        component: resolve => require(['../views/ShoppingCart/shopping-cart-list.vue'], resolve)
      }, {
        path: '/activity51',
        name: 'activity51',
        component: resolve => require(['../views/Other/activity51.vue'], resolve)
      }, {
        path: '/orderConfirm',
        name: 'orderConfirm',
        component: resolve => require(['../views/Order/order-confirm.vue'], resolve)
      }, {
        path: '/orderDetail',
        name: 'orderDetail',
        component: resolve => require(['../views/Order/order-detail.vue'], resolve)
      }, {
        path: '/orderList',
        name: 'orderList',
        component: resolve => require(['../views/Order/order-list.vue'], resolve)
      }, {
        path: '/orderPay',
        name: 'orderPay',
        component: resolve => require(['../views/Order/order-pay.vue'], resolve)
      }, {
        path: '/addressEdit',
        name: 'addressEdit',
        component: resolve => require(['../views/Address/address-edit.vue'], resolve)
      }, {
        path: '/goodsIndex',
        name: 'goodsIndex',
        component: resolve => require(['../views/Goods/goods-index.vue'], resolve),
        children: [{
          path: '/goodsIndex/goodsDetail',
          name: 'goodsDetail',
          component: resolve => require(['../views/Goods/goods-detail.vue'], resolve)
        }, {
          path: '/goodsIndex/goodsType',
          name: 'goodsType',
          component: resolve => require(['../views/Goods/goods-type.vue'], resolve)
        }, {
          path: '/goodsIndex/goodsInfo',
          name: 'goodsInfo',
          component: resolve => require(['../views/Goods/goods-info.vue'], resolve)
        }]
      }]
    }
  ]
})
