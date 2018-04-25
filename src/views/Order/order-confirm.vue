<template>
  <div class="content">
    <div class="confirm-bottom">
      <div class="confirm-info">
        <div>总价：<span>￥{{total.toFixed(2)}}</span></div>
        <div>运费：￥{{freight.toFixed(2)}}</div>
      </div>
      <div class="confirm" @click="sub">提交订单</div>
    </div>
    <scroll class="scroll-content">
      <div class="order-body">
        <div class="order-address" @click="editAddress" v-if="!address.addr_realname">
          <div class="order-address-input">
            <span class="icon-address"></span>
            <input type="text" placeholder="请填写您的收货地址" readonly>
          </div>
          <span class="icon-next"></span>
          <img src="./pic_address.png" alt="">
        </div>
        <div class="order-address-wrapper" v-if="address.addr_realname">
          <div class="order-address-info">
            <div class="order-address-name">
              <span>{{address.addr_realname}}</span>
              <span class="tag vux-1px">默认</span>
            </div>
            <div class="order-address-phone">
              {{address.addr_phone}}
            </div>
          </div>
          <div class="order-address" @click="selectAddress">
            <div class="order-address-input">
              <span class="icon-address"></span>
              <textarea v-model="address.addr_city+address.address" placeholder="请填写您的收货地址" readonly></textarea>
            </div>
            <span class="icon-next"></span>
            <img src="./pic_address.png" alt="">
          </div>
        </div>
        <div class="order-list">
          <div class="order-list-item border-1px-e8" v-for="(item, index) in list">
            <img :src="item.goods_pic+'?x-oss-process=image/resize,m_lfit,h_180,w_180'" alt="">
            <div class="order-list-item-info">
              <div class="order-list-item-info-title">
                <span>{{item.goods_name}}</span>
                <span>规格：{{item.spec_name}}</span>
              </div>
              <div class="order-list-item-info-price">
                <span>￥{{item.goods_price.toFixed(2)}}</span>
                <span>×{{item.goods_count}}</span>
              </div>
            </div>
          </div>
          <div class="remark">
            <span>备注:</span>
            <input type="text" placeholder="不接受指定快递，特殊需求请联系客服">
          </div>
        </div>
        <!--<div class="order-discounts-wrapper">-->
        <!--<div class="order-discounts border-1px-e8">-->
        <!--<span :class="{'icon-check': remaining,'icon-uncheck':!remaining}"-->
        <!--@click="remainingCheck(0)"></span>-->
        <!--<span>使用余额</span>-->
        <!--<span>(￥{{remainingNum.toFixed(2)}})</span>-->
        <!--</div>-->
        <!--<div class="order-discounts">-->
        <!--<span :class="{'icon-check': coin,'icon-uncheck':!coin}"-->
        <!--@click="remainingCheck(1)"></span>-->
        <!--<span>使用美币</span>-->
        <!--<span>(￥{{remainingNum.toFixed(2)}})</span>-->
        <!--</div>-->
        <!--</div>-->
        <div class="order-price-list">
          <div class="order-price-detail border-1px-e8">
            <span>商品金额</span>
            <span>￥{{detail.order_total.toFixed(2)}}</span>
          </div>
          <div class="order-price-other border-1px-e8">
            <div>
              <span>运费：</span>
              <span>￥{{freight.toFixed(2)}}</span>
            </div>
            <!--<div v-if="remaining">-->
            <!--<span>余额抵扣：</span>-->
            <!--<span>￥10.00</span>-->
            <!--</div>-->
            <!--<div v-if="coin">-->
            <!--<span>美币抵扣：</span>-->
            <!--<span>￥10.00</span>-->
            <!--</div>-->
          </div>
          <div class="order-price-total">
            <span>总价</span>
            <span>￥{{total.toFixed(2)}}</span>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/Scroll/Scroll'
  import GoodsModel from '../../models/goods-model'

  export default {
    components: {
      Scroll
    },
    data: function () {
      return {
        list: [],
        remaining: false,
        coin: false,
        address: {},
        detail: {},
        freight: 0,
        total: 0,
        coinNum: 0,
        remainingNum: 0
      }
    },
    methods: {
      remainingCheck: function (type) {
        if (type === 0) {
          this.remaining = !this.remaining
        } else {
          this.coin = !this.coin
        }
      },
      editAddress: function () {
        this.$router.push({
          path: '/addressEdit'
        })
      },
      selectAddress: function () {
      },
      sub: function () {
        let cartId = ''
        // let amount = 0
        if (this.$route.query.cartId) {
          cartId = this.$route.query.cartId
        }
        // if (this.remaining) {
        //   amount = this.remainingNum
        // }
        let params = {
          'spec_id': this.$route.query.specId,
          'goods_count': this.$route.query.goodsCount,
          'goods_id': this.$route.query.goodsId,
          'address_id': this.address.address_id,
          'usercoupon_id': '',
          'shopCode': sessionStorage.getItem('shopCode'),
          'cart_id': cartId,
          'payAmount': 0,
          'usercoin_id': '',
          'pay_way': ''
        }
        GoodsModel.orderAdd(params, (res) => {
          console.log(res)
          this.$vux.toast.show({
            text: '订单创建成功！',
            time: 3000,
            type: 'success'
          })
          if (res.data.result === 1) {
            this.$router.push({
              path: '/orderPay',
              query: {
                id: res.data.order_id,
                total: res.data.order_total,
                from: 0
              }
            })
          }
        }, () => {
        }, sessionStorage.getItem('token'))
      }
    },
    created: function () {
      let cartId = this.$route.query.cartId ? this.$route.query.cartId : ''
      let params = {
        'spec_id': this.$route.query.specId,
        'goods_count': this.$route.query.goodsCount,
        'goods_id': this.$route.query.goodsId,
        'usercoupon_id': '',
        'usercoin_id': '',
        'cart_id': cartId,
        'payAmount': 0
      }
      GoodsModel.beforeOrder(params, (res) => {
        this.list = res.data.list
        this.detail = res.data.pd
        this.total = res.data.order_total
        this.address = res.data.address
        this.coinNum = res.data.coin
        this.remainingNum = res.data.amount
        this.freight = res.data.freight_price
        // this.list.forEach((item, index, array) => {
        //   item.goods_price = item.goods_price.toFixed(2)
        //   this.$set(this.list, index, item)
        // })
      }, () => {
      }, sessionStorage.getItem('token'))
    }
  }
