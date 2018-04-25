<template>

</template>

<script>
  import GoodsModel from '../models/goods-model'
  import {querystring} from 'vux'

  export default {
    methods: {
      uuid: function () {
        let s = []
        let hexDigits = '0123456789abcdef'
        for (let i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
        }
        s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = '-'

        let uuid = s.join('')
        return uuid
      }
    },
    created: function () {
      let that = this
      let info = querystring.parse(location.href.split('?')[location.href.split('?').length - 1])
      if (info.shopCode) {
        sessionStorage.setItem('shopCode', info.shopCode)
        sessionStorage.setItem('goodsId', info.goodsId)
        // that.$router.push({
        //   path: 'goodsIndex/goodsDetail'
        // })
        location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?client_id=wx5309f7dc7a6ff2d5&response_type=code&redirect_uri=https%3a%2f%2fmgg.gzqqs.com%2fweb%2fmgg-web%2f%23%2fenter&state=' + this.uuid() + '&appid=wx5309f7dc7a6ff2d5&scope=snsapi_userinfo&connect_redirect=1#wechat_redirect'
      } else {
        let code,
          state
        if (location.href.split('?')) {
          code = location.href.split('?')[1].split('#')[0].split('&')[0].split('=')[1]
          state = location.href.split('?')[1].split('#')[0].split('&')[1].split('=')[1]
        }
        let params = {
          code: code,
          state: state
        }
        GoodsModel.getToken(params, (res) => {
          if (res.code === '100') {
            let params = {
              id: sessionStorage.getItem('shopCode')
            }
            GoodsModel.visit(params, (res) => {
            }, () => {
            }, res.data.token.access_token)
            sessionStorage.setItem('token', res.data.token.access_token)
            sessionStorage.setItem('username', res.data.user.username)
            sessionStorage.setItem('headImg', res.data.user.headImg)
            sessionStorage.setItem('roleCode', res.data.user.roleCode)
            sessionStorage.setItem('openId', res.data.user.providerUser.openid)
            that.$router.push({
              path: 'goodsIndex/goodsDetail'
            })
          } else {
            that.$vux.alert.show({
              title: '提示',
              content: res.message
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
