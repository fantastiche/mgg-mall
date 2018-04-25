<template>
  <div class="order">
    <div class="order-top-wrapper">
      <div class="order-header">
        <span class="icon-search"></span>
        <input type="text" placeholder="请输入商品名/姓名/电话/订单号">
        <span class="icon-clean"></span>
      </div>
      <div class="order-tab">
        <div ref="shortTab" @click="tab(0)" :class="{'active':active===0}"><span>全部</span></div>
        <div ref="longTab" @click="tab(1)" :class="{'active':active===1}"><span>待付款</span></div>
        <div @click="tab(2)" :class="{'active':active===2}"><span>待发货</span></div>
        <div @click="tab(3)" :class="{'active':active===3}"><span>待收货</span></div>
        <div @click="tab(4)" :class="{'active':active===4}"><span>待评价</span></div>
        <span class="line" ref="line"></span>
      </div>
    </div>
    <scroll class="scroll-content" ref="wrapper">
      <div class="order-list">
        <div class="order-none" v-if="list.length===0">
          <img src="./image3@2x.png" alt="">
          <div class="order-none-title">很遗憾～您还没有相关订单</div>
        </div>
        <div class="order-item" @click="goDetail(item)" v-if="!(list.length===0)" v-for="(item, index) in list">
          <div class="order-item-title border-1px-e8">
            <span>{{item.addtime}}</span>
            <span>{{getState(item.status)}}</span>
          </div>
          <div class="order-item-goods border-1px-e8">
            <div class="order-item-goods-item" :class="{'border-1px-e8':!(goodsIndex===item.orderDetail.length-1)}"
                 v-for="(goods, goodsIndex) in item.orderDetail">
              <img :src="goods.goods_pic + '?x-oss-process=image/resize,m_lfit,h_200,w_200'" alt="">
              <div class="order-item-goods-item-wrapper">
                <div class="order-item-goods-item-info">
                  <span>{{goods.goods_name}}</span>
                  <span>规格:{{goods.spec_name}}</span>
                </div>
                <div class="order-item-goods-item-price">
                  <span>￥{{goods.goods_price.toFixed(2)}}</span>
                  <span>×{{goods.goods_count}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="order-item-bottom">
            <div class="order-item-bottom-info">
              <span>共{{item.goodsTotal}}件商品</span>
              <span>实付款:<span class="total-price">￥{{item.totalPrice.toFixed(2)}}</span></span>
              <span class="send-price">(含运费￥{{item.freightPrice.toFixed(2)}})</span>
            </div>
            <div class="order-item-bottom-ctrl">
              <!--<div class="btn-white" v-if="item.status===0">取消订单</div>-->
              <div class="btn-white" v-if="!(item.status===0)">查看物流</div>
              <!--<div class="btn-white" v-if="item.status===5">评价</div>-->
              <!--<div class="btn-white" v-if="item.status===5">删除</div>-->
              <div class="btn-red" v-if="item.status===0" @click="goPay(item)">去支付</div>
            </div>
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
        active: 0,
        list: []
      }
    },
    methods: {
      init: function (status) {
        let params = {
          status: status,
          page: 1
        }
        GoodsModel.orderList(params, (res) => {
          this.list = res.data.list
        }, () => {
        }, sessionStorage.getItem('token'))
      },
      goDetail: function (item) {
        this.$router.push({
          path: '/orderDetail',
          query: {
            orderId: item.orderId
          }
        })
      },
      tab: function (index) {
        this.active = index
        this.$nextTick(() => {
          if (index === 0) {
            this.$refs.line.style.left = (this.$refs.shortTab.offsetWidth - this.$refs.line.offsetWidth) / 2 + 'px'
          } else {
            this.$refs.line.style.left = this.$refs.shortTab.offsetWidth + this.$refs.longTab.offsetWidth * (index - 1) + (this.$refs.longTab.offsetWidth - this.$refs.line.offsetWidth) / 2 + 'px'
          }
        })
        if (index === 0) {
          this.init(index)
        } else if (index > 0 && index < 3) {
          this.init(index - 1)
        } else if (index === 4) {
          this.init(5)
        }
        this.$nextTick(() => {
          this.$refs.wrapper.scrollTo(0, 0)
        })
      },
      getState: function (status) {
        switch (status) {
          case 0 : {
            return '未支付'
          }
          case 1 : {
            return '待发货'
          }
          case 2 : {
            return '待收货'
          }
          case 3 : {
            return '待退款'
          }
          case 4 : {
            return '退款成功'
          }
          case 5 : {
            return '待评价'
          }
          case 6 : {
            return '已完成'
          }
          case 99 : {
            return '已取消'
          }
        }
      },
      goPay: function (item) {
        this.$router.push({
          path: '/orderPay',
          query: {
            id: item.orderId,
            total: item.totalPrice
          }
        })
      }
    },
    created: function () {
      this.$nextTick(() => {
        this.$refs.line.style.left = (this.$refs.shortTab.offsetWidth - this.$refs.line.offsetWidth) / 2 + 'px'
      })
      if (this.$route.query.indexTo) {
        this.tab(this.$route.query.indexTo)
      } else {
        this.init('')
      }
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

  .active {
    color: @red !important;
  }

  .order-none {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      margin-top: 268/@rem;
      width: 288/@rem;
      height: 288/@rem;
    }
    .order-none-title {
      .dpr-font(15px);
      color: #333333;
      margin-top: 52/@rem;
    }
  }

  .order-item-goods-item-wrapper {
    flex-grow: 1;
    margin-left: 20/@rem;
    display: flex;
    justify-content: space-between;
  }

  .line {
    position: absolute;
    bottom: 0;
    display: inline-block;
    height: 6/@rem;
    width: 100/@rem;
    background: @red;
    transition: left .5s;
    border-radius: 3/@rem;
  }

  .order {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .order-top-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 999;
      .order-header {
        display: flex;
        position: relative;
        align-items: center;
        padding: 0 30/@rem;
        height: 84/@rem;
        background: @white;
        input {
          flex-grow: 1;
          height: 46/@rem;
          padding-left: 78/@rem;
          border-radius: 28/@rem;
          padding-right: 78/@rem;
          color: #333333;
          background: #f7f7f7;
        }
        input::placeholder {
          color: #a1a1a1;
          .dpr-font(13px);
        }
        .icon-search {
          position: absolute;
          left: 50/@rem;
        }
        .icon-clean {
          position: absolute;
          right: 40/@rem;
        }
      }
      .order-tab {
        display: flex;
        position: relative;
        align-items: center;
        height: 70/@rem;
        background: @white;
        div {
          flex-grow: 1;
          .dpr-font(14px);
          color: #535353;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  .total-price {
    .dpr-font(15px) !important;
    color: @red !important;
  }

  .btn-white {
    background: @white;
    color: #333333;
    .dpr-font(14px);
    border: 2/@rem solid #999999;
    border-radius: 28/@rem;
    width: 156/@rem;
    height: 56/@rem;
    line-height: 56/@rem;
    text-align: center;
  }

  .btn-red {
    background: @red;
    color: #ffffff;
    .dpr-font(14px);
    border: 2/@rem solid @red;
    border-radius: 28/@rem;
    width: 156/@rem;
    height: 56/@rem;
    line-height: 56/@rem;
    text-align: center;
  }

  .order-list {
    padding-top: 154/@rem;
    .order-item {
      background: @white;
      margin-top: 20/@rem;
      .order-item-title {
        height: 70/@rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30/@rem;
        span:first-child {
          .dpr-font(14px);
          color: #333333;
        }
        span:nth-child(2) {
          .dpr-font(14px);
          color: @red;
        }
      }
      .order-item-goods {
        padding: 0 30/@rem;
        .order-item-goods-item {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 20/@rem 0;
          img {
            width: 140/@rem;
            height: 140/@rem;
          }
          .order-item-goods-item-info {
            margin-left: 20/@rem;
            margin-right: 20/@rem;
            display: flex;
            flex-direction: column;
            span:first-child {
              .dpr-font(14px);
              color: #333333;
            }
            span:nth-child(2) {
              .dpr-font(12px);
              color: #999999;
              margin-top: 0/@rem;
            }
          }
          .order-item-goods-item-price {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            span:first-child {
              .dpr-font(15px);
              color: #333333;
            }
            span:nth-child(2) {
              .dpr-font(12px);
              color: #999999;
            }
          }
        }
      }
      .order-item-bottom {
        padding: 30/@rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .order-item-bottom-info {
          span {
            .dpr-font(14px);
            color: #333333;
          }
          span:nth-child(2) {
            margin-left: 30/@rem;
          }
          .send-price {
            .dpr-font(12px);
            color: #999999;
            margin-left: 12/@rem;
          }
        }
        .order-item-bottom-ctrl {
          display: flex;
          margin-top: 30/@rem;
          div {
            margin-left: 20/@rem;
          }
        }
      }
    }
  }
</style>