</script>

<style lang="less" scoped>
  //noinspection CssUnknownTarget
  @import '~common/less/mixin.less';

  .scroll-content {
    height: 100%;
    overflow: hidden;
  }

  .content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .confirm-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 99/@rem;
      display: flex;
      background: @white;
      z-index: 999;
      .confirm-info {
        flex-grow: 1;
        height: 99/@rem;
        display: flex;
        flex-direction: column;
        padding-left: 30/@rem;
        justify-content: center;
        border-top: 1/@rem solid #dbdbdb;
        div:first-child {
          .dpr-font(14px);
          color: #333333;
          span {
            .dpr-font(16px);
            color: @red;
          }
        }
        div:nth-child(2) {
          .dpr-font(11px);
          color: #999999;
        }
      }
      .confirm {
        width: 260/@rem;
        height: 100/@rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to right, #ff3963, @red);
        .dpr-font(17px);
        color: @white;
      }
    }
  }

  .order-address-wrapper {
    background: @white;
    padding-top: 30/@rem;
    margin-top: 20/@rem;
    .order-address-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 76/@rem 0 82/@rem;
      .order-address-name {
        display: flex;
        align-items: center;
        span:first-child {
          .dpr-font(15px);
          color: #333333;
        }
        .tag {
          width: 58/@rem;
          height: 28/@rem;
          line-height: 28/@rem;
          text-align: center;
          .dpr-font(10px);
          color: @red;
          margin-left: 28/@rem;
        }
        .vux-1px:before {
          color: @red !important;
          border-color: @red !important;
          border-radius: 14/@rem !important;
        }
      }
      .order-address-phone {
        .dpr-font(15px);
        color: #333333;
      }
    }
    .order-address {
      height: auto !important;
      align-items: flex-start !important;
      padding-bottom: 30/@rem !important;
      .order-address-input {
        align-items: flex-start !important;
      }
    }
  }

  .order-body {
    padding-bottom: 120/@rem;
    .order-address {
      height: 104/@rem;
      background: @white;
      position: relative;
      margin-top: 20/@rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20/@rem 0 26/@rem;
      .order-address-input {
        display: flex;
        align-items: center;
        flex-grow: 1;
        input {
          margin-left: 16/@rem;
          flex-grow: 1;
        }
        textarea {
          .dpr-font(14px);
          line-height: 36/@rem;
          flex-grow: 1;
          resize: none;
          margin-left: 16/@rem;
          color: #666666;
        }
      }
      img {
        display: inline-block;
        position: absolute;
        bottom: 0/@rem;
        left: 0;
        height: 4/@rem;
        width: 100%;
      }
    }
    .order-list {
      background: @white;
      margin-top: 20/@rem;
      .order-list-item {
        display: flex;
        padding: 20/@rem 30/@rem;
        img {
          width: 180/@rem;
          height: 180/@rem;
          margin-right: 20/@rem;
        }
        .order-list-item-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          .order-list-item-info-title {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            span:first-child {
              .dpr-font(14px);
              line-height: 38/@rem;
              color: #333333;
            }
            span:nth-child(2) {
              .dpr-font(12px);
              color: #999999;
            }
          }
          .order-list-item-info-price {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            span:first-child {
              .dpr-font(15px);
              color: @red;
            }
            span:nth-child(2) {
              .dpr-font(14px);
              color: #333333;
            }
          }
        }
      }
      .remark {
        height: 100/@rem;
        display: flex;
        align-items: center;
        padding: 0 30/@rem;
        span {
          .dpr-font(14px);
          color: #333333;
        }
        input {
          flex-grow: 1;
          margin-left: 30/@rem;
          .dpr-font(14px);
          color: #333333;
        }
        input::placeholder {
          color: #cccccc;
        }
      }
    }
    .order-discounts-wrapper {
      margin-top: 20/@rem;
      .order-discounts {
        display: flex;
        align-items: center;
        height: 100/@rem;
        padding: 0 30/@rem;
        background: @white;
        span:nth-child(2) {
          .dpr-font(14px);
          color: #333333;
          margin-left: 30/@rem;
        }
        span:nth-child(3) {
          .dpr-font(12px);
          color: #666666;
          margin-left: 26/@rem;
        }
      }
    }
    .order-price-list {
      margin-top: 20/@rem;
      padding: 0 30/@rem;
      background: @white;
      .order-price-detail {
        height: 100/@rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .dpr-font(14px);
        color: #333333;
      }
      .order-price-other {
        div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 30/@rem;
          .dpr-font(12px);
          color: #999999;
        }
        div:last-child {
          padding-bottom: 30/@rem;
        }
      }
      .order-price-total {
        display: flex;
        height: 100/@rem;
        align-items: center;
        justify-content: space-between;
        .dpr-font(14px);
        color: #333333;
        span:nth-child(2) {
          color: @red;
        }
      }
    }
  }
</style>
