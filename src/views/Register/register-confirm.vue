<template>
  <div class="content">
    <div class="content-body">
      <div class="title">关联的店主信息</div>
      <div class="invite-code">您输入的邀请码：{{store.shop.shopCode}}</div>
      <div class="store">
        <div class="store-img vux-1px-r">
          <img :src="store.headImg" alt="">
        </div>
        <div class="store-info">
          <span>昵称：{{store.username}}</span>
          <span>真实姓名：{{store.realName}}</span>
          <span>联系方式：{{store.phone.replace(/^(\d{3})\d{4}(\d+)/,'$1****$2')}}</span>
        </div>
      </div>
      <div class="warning">
        <span class="icon-warning-red"></span>
        <span>请确认当前店主是否为您的邀请人，您的订单将与他关联</span>
      </div>
      <div class="sub">
        <div @click="sub">确认并提交</div>
      </div>
    </div>
  </div>
</template>

<script>
  import GoodsModel from '../../models/goods-model'

  export default {
    data: function () {
      return {
        store: {}
      }
    },
    methods: {
      sub: function () {
        let params = {
          mobile: this.$route.query.phone,
          smsCode: this.$route.query.code,
          inviteCode: this.$route.query.shopCode
        }
        GoodsModel.storeRegister(params, (res) => {
          if (res.code === '100') {
            this.$vux.toast.show({
              text: '注册成功！',
              time: 3000,
              type: 'cancel'
            })
            this.$router.push({
              path: '/index'
            })
          } else {
            this.$vux.toast.show({
              text: res.message,
              time: 3000,
              type: 'cancel'
            })
          }
        })
      }
    },
    created: function () {
      let params = {
        id: this.$route.query.shopCode
      }
      GoodsModel.shopInfo(params, (res) => {
        this.store = res.data
      })
    }
  }
</script>

<style lang="less" scoped>
  //noinspection CssUnknownTarget
  @import '~common/less/mixin.less';

  .content {
    min-height: 100%;
    background: #ffffff;
    .content-body {
      min-height: 100%;
      background: url("./bg2.png") no-repeat bottom left;
      background-size: 508/@rem 500/@rem;
      .title {
        .dpr-font(16px);
        color: #333333;
        margin-top: 50/@rem;
        padding: 0 30/@rem;
      }
      .invite-code {
        padding: 0 30/@rem;
        .dpr-font(12px);
        color: #333333;
        margin-top: 10/@rem;
      }
      .store {
        margin: 60/@rem 30/@rem 26/@rem 30/@rem;
        border: 1px solid #e5e5e5;
        border-radius: 12/@rem;
        box-shadow: 0 4/@rem 4/@rem 0 rgba(0, 0, 0, 0.1);
        display: flex;
        .store-img {
          padding: 0 52/@rem;
          margin: 24/@rem 0;
          img {
            width: 192/@rem;
            height: 192/@rem;
            border-radius: 50%;
          }
        }
        .store-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 50/@rem;
          span {
            .dpr-font(12px);
            color: #333333;
            line-height: 40/@rem;
          }
        }
      }
      .warning {
        margin-left: 30/@rem;
        display: flex;
        align-items: center;
        span {
          .dpr-font(10px);
          color: #666666;
          margin-left: 8/@rem;
        }
      }
      .sub {
        margin-top: 60/@rem;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          background-image: linear-gradient(-180deg, #FF3963 0%, #E60012 100%);
          box-shadow: 0 2px 2px 0 rgba(230, 0, 18, 0.40);
          border-radius: 100px;
          width: 420/@rem;
          height: 90/@rem;
          color: #ffffff;
          .dpr-font(17px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

</style>
