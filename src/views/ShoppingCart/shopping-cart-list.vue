<template>
  <div class="content">
    <my-nav :position="1" ref="myNav"></my-nav>
    <div v-if="list.length>0">
      <transition name="slide-fade">
        <div class="top vux-1px-b" v-if="!isEdit">
          <div @click="allCheck">
            <span :class="{'icon-check': checkAll,'icon-uncheck':!checkAll}"></span>
            <span>全选</span>
          </div>
          <span @click="edit">编辑</span>
        </div>
      </transition>
      <transition name="slide-fade">
        <div class="top vux-1px-b" v-if="isEdit">
          <div></div>
          <span @click="edit">完成</span>
        </div>
      </transition>
      <transition name="slide-fade-bottom">
        <div class="sub" v-if="isEdit">
          <div class="sub-info vux-1px-t">
            <span @click="allCheck" :class="{'icon-check': checkAll,'icon-uncheck':!checkAll}"></span>
            <span class="edit-text">全选</span>
          </div>
          <div class="sub-btn edit-btn" @click="deleteGoods">删除<span v-if="num>0">({{num}})</span></div>
        </div>
      </transition>
      <transition name="slide-fade-bottom">
        <div class="sub" v-if="!isEdit">
          <div class="sub-info vux-1px-t">
            <span>总价：</span>
            <span>￥{{totalPrice.toFixed(2)}}</span>
          </div>
          <div class="sub-btn" @click="settle">结算<span v-if="num>0">({{num}})</span></div>
        </div>
      </transition>
      <scroll ref="wrapper" class="scroll-content">
        <div class="cart-body">
          <div class="cart-item vux-1px-b" v-for="(item, index) in list">
            <span @click="check(item,index)" :class="{'icon-check': item.check,'icon-uncheck':!item.check}"></span>
            <img :src="item.goods_pic+'?x-oss-process=image/resize,m_lfit,h_200,w_200'" alt="">
            <div class="cart-item-right">
              <div class="cart-item-title">{{item.goods_name}}</div>
              <div class="cart-item-spec">规格:{{item.spec_name}}</div>
              <div class="cart-item-ctrl">
                <span class="cart-item-price">￥{{item.goods_price.toFixed(2)}}</span>
                <div class="goods-num-ctrl">
                  <span @click="sub(item, index)">－</span>
                  <input type="text" v-model="item.goods_count">
                  <span @click="add(item, index)">＋</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <div v-if="list.length===0" class="nodata">
      <img src="./image@2x.png" alt="">
      <div class="nodata-title">空空如也～快去挑选商品吧</div>
      <div class="nodata-btn" @click="goIndex">立即购买</div>
    </div>
  </div>
</template>

