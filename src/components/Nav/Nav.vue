<template>
  <div class="nav">
    <div class="nav-wrapper">
      <div class="nav-home" @click="goHome">
        <span class="icon-home" :class="{'icon-home-active':position===0}"></span>
        <span :class="{'red':position===0}">首页</span>
      </div>
      <div class="nav-shopping-cart" @click="goCart">
        <span class="icon-shopping-cart" :class="{'icon-shopping-cart-active':position===1}"></span>
        <span :class="{'red':position===1}">购物车</span>
        <div class="cartNum" v-if="cartNum>0">
          <span>{{cartNum}}</span>
        </div>
      </div>
      <div class="nav-personal" @click="goMine">
        <span class="icon-personal" :class="{'icon-personal-active':position===2}"></span>
        <span :class="{'red':position===2}">我的</span>
      </div>
    </div>
  </div>
</template>

<script>
  import GoodsModel from '../../models/goods-model'

  export default {
    props: {
      position: {
        type: Number,
        default: 0
      }
    },
    data: function () {
      return {
        cartNum: 0
      }
    },
    methods: {
      goHome: function () {
        this.$router.push({
          path: '/index'
        })
      },
      goCart: function () {
        this.$router.push({
          path: '/shoppingCart'
        })
      },
      goMine: function () {
        this.$router.push({
          path: '/mine'
        })
      },
      init: function () {
        let params = {}
        GoodsModel.cartList(params, (res) => {
          this.cartNum = 0
          res.data.cartlist.forEach((item, index, array) => {
            this.cartNum += item.goods_count
          })
        }, () => {
        }, sessionStorage.getItem('token'))
      }
    },
    created: function () {
      this.init()
    }
  }
</script>

<style lang="less">
  //noinspection CssUnknownTarget
  @import '~common/less/mixin.less';

  .nav-shopping-cart {
    position: relative;
  }

  .cartNum {
    position: absolute;
    top: -10/@rem;
    left: 135/@rem;
    height: 44/@rem;
    padding: 0 8/@rem;
    min-width: 32/@rem;
    border-color: @red;
    border-radius: 44/@rem;
    background: @white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1003;
    border: 1px solid @red;
    transform: scale(0.6);
    padding-top: 0 !important;
    span {
      font-size: 20px !important;
      color: @red !important;
    }
  }

  .nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 97/@rem;
    z-index: 999;
    background: @white;
    box-shadow: 0 0 13/@rem rgba(0, 0, 0, 0.2);
    .nav-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      height: 97/@rem;
      position: relative;
      div {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding-top: 5/@rem;
        .dpr-font(10px);
        span {
          .dpr-font(10px);
          color: #999999;
        }
        span:nth-child(2) {
        }
      }
    }
  }

  .red {
    color: @red !important;
  }
</style>
