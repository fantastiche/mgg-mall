<template>
  <scroll ref="wrapper" class="scroll-wrapper">
    <div class="content">
      <div class="register">
        <img src="./btn_logo@2x.png" alt="">
        <div class="register-item">
          <span class="icon-person"></span>
          <input type="text" placeholder="请输入手机号" v-on:focus="turnTo" v-model="phone">
          <span class="icon-clean"></span>
        </div>
        <div class="register-item">
          <span class="icon-code"></span>
          <input type="text" placeholder="请输入验证码" v-on:focus="turnTo" v-model="code">
          <span class="btn" @click="getSms" :class="{'red':status}">{{msg}}</span>
        </div>
        <div class="sub-wrapper">
          <div class="sub" @click="sub" :class="{'active':phone&&code}">注册</div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
  import GoodsModel from '../../models/goods-model'
  import {querystring} from 'vux'
  import Scroll from 'components/Scroll/Scroll'

  export default {
    components: {
      Scroll
    },
    data: function () {
      return {
        code: '',
        city: [],
        msg: '获取验证码',
        phone: '',
        shopCode: ''
      }
    },
    methods: {
      turnTo: function (el) {
        setTimeout(() => {
          this.$refs.wrapper.scrollToElement(el.target)
        }, 500)
      },
      sub: function () {
        if (this.phone && this.code) {
          if (!(/^1[0-9][0-9]\d{4,8}$/.test(this.phone))) {
            this.$vux.toast.show({
              text: '请输入正确的手机号',
              type: 'cancel',
              width: '4rem'
            })
            return
          }
          let that = this
          let params = {
            mobile: that.phone,
            smsCode: that.code
          }
          GoodsModel.login(params, (res) => {
            if (res.code === '301') {
              that.$router.push({
                path: '/registerConfirm',
                query: {
                  shopCode: this.shopCode,
                  phone: this.phone,
                  code: this.code
                }
              })
            } else {
              that.$vux.alert.show({
                title: '提示',
                content: '您已经是会员了！'
              })
            }
          })
        }
      },
      checkSms: function () {
        let time = (localStorage.getItem('currentTime') - parseInt(Date.parse(new Date()))) / 1000
        if (time > 0) {
          this.status = true
          localStorage.setItem('status', this.status)
          this.msg = time + '秒'
          setInterval(() => {
            time = (localStorage.getItem('currentTime') - parseInt(Date.parse(new Date()))) / 1000
            this.msg = time + '秒'
            if (time < 0 || time === 0) {
              localStorage.removeItem('status')
              this.status = false
              this.msg = '获取验证码'
            }
          }, 1000)
        }
      },
      getSms: function () {
        if (!this.status) {
          if (!this.phone) {
            this.$vux.toast.show({
              text: '请输入您的手机号',
              type: 'cancel'
            })
            return
          }
          if (!(/^1[0-9][0-9]\d{4,8}$/.test(this.phone))) {
            this.$vux.toast.show({
              text: '请输入正确的手机号',
              type: 'cancel',
              width: '4rem'
            })
            return
          }
          let params = {
            mobile: this.phone
          }
          let timestamp = parseInt(Date.parse(new Date()))
          let current = timestamp + 60000
          localStorage.setItem('currentTime', current)
          GoodsModel.sms(params, (res) => {
            this.status = true
            let time = (localStorage.getItem('currentTime') - parseInt(Date.parse(new Date()))) / 1000
            sessionStorage.setItem('status', this.status)
            this.msg = time + '秒'
            setInterval(() => {
              time = (localStorage.getItem('currentTime') - parseInt(Date.parse(new Date()))) / 1000
              this.msg = time + '秒'
              if (time < 0 || time === 0) {
                sessionStorage.removeItem('status')
                this.status = false
                this.msg = '获取验证码'
              }
            }, 1000)
          })
        }
      }
    },
    created: function () {
      this.checkSms()
      let info = querystring.parse(location.href.split('?')[location.href.split('?').length - 1])
      if (info.shopCode) {
        this.shopCode = info.shopCode
      } else {
        alert('绑定店主失败，请重新操作！')
      }
    }
  }
</script>

<style lang="less" scoped>
  //noinspection CssUnknownTarget
  @import '~common/less/mixin.less';

  .scroll-wrapper {
    width: 100%;
    height: 100%;
    background: #ffffff;
  }

  .content {
    background: #ffffff;
    width: 100%;
    .register {
      height: 100%;
      width: 100%;
      background: url("./bg1.png") no-repeat top right;
      background-size: 480/@rem 408/@rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        margin-top: 200/@rem;
        width: 240/@rem;
        height: 128/@rem;
        margin-bottom: 224/@rem;
      }
      .register-item {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 40/@rem;
        input {
          flex-grow: 1;
          margin: 0 40/@rem;
          height: 86/@rem;
          border: 1px solid #cccccc;
          border-radius: 100/@rem;
          padding: 0 92/@rem;
          .dpr-font(15px);
          color: #333333;
        }
        input::placeholder {
          color: #cccccc;
        }
        span {
          position: absolute;
        }
        .icon-person {
          top: 21/@rem;
        }
        .icon-clean {
          top: 27/@rem;
        }
        .icon-code {
          top: 21/@rem;
        }
        span:first-child {
          left: 70/@rem;
        }
        .icon-clean {
          right: 70/@rem;
        }
        .btn {
          right: 40/@rem;
          width: 232/@rem;
          height: 86/@rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid @red;
          border-radius: 100/@rem;
          color: @red;
          font-size: 30/@rem;
        }
      }
      .sub-wrapper {
        width: 100%;
        margin-top: 88/@rem;
        .sub {
          margin: 0 40/@rem;
          height: 90/@rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #cccccc;
          border-radius: 50/@rem;
          .dpr-font(17px);
          color: #ffffff;
        }
      }
    }
  }

  .active {
    background: linear-gradient(to right, #ff3963, @red) !important;
  }

</style>