<script>
  import Scroll from 'components/Scroll/Scroll'
  import MyNav from 'components/Nav/Nav'
  import GoodsModel from '../../models/goods-model'

  export default {
    components: {
      Scroll,
      MyNav
    },
    data: function () {
      return {
        list: [],
        num: 0,
        cartNum: 0,
        checkAll: false,
        isEdit: false,
        totalPrice: 0
      }
    },
    methods: {
      init: function () {
        GoodsModel.cartList({}, (res) => {
          this.list = res.data.cartlist
          this.cartNum = res.data.cart_count
          this.list.forEach((item, index, array) => {
            item.check = false
          })
        }, () => {
        }, sessionStorage.getItem('token'))
      },
      getTotal: function () {
        let totalPrice = 0
        this.list.forEach((item, index, array) => {
          if (item.check) {
            totalPrice += item.goods_price * item.goods_count
          }
        })
        this.totalPrice = totalPrice
      },
      add: function (item, index) {
        let num = item.goods_count + 1
        let params = {
          cart_id: item.cart_id,
          goods_id: item.goods_id,
          goods_count: num
        }
        GoodsModel.cartUpdate(params, (res) => {
          if (res.data.result === 1) {
            item.goods_count = num
            this.getTotal()
            this.$refs.myNav.init()
          }
        }, () => {
        }, sessionStorage.getItem('token'))
      },
      goIndex: function () {
        this.$router.push({
          path: '/index'
        })
      },
      sub: function (item, index) {
        if (item.goods_count > 1) {
          let num = item.goods_count - 1
          let params = {
            cart_id: item.cart_id,
            goods_id: item.goods_id,
            goods_count: num
          }
          GoodsModel.cartUpdate(params, (res) => {
            if (res.data.result === 1) {
              item.goods_count = num
              this.getTotal()
              this.$refs.myNav.init()
            }
          }, () => {
          }, sessionStorage.getItem('token'))
        }
      },
      check: function (item, index) {
        item.check = !item.check
        this.$set(this.list, index, item)
        this.getTotal()
      },
      allCheck: function () {
        if (!this.checkAll) {
          this.list.forEach((item, index, array) => {
            item.check = true
            this.$set(this.list, index, item)
          })
          this.checkAll = true
        } else {
          this.list.forEach((item, index, array) => {
            item.check = false
            this.$set(this.list, index, item)
          })
          this.checkAll = false
        }
        this.getTotal()
      },
      edit: function () {
        this.list.forEach((item, index, array) => {
          item.check = false
          this.$set(this.list, index, item)
        })
        this.getTotal()
        this.checkAll = false
        this.isEdit = !this.isEdit
      },
      deleteGoods: function () {
        const that = this
        let ids = ''
        that.list.forEach((item, index, array) => {
          if (item.check) {
            ids += (item.cart_id + ',')
          }
        })
        if (!ids) {
          console.log('aaa')
        } else {
          this.$vux.confirm.show({
            content: '很抢手哦~下次不一定能买得到，确定要删除吗？',
            onCancel: function () {
            },
            onConfirm: function () {
              let params = {
                CART_IDS: ids
              }
              GoodsModel.cartDelete(params, (res) => {
                that.init()
                that.edit()
                that.getTotal()
              }, () => {
              }, sessionStorage.getItem('token'))
            }
          })
        }
      },
      settle: function () {
        let params = {
          goodsId: '',
          goodsCount: '',
          specId: '',
          cartId: ''
        }
        this.list.forEach((item, index, array) => {
          if (item.check) {
            params.goodsId += item.goods_id + ','
            params.goodsCount += item.goods_count + ','
            params.specId += item.spec_id + ','
            params.cartId += item.cart_id + ','
          }
        })
        if (params.goodsId === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '您没有选择任何商品哟！'
          })
          return
        }
        this.$router.push({
          path: '/orderConfirm',
          query: {
            specId: params.specId,
            goodsCount: params.goodsCount,
            goodsId: params.goodsId,
            cartId: params.cartId
          }
        })
      }
    },
    created: function () {
      this.init()
    },
    watch: {
      list: function (val, old) {
        let num = 0
        this.list.forEach((item, index, array) => {
          if (item.check) {
            num++
          }
        })
        this.num = num
        this.$nextTick(() => {
          this.$refs.myNav.init()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  //noinspection CssUnknownTarget
  @import '~common/less/mixin.less';

  .nodata {
    height: 100%;
    width: 100%;
    background: #f3f5f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 388/@rem;
      height: 288/@rem;
    }
    .nodata-title {
      .dpr-font(15px);
      color: #333333;
      margin-top: 56/@rem;
    }
    .nodata-btn {
      width: 200/@rem;
      height: 72/@rem;
      background: @red;
      color: white;
      border-radius: 36/@rem;
      margin-top: 60/@rem;
      .dpr-font(17px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .scroll-content {
    height: 100%;
    overflow: hidden;
  }

  .goods-num-ctrl {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    span {
      width: 58/@rem;
      height: 60/@rem;
      line-height: 60/@rem;
      border: 2/@rem solid #cccccc;
      .dpr-font(17px);
      color: #333333;
    }
    span:first-child {
      border-right: none;
      border-radius: 6/@rem 0 0 6/@rem;
    }
    span:last-child {
      border-left: none;
      border-radius: 0 6/@rem 6/@rem 0;
    }
    input {
      width: 80/@rem;
      height: 60/@rem;
      text-align: center;
      border: 2/@rem solid #cccccc;
      .dpr-font(14px);
      color: #333333;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: @white;
      padding: 0 30/@rem;
      height: 78/@rem;
      &::after {
        border-color: #e8e8e8 !important;
        color: #e8e8e8 !important;
      }
      div {
        display: flex;
        align-items: center;
        span:first-child {
          margin-right: 20/@rem;
        }
      }
    }
  }

  .cart-body {
    padding-bottom: 273/@rem;
  }

  .cart-item {
    padding: 20/@rem 30/@rem;
    display: flex;
    align-items: center;
    background: @white;
    &::after {
      border-color: #e8e8e8 !important;
      color: #e8e8e8 !important;
    }
    .icon-uncheck, .icon-check {
      width: 40/@rem;
    }
    img {
      margin-left: 20/@rem;
      width: 180/@rem;
      height: 180/@rem;
      margin-right: 20/@rem;
      border-radius: 8/@rem;
    }
    .cart-item-right {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      max-width: 430/@rem;
      .cart-item-title {
        .dpr-font(14px);
        color: #333333;
        line-height: 38/@rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .cart-item-spec {
        .dpr-font(12px);
        color: #999999;
        margin-bottom: 14/@rem;
      }
      .cart-item-ctrl {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .cart-item-price {
          .dpr-font(15px);
          color: @red;
        }
      }
    }
  }

  .sub {
    height: 100/@rem;
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 98/@rem;
    background: @white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1001;
    .sub-info {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 30/@rem;
      height: 99/@rem;
      line-height: 99/@rem;
      &::before {
        border-color: #dbdbdb;
      }
      span:first-child {
        .dpr-font(14px);
        color: #333333;
        height: 100%;
      }
      span:nth-child(2) {
        .dpr-font(16px);
        color: @red;
        height: 100%;
      }
    }
    .sub-btn {
      width: 260/@rem;
      height: 100/@rem;
      text-align: center;
      line-height: 100/@rem;
      color: @white;
      background: linear-gradient(to right, #ff3963, @red);
      .dpr-font(17px);
    }
  }

  .edit-text {
    .dpr-font(14px) !important;
    color: #333333 !important;
    margin-left: 20/@rem;
  }

  .edit-btn {
    background: #fc9613 !important;
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-50px);
    opacity: 0;
  }

  .slide-fade-bottom-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-bottom-enter, .slide-fade-bottom-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(50px);
    opacity: 0;
  }
</style>
