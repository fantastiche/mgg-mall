<template>
  <div class="content">
    <scroll class="srcoll-content">
      <div class="order">
        <div class="order-title">
          <div>待付款</div>
          <span class="icon-to-pay"></span>
        </div>
        <div class="order-address">
          <div class="order-address-info">
            <span>{{order.order.addr_realname}}</span>
            <span>{{order.order.addr_phone}}</span>
          </div>
          <div class="order-address-detail">
            <span class="icon-address"></span>
            <span>{{order.order.addr_city + order.order.address}}</span>
          </div>
        </div>
        <div class="order-list">
          <div class="order-item" v-for="(item,index) in order.orderdetail">
            <div class="order-item-wrapper">
              <img :src="item.goods_pic+'?x-oss-process=image/resize,m_lfit,h_200,w_200'" alt="">
              <div class="order-item-info">
                <span>{{item.goods_name}}</span>
                <span>规格:{{item.spec_name}}</span>
              </div>
            </div>
            <div class="order-item-price">
              <span>¥{{item.goods_price.toFixed(2)}}</span>
              <span>×{{item.goods_count}}</span>
            </div>
          </div>
        </div>
        <div class="order-price">
          <div class="order-price-item">
            <span>订单金额</span>
            <span>¥{{order.order.total_price.toFixed(2)}}</span>
          </div>
          <div class="order-price-item border-1px-e8">
            <span>运费</span>
            <span>¥{{order.order.freight_price.toFixed(2)}}</span>
          </div>
          <div class="order-price-total">
            <span>应付款(含运费):</span>
            <span>¥{{order.order.order_total.toFixed(2)}}</span>
          </div>
        </div>
        <div class="order-info">
          <div class="order-info-item">订单编号：{{order.order.order_id}}</div>
          <div class="order-info-item">下单时间：{{order.order.addtime}}</div>
          <div class="order-info-item">订单来源：美乖乖VIP</div>
        </div>
      </div>
    </scroll>
    <div class="order-bottom">
      <!--<span>取消订单</span>-->
      <span class="btn-red" v-if="order.order.status===0" @click="toPay(order.order)">去支付</span>
      <span class="btn-white" v-if="order.order.status>0" @click="toDetail">查看物流</span>
    </div>
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
        order: {}
      }
    },
    methods: {
      init: function () {
        let params = {
          order_id: this.$route.query.orderId
        }
        GoodsModel.orderDetail(params, (res) => {
          this.order = res.data
        }, () => {
        }, sessionStorage.getItem('token'))
      },
      toPay: function (item) {
        this.$router.push({
          path: '/orderPay',
          query: {
            id: item.order_id,
            total: item.order_total
          }
        })
      },
      toDetail: function () {
        this.$vux.confirm.show({
          title: '提示',
          content: '暂无物流信息',
          onCancel: function () {
          },
          onConfirm: function () {
            location.href = 'https://www.pgyer.com/Vg7U'
          }
        })
      }
    },
    created: function () {
      this.init()
    }
  }
</script>

<style lang="less" scoped>
  //noinspection CssUnknownTarget
  @import '~common/less/mixin.less';

  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .order-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: white;
    .dpr-font(14px);
    height: 100/@rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    span {
      width: 160/@rem;
      height: 60/@rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 30/@rem;
      margin-right: 30/@rem;
    }
  }

  .btn-red {
    background: @red;
    color: white;
  }

  .btn-white {
    border: 1px solid #999999;
    background: white;
    color: #333333;
  }

  .srcoll-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .order {
    .order-title {
      background: linear-gradient(to right, #ff3963, @red);
      color: white;
      .dpr-font(16px);
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        margin-left: 82/@rem;
      }
    }
    .order-address {
      background: white;
      padding: 30/@rem;
      .order-address-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #333333;
        .dpr-font(15px);
        span:first-child {
          margin-left: 56/@rem;
        }
      }
      .order-address-detail {
        display: flex;
        align-items: center;
        .dpr-font(14px);
        margin-top: 25/@rem;
        color: #666666;
        span:nth-child(2) {
          margin-left: 16/@rem;
          line-height: 40/@rem;
          word-wrap: break-word;
          width: 650/@rem;
        }
      }
    }
    .order-list {
      margin-top: 20/@rem;
      background: white;
      padding: 0 30/@rem;
      .order-item {
        padding: 20/@rem 0;
        display: flex;
        justify-content: space-between;
        .order-item-wrapper {
          display: flex;
          img {
            width: 180/@rem;
            height: 180/@rem;
            border-radius: 8/@rem;
          }
          .order-item-info {
            display: flex;
            flex-direction: column;
            margin-left: 20/@rem;
            span:first-child {
              .dpr-font(14px);
              color: #333333;
            }
            span:nth-child(2) {
              .dpr-font(12px);
              color: #999999;
              margin-top: 15/@rem;
            }
          }
        }
        .order-item-price {
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
            margin-top: 15/@rem;
          }
        }
      }
    }
    .order-price {
      margin-top: 20/@rem;
      background: #ffffff;
      padding: 0 30/@rem;
      line-height: 24/@rem;
      .order-price-item {
        padding: 30/@rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span:first-child {
          .dpr-font(12px);
          color: #888888;
        }
        span:nth-child(2) {
          .dpr-font(14px);
          color: #333333;
        }
        &:first-child {
          padding-bottom: 0;
        }
      }
      .order-price-total {
        padding: 30/@rem 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span:first-child {
          .dpr-font(12px);
          color: #333333;
        }
        span:nth-child(2) {
          color: @red;
          .dpr-font(15px);
          margin-left: 20/@rem;
        }
      }
    }
    .order-info {
      margin-top: 20/@rem;
      margin-bottom: 20/@rem;
      background: white;
      padding: 30/@rem;
      .order-info-item {
        .dpr-font(12px);
        color: #999999;
        line-height: 40/@rem;
      }
    }
  }

</style>
