<template>
  <scroll class="scroll-body">
    <div class="content">
      <div class="warning">
        <span class="icon-warning"></span>
        <span>请填写真实姓名与登入手机号，否则将影响您的提现</span>
      </div>
      <div class="info-main">
        <div class="info-item border-1px-e8">
          <span><span class="red">*</span>真实姓名</span>
          <input type="text" v-model="name" placeholder="请输入真实姓名">
        </div>
        <div class="info-item border-1px-e8">
          <span><span class="red">*</span>手机号码</span>
          <input type="text" v-model="phone" placeholder="请输入手机号码">
        </div>
        <div class="info-item-code border-1px-e8">
          <input type="text" placeholder="请输入验证码" v-model="code">
          <span @click="getSms" :class="{'red':status}">{{msg}}</span>
        </div>
      </div>
      <div class="warning">
        <span class="icon-warning"></span>
        <span>请填写您的收货地址，确保您能及时收到商品</span>
      </div>
      <div class="info-address">
        <div class="address-item border-1px-e8">
          <span>收件人</span>
          <input type="text" class="receive" placeholder="收件人姓名" v-model="revName">
        </div>
        <div class="address-item border-1px-e8">
          <span>手机号码</span>
          <input type="text" placeholder="收件人号码" v-model="revPhone">
        </div>
        <div class="address-item border-1px-e8">
          <span>所在地区</span>
          <input type="text" placeholder="所在地区" readonly v-model="area" @click="show">
          <span class="icon-next"></span>
        </div>
        <group>
          <x-address style="display:none;" :popup-title="'请选择地址'" :title="'title'" v-model="value"
                     :list="addressData" placeholder="请选择地址" :show.sync="showAddress" :show-name="true"
                     @on-hide="onHide"></x-address>
        </group>
        <div class="address-item-detail">
          <span>详细地址</span>
          <textarea placeholder="(街道、小区、门牌号等)" v-model="address"></textarea>
        </div>
      </div>
      <div class="warning">
        <span class="icon-warning"></span>
        <span>若您有参加美乖乖预约活动，请填写预约码（选填）</span>
      </div>
      <div class="info-main">
        <div class="info-item border-1px-e8">
          <span>手机号码</span>
          <input type="text" v-model="prePhone" placeholder="请输入预约时的手机号码">
        </div>
        <div class="info-item border-1px-e8">
          <span>预约号码</span>
          <input type="text" v-model="preCode" placeholder="请输入预约码">
        </div>
      </div>
      <div class="info-btn" :class="{'btn-active':name&&phone&&code&&revName&&revPhone&&area&&address}" @click="sub">
        提交
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'components/Scroll/Scroll'
  import {XAddress, Group, ChinaAddressV4Data} from 'vux'
  import GoodsModel from '../../models/goods-model'

  export default {
    components: {
      Scroll,
      XAddress,
      Group
    },
    data: function () {
      return {
        area: '',
        showAddress: false,
        value: [['1']],
        addressData: ChinaAddressV4Data,
        status: false,
        phone: '',
        name: '',
        revName: '',
        revPhone: '',
        address: '',
        code: '',
        city: [],
        msg: '获取验证码',
        preCode: '',
        prePhone: ''
      }
    },
    methods: {
      show: function () {
        this.showAddress = true
      },
      onHide: function (type) {
        if (type) {
          for (let i = 0; i < this.addressData.length; i++) {
            if (this.addressData[i].value === this.value[0]) {
              this.city[0] = (this.addressData[i].name)
            } else if (this.addressData[i].value === this.value[1]) {
              this.city[1] = (this.addressData[i].name)
            } else if (this.addressData[i].value === this.value[2]) {
              this.city[2] = (this.addressData[i].name)
            }
          }
          this.area = this.city.join('')
        }
      },
      sub: function () {
        if (this.name && this.phone && this.code && this.revName && this.revPhone && this.area && this.address) {
          this.$vux.loading.show({
            text: '提交中'
          })
          this.netWork()
        }
      },
      netWork: function () {
        if (!(/^1[0-9][0-9]\d{4,8}$/.test(this.revPhone))) {
          this.$vux.loading.hide()
          this.$vux.toast.show({
            text: '请输入正确的收货手机号',
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
            params = {
              mobile: that.phone,
              smsCode: that.code,
              inviteCode: sessionStorage.getItem('invCode')
            }
            GoodsModel.storeRegister(params, (res) => {
              if (res.code === '100') {
                this.$vux.loading.hide()
                that.netWork()
              } else {
                this.$vux.loading.hide()
                this.$vux.toast.show({
                  text: res.message,
                  type: 'cancel'
                })
              }
            })
          } else if (res.code === '100') {
            sessionStorage.setItem('token', res.data.token.access_token)
            if (res.data.user.roleCode === '0') {
              params = {
                'IS_DEFAULT': 0,
                'ADDR_REALNAME': that.revName,
                'ADDR_PHONE': that.revPhone,
                'ADDR_CITY': that.area,
                'ADDRESS': that.address,
                'PROVINCE': this.city[0],
                'CITY': this.city[1],
                'AREA': this.city[2]
              }
              GoodsModel.addressAdd(params, (res) => {
                let addressId = res.data.pd.address_id
                params = {
                  'goods_id': sessionStorage.getItem('goodsId'),
                  'goods_count': 1,
                  'spec_id': sessionStorage.getItem('specId'),
                  'invPhone': that.prePhone,
                  'invCode': that.preCode
                }
                GoodsModel.storeOrder(params, (res) => {
                  if (res.code === '100') {
                  }
                  let params = {
                    'spec_id': sessionStorage.getItem('specId'),
                    'goods_count': 1,
                    'goods_id': sessionStorage.getItem('goodsId'),
                    'address_id': addressId,
                    'usercoupon_id': '',
                    'usercoin_id': '',
                    'shopCode': sessionStorage.getItem('invCode'),
                    'payAmount': 0,
                    'invPhone': that.prePhone,
                    'invCode': that.preCode
                  }
                  GoodsModel.storeAddOrder(params, (res) => {
                    this.$vux.loading.hide()
                    if (res.data.result === 1) {
                      that.$router.push({
                        path: '/orderPay',
                        query: {
                          id: res.data.order_id,
                          total: res.data.order_total,
                          from: 1
                        }
                      })
                    } else {
                      this.$vux.loading.hide()
                      this.$vux.toast.show({
                        text: res.message,
                        type: 'cancel'
                      })
                    }
                  }, () => {
                  }, sessionStorage.getItem('token'))
                }, () => {
                }, sessionStorage.getItem('token'))
              }, () => {
              }, sessionStorage.getItem('token'))
            } else {
              this.$vux.loading.hide()
              that.$vux.toast.show({
                text: '您已经是店主了！',
                time: 4000,
                type: 'cancel'
              })
            }
          } else {
            this.$vux.loading.hide()
            that.$vux.toast.show({
              text: res.message,
              time: 4000,
              type: 'cancel'
            })
          }
        })
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
    }
  }
</script>

<style lang="less" scoped>
  //noinspection CssUnknownTarget
  @import '~common/less/mixin.less';

  .scroll-body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #f3f5f7;
  }

  .receive {
    margin-left: 58/@rem !important;
  }

  input, textarea {
    .dpr-font(14px);
    color: #333333 !important;
  }

  input::placeholder, textarea::placeholder {
    color: #cccccc !important;
  }

  .content {
    width: 100%;
    background: #f3f5f7;
    .warning {
      margin-top: 20/@rem;
      height: 40/@rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(230, 0, 18, 0.3);
      span {
        font-size: 24/@rem;
        color: #ffffff;
        margin-right: 10/@rem;
      }
    }
    .info-main {
      padding-left: 30/@rem;
      background: #ffffff;
      .info-item {
        display: flex;
        align-items: center;
        height: 92/@rem;
        .dpr-font(14px);
        color: #666666;
        input {
          flex-grow: 1;
          margin-left: 30/@rem;
        }
      }
      .info-item-code {
        padding-left: 160/@rem;
        height: 92/@rem;
        display: flex;
        align-items: center;
        position: relative;
        input {
          flex-grow: 1;
        }
        span {
          height: 68/@rem;
          width: 200/@rem;
          font-size: 28/@rem;
          margin-right: 30/@rem;
          border: 1px solid #333333;
          color: #333333;
          border-radius: 34/@rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .info-address {
      padding-left: 30/@rem;
      background: #ffffff;
      .address-item {
        display: flex;
        align-items: center;
        position: relative;
        height: 92/@rem;
        span:first-child {
          .dpr-font(14px);
          color: #666666;
        }
        input {
          margin-left: 30/@rem;
        }
        input, textarea {
          flex-grow: 1;
        }
        .icon-next {
          position: absolute;
          right: 20/@rem;
          top: 14/@rem;
        }
      }
      .address-item-detail {
        height: 124/@rem;
        display: flex;
        align-items: flex-start;
        textarea {
          flex-grow: 1;
          margin-left: 30/@rem;
        }
        span:first-child {
          .dpr-font(14px);
          color: #666666;
        }
      }
    }
    .info-btn {
      margin: 40/@rem;
      text-align: center;
      height: 90/@rem;
      .dpr-font(17px);
      color: #ffffff;
      background: #d8d8d8;
      border-radius: 45/@rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .btn-active {
    background: linear-gradient(to right, #ff3963, @red) !important;
  }

  .red {
    color: @red !important;
  }
</style>
