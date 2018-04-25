<template>
  <scroll class="wrapper">
    <div class="content">
      <div class="item-wrapper">
        <div class="item">
          <img src="./faan.png" alt="">
          <div class="item-info">
            <span class="item-info-title">彻夜急救导水修复面膜</span>
            <span class="item-info-intro">FIRST AID ALL NIGHT</span>
            <div class="item-info-price">
              <span class="price"><span>¥ </span>179</span>
              <span class="btn" @click="goApp('d965f176dd5343069ad4a6ee108992ed')">立即查看</span>
            </div>
          </div>
        </div>
        <div class="item">
          <img src="./sw.png" alt="">
          <div class="item-info">
            <span class="item-info-title">蕊珂白雪公主面膜</span>
            <span class="item-info-intro">SNOW WHITE</span>
            <div class="item-info-price">
              <span class="price"><span>¥ </span>179</span>
              <span class="btn" @click="goApp('b2524590d01f4fc5b8ec6b9bbb305ced')">立即查看</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'components/Scroll/Scroll'
  import {querystring} from 'vux'

  export default {
    components: {
      Scroll
    },
    data: function () {
      return {
        device: ''
      }
    },
    methods: {
      goApp: function (goodsId) {
        if (this.device === 'ios') {
          window.webkit.messageHandlers.callFunction.postMessage(goodsId)
        } else if (this.device === 'android') {
          window.android.goToGood(goodsId)
        } else if (this.device === 'web') {
          this.$router.push({
            path: '/goodsIndex/goodsDetail',
            query: {
              goodsId: goodsId
            }
          })
        }
      }
    },
    created: function () {
      let info = querystring.parse(location.href.split('?')[location.href.split('?').length - 1])
      if (info.device) {
        this.device = info.device
      }
    }
  }
</script>

<style lang="less" scoped>
  //noinspection CssUnknownTarget
  @import '~common/less/mixin.less';

  .wrapper {
    height: 100%;
    overflow: hidden;
    .content {
      background: url("./bg.png") no-repeat center;
      background-size: 100%;
      width: 100%;
      height: 1412/@rem;
      .item-wrapper {
        padding-top: 642/@rem;
        flex-direction: column;
        display: flex;
        align-items: center;
        .item {
          width: 670/@rem;
          padding: 27/@rem 0;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 8/@rem;
          img {
            width: 194/@rem;
            height: 246/@rem;
            margin-left: 52/@rem;
          }
          .item-info {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            .item-info-title {
              .dpr-font(16px);
              color: #333333;
            }
            .item-info-intro {
              .dpr-font(8px);
              letter-spacing: 6/@rem;
              margin-top: 9/@rem;
            }
            .item-info-price {
              display: flex;
              align-items: center;
              margin-top: 30/@rem;
              .price {
                span:first-child {
                  .dpr-font(16px);
                }
                .dpr-font(18px);
              }
              .btn {
                margin-left: 26/@rem;
                width: 170/@rem;
                height: 58/@rem;
                background: #000000;
                color: #ffffff;
                .dpr-font(14px);
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
          }
        }
        .item:nth-child(2) {
          margin-top: 60/@rem;
        }
      }
    }
  }

</style>
