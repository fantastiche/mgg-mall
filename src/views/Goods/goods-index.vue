<template>
  <scroll ref="wrapper" class="scroll-content" @scroll="scroll" :probeType="3">
    <div class="content" ref="content">
      <div class="content-warpper" ref="contentWrapper">
        <div class="swiper-wrapper">
          <swiper ref="swiper" :list="picList" style="width:100%;margin:0 auto;" :aspect-ratio="750/750"
                  dots-position="center" :show-dots="false" @on-index-change="change"
                  :show-desc-mask="false" :auto="true" :loop="true" :interval="3000"></swiper>
          <div class="swiper-num">
            <span>{{current+1}}/{{picLegth}}</span>
          </div>
        </div>
        <div class="goods-title">
          <div class="goods-title-name">{{goods.goodsName}}</div>
          <div class="goods-title-intro">{{goods.goodsTitle}}</div>
          <div class="goods-title-price">
            <span>￥{{goods.salesPrice}}</span>
            <span>￥{{goods.goodsPrice}}</span>
          </div>
        </div>
        <div class="goods-spec" @click="buy">
          <span>规格选择</span>
          <span class="arrow-right"></span>
        </div>
      </div>
      <div class="goods-detail" ref="detail">
        <div class="goods-detail-title" ref="detailTitle">
          <span :class="{'detail-active':detailActive===0}" @click="goodsIntro">商品介绍</span>
          <span :class="{'detail-active':detailActive===1}" @click="goodsSize">规格参数</span>
          <span :class="{'detail-active':detailActive===2}" @click="goodsInfo">购买须知</span>
        </div>
        <router-view :goods="goods" :initScroll="initScroll"></router-view>
      </div>
    </div>
    <div class="content-header border-1px" ref="header">
      <span :class="{'active':active===0}" ref="titleGoods" @click="goGoods(true)">商品</span>
      <span :class="{'active':active===1}" @click="goDetail(true)">详情</span>
      <span class="active-line" ref="line"></span>
    </div>
    <div class="goods-detail-title goods-detail-active" v-if="detailShow">
      <span :class="{'detail-active':detailActive===0}" @click="goodsIntro">商品介绍</span>
      <span :class="{'detail-active':detailActive===1}" @click="goodsSize">规格参数</span>
      <span :class="{'detail-active':detailActive===2}" @click="goodsInfo">购买须知</span>
    </div>
    <div class="goods-ctrl">
      <div class="goods-ctrl-icon vux-1px-r" @click="shoppingCart">
        <span class="icon-shopping-cart"></span>
        <span>购物车</span>
        <div class="cartNum vux-1px" v-if="cartNum>0"><span>{{cartNum}}</span></div>
      </div>
      <div class="goods-ctrl-icon vux-1px-r" @click="goMine">
        <span class="icon-personal"></span>
        <span>我的</span>
      </div>
      <div class="goods-ctrl-add" @click="addCart" v-if="typeEnable===0">加入购物车</div>
      <div class="goods-ctrl-buy" @click="buy" v-if="typeEnable===0">立即购买</div>
      <div class="no-goods" v-if="typeEnable===1">抢光了~</div>
      <div class="no-goods" v-if="typeEnable===2">请在APP购买秒杀商品</div>
    </div>
    <spec-choose :goodsId="goodsId" @enable="enable" ref="spec" :goods="goods" :attrs="goods.attrs"
                 :specs="goods.specs" @cartCount="cartCount" @sub="sub"
                 @addIntoCart="addIntoCart"></spec-choose>
  </scroll>
</template>

<script>
  import {Swiper, querystring} from 'vux'
  import Scroll from 'components/Scroll/Scroll'
  import {mapGetters, mapActions} from 'vuex'
  import SpecChoose from 'components/SpecChoose/SpecChoose'
  import GoodsModel from '../../models/goods-model'

  // sessionStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoibWdnIiwiZXhwIjoxNTI0NzA3ODAzLCJhdXRob3JpdGllcyI6WyJhZG1pbiJdLCJqdGkiOiI0N2IwNzM1OC1iZTJlLTQ0ZTMtOTc2MS00NGRiYjgwNGRmZTQiLCJjbGllbnRfaWQiOiJtZ2ciLCJzY29wZSI6WyJhbGwiLCJyZWFkIiwid3JpdGUiXX0.V0CPmJhGd1UMKK0mggxtxvou847OSOOP4pfYFhSnJqk')
  // sessionStorage.setItem('goodsId', 'bbff3af2ff52426db749d536f9bba672')

  export default {
    name: 'index',
    components: {
      Scroll,
      Swiper,
      SpecChoose
    },
    data: function () {
      return {
        picList: [],
        picLegth: 0,
        current: 0,
        active: 0,
        detailActive: 0,
        detailShow: false,
        specShow: false,
        goods: {},
        goodsId: '',
        cartNum: 0,
        typeEnable: 0
      }
    },
    methods: {
      initScroll: function () {
        this.$refs.wrapper.scrollToElement(this.$refs.detail)
        setTimeout(() => {
          this.$refs.wrapper.refresh()
        }, 20)
      },
      init: function () {
        let that = this
        if (this.$route.query.goodsId) {
          this.goodsId = this.$route.query.goodsId
        } else if (location.href.indexOf('goodsId') >= 0) {
          let info = querystring.parse(location.href.split('?')[1])
          this.goodsId = info.goodsId
        } else {
          this.goodsId = sessionStorage.getItem('goodsId')
        }
        let params = {
          'id': this.goodsId
        }
        GoodsModel.goods(params, (res) => {
          this.goods = res.data
          if (this.goods.goodsType === '2') {
            this.typeEnable = 2
          } else if (this.goods.invQty === 0) {
            this.typeEnable = 1
          }
          this.picLegth = this.goods.goodsPic.length
          for (let i = 0; i < this.goods.goodsPic.length; i++) {
            this.picList.push({
              url: 'javascript:',
              img: this.goods.goodsPic[i] + '?x-oss-process=image/resize,m_lfit,h_750,w_750'
            })
          }
          let params = {
            openId: sessionStorage.getItem('openId'),
            url: location.href.split('#')[0]
          }
          // 分享接口
          GoodsModel.share(params, (res) => {
            that.$wechat.config({
              debug: false,
              appId: res.pd.appId,
              timestamp: res.pd.timeStamp,
              nonceStr: res.pd.nonceStr,
              signature: res.pd.signature,
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
            })
            that.$wechat.ready(function () {
              that.$wechat.onMenuShareTimeline({
                title: that.goods.goodsName,
                link: 'https://mgg.gzqqs.com/web/mgg-web/#/enter?shopCode=' + sessionStorage.getItem('shopCode') + '&goodsId=' + sessionStorage.getItem('goodsId'),
                imgUrl: that.goods.goodsPic[0] + '?x-oss-process=image/resize,m_lfit,h_200,w_200',
                success: function () {
                  that.$vux.toast.show({
                    text: '分享成功!',
                    type: 'success'
                  })
                }
              })
              that.$wechat.onMenuShareAppMessage({
                title: that.goods.goodsName,
                desc: that.goods.goodsTitle,
                link: 'https://mgg.gzqqs.com/web/mgg-web/#/enter?shopCode=' + sessionStorage.getItem('shopCode') + '&goodsId=' + sessionStorage.getItem('goodsId'),
                imgUrl: that.goods.goodsPic[0] + '?x-oss-process=image/resize,m_lfit,h_200,w_200',
                success: function () {
                  that.$vux.toast.show({
                    text: '分享成功!',
                    type: 'success'
                  })
                }
              })
            })
          }, () => {
          })
          // 购物车
          GoodsModel.cartList({}, (res) => {
            this.cartNum = 0
            res.data.cartlist.forEach((item, index, array) => {
              this.cartNum += item.goods_count
            })
          }, () => {
          }, sessionStorage.getItem('token'))
          this.goods.goodsPrice = this.goods.goodsPrice.toFixed(2)
          this.goods.salesPrice = this.goods.salesPrice.toFixed(2)
        }, () => {
        })
      },
      buy: function () {
        if (this.typeEnable === 0) {
          if (!this.$refs.spec.specImg) {
            this.$refs.spec.specImg = this.goods.specs[0].specPicture + '?x-oss-process=image/resize,m_lfit,h_200,w_200'
          }
          this.$refs.spec.action = true
          this.$refs.spec.show = true
          this.$refs.wrapper.disable()
        }
      },
      shoppingCart: function () {
        this.$router.push({
          path: '/shoppingCart'
        })
      },
      addCart: function () {
        if (this.typeEnable === 0) {
          if (!this.$refs.spec.specImg) {
            this.$refs.spec.specImg = this.goods.specs[0].specPicture + '?x-oss-process=image/resize,m_lfit,h_200,w_200'
          }
          this.$refs.spec.action = false
          this.$refs.spec.show = true
          this.$refs.wrapper.disable()
        }
      },
      cartCount: function (cartNum) {
        this.cartNum = cartNum
      },
      enable: function () {
        this.$refs.wrapper.enable()
      },
      scroll: function (pos) {
        if (pos.y > 0) {
          this.$refs.wrapper.scrollToElement(this.$refs.content)
        }
        this.$refs.header.style.opacity = -(pos.y) / 250
        if ((-pos.y) > (this.$refs.contentWrapper.offsetHeight - this.$refs.detailTitle.offsetHeight + 10)) {
          this.detailShow = true
          this.goDetail(false)
        } else {
          this.detailShow = false
          this.goGoods(false)
        }
      },
      change: function (index) {
        this.current = index
      },
      goMine: function () {
        this.$router.push({
          path: '/mine'
        })
      },
      goDetail: function (click) {
        this.active = 1
        this.$refs.line.style.left = ((this.$refs.header.offsetWidth - 70) / 2 + 36) + 'px'
        if (click) {
          this.detailShow = true
          this.$refs.header.style.opacity = 1
          this.$refs.wrapper.scrollToElement(this.$refs.detail)
        }
      },
      goGoods: function (click) {
        this.active = 0
        this.$refs.line.style.left = ((this.$refs.header.offsetWidth - 70 - 6) / 2) + 'px'
        if (click) {
          this.detailShow = false
          this.$refs.header.style.opacity = 0
          this.$refs.wrapper.scrollToElement(this.$refs.content)
        }
      },
      goodsIntro: function () {
        this.detailActive = 0
        this.$router.replace({
          path: '/goodsIndex/goodsDetail'
        })
      },
      goodsSize: function () {
        this.detailActive = 1
        this.$router.replace({
          path: '/goodsIndex/goodsType'
        })
      },
      goodsInfo: function () {
        this.detailActive = 2
        this.$router.replace({
          path: '/goodsIndex/goodsInfo'
        })
      },
      sub: function (arr) {
        let params = {
          'spec_id': arr.specId,
          'goods_count': arr.num,
          'goods_id': this.goodsId
        }
        this.$router.push({
          path: '/orderConfirm',
          query: {
            specId: params.spec_id,
            goodsCount: params.goods_count,
            goodsId: params.goods_id
          }
        })
      },
      addIntoCart: function (arr) {
        console.log(arr.specId)
        if (!arr.specId) {
          this.$vux.toast.show({
            text: '请选择商品规格',
            type: 'cancel'
          })
          return
        }
        let params = {
          'spec_id': arr.specId,
          'goods_count': arr.num,
          'goods_id': this.goodsId
        }
        GoodsModel.cartAdd(params, (res) => {
          if (res.data.result === 1) {
            this.$emit('cartCount', res.data.cart_count)
            this.$refs.spec.hide()
            this.init()
          }
        }, () => {
        }, sessionStorage.getItem('token'))
      },
      ...mapActions([
        'showMask',
        'hideMask'
      ])
    },
    created: function () {
      this.init()
      let src = location.href.split('/')[location.href.split('/').length - 1]
      switch (src) {
        case 'goodsDetail': {
          this.detailActive = 0
          break
        }
        case 'goodsType': {
          this.detailActive = 1
          break
        }
        case 'goodsInfo': {
          this.detailActive = 2
          break
        }
      }
    },
    mounted: function () {
      this.$nextTick(() => {
        this.$refs.line.style.left = ((this.$refs.header.offsetWidth - 70 - 6) / 2) + 'px'
      })
    },
    computed: {
      ...mapGetters([
        'mask'
      ])
    },
    watch: {}
  }
</script>

<style lang="less" scoped>
  //noinspection CssUnknownTarget
  @import '~common/less/mixin.less';

  .active {
    color: @red;
  }

  .detail-active {
    background: @h1 !important;
    color: @white !important;
  }

  .active-line {
    display: inline-block;
    width: 75/@rem;
    height: 2/@rem;
    background: @red;
    position: absolute;
    bottom: 3/@rem;
    transition: left 0.3s;
  }

  .scroll-content {
    height: 100%;
    overflow: hidden;
  }

  .content-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    height: 88/@rem;
    background: @white;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    .dpr-font(15px);
    color: @grey;
    span {
      display: inline-block;
      text-align: center;
    }
    span:first-child {
      margin-right: 10px;
    }
  }

  .content {
    position: relative;
    min-height: 100%;
    padding-bottom: 120/@rem;
    .content-warpper {
      padding-bottom: 20/@rem;
      .swiper-wrapper {
        position: relative;
        .swiper-num {
          position: absolute;
          right: 0;
          bottom: 40/@rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 66/@rem;
          height: 36/@rem;
          border-radius: 18/@rem 0 0 18/@rem;
          background: rgba(0, 0, 0, 0.15);
          color: #ffffff;
          text-align: center;
          .dpr-font(10px);
          span {
            line-height: 16/@rem;
          }
        }
      }
      .goods-title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        background: @white;
        padding: 28/@rem 40/@rem;
        .goods-title-name {
          .dpr-font(15px);
          color: @h1;
        }
        .goods-title-intro {
          .dpr-font(12px);
          color: @intro;
        }
        .goods-title-price {
          span:first-child {
            .dpr-font(14px);
            color: @red;
          }
          span:nth-child(2) {
            .dpr-font(12px);
            color: @grey;
            text-decoration: line-through;
            margin-left: 40/@rem;
          }
        }
      }
      .goods-activity {
        margin-top: 20/@rem;
        height: 92/@rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background: @white;
        padding: 0 40/@rem;
        span:first-child {
          .dpr-font(14px);
          color: @grey;
        }
        span:nth-child(2) {
          .dpr-font(8px);
          border: 1px solid @red;
          color: @red;
          margin-left: 20/@rem;
          margin-right: 10/@rem;
        }
        span:nth-child(3) {
          .dpr-font(12px);
          color: @intro;
        }
      }
      .goods-spec {
        background: @white;
        height: 92/@rem;
        padding: 0 40/@rem;
        margin-top: 20/@rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:first-child {
          .dpr-font(14px);
          color: @grey;
        }
      }
    }
  }

  .goods-detail {
    position: relative;
  }

  .goods-detail-title {
    z-index: 999;
    width: 100%;
    padding: 20/@rem 0;
    background: @white;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      display: inline-block;
      width: 217/@rem;
      height: 60/@rem;
      line-height: 60/@rem;
      .dpr-font(12px);
      border: 1px solid @h1;
      color: @h1;
      text-align: center;
    }
    span:first-child {
      border-right: none;
      border-radius: 12/@rem 0 0 12/@rem;
    }
    span:nth-child(3) {
      border-left: none;
      border-radius: 0 12/@rem 12/@rem 0;
    }
  }

  .goods-detail-active {
    position: absolute;
    top: 88/@rem;
    left: 0;
  }

  .goods-ctrl {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 99/@rem;
    display: flex;
    align-items: center;
    background: @white;
    box-shadow: 0 0 13/@rem rgba(0, 0, 0, 0.2);
    .goods-ctrl-icon {
      width: 124/@rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      position: relative;
      .cartNum {
        position: absolute;
        top: -6/@rem;
        left: 60/@rem;
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
    }
    .goods-ctrl-add {
      flex-grow: 1;
      text-align: center;
      .dpr-font(16px);
      color: #333333;
      height: 100%;
      line-height: 99/@rem;
    }
    .goods-ctrl-buy {
      text-align: center;
      .dpr-font(16px);
      color: @white;
      background: linear-gradient(to right, #ff3963, @red);
      height: 100%;
      line-height: 99/@rem;
      width: 250/@rem;
    }
    .no-goods {
      text-align: center;
      .dpr-font(16px);
      background: #d8d8d8;
      color: @white;
      height: 100%;
      line-height: 99/@rem;
      width: 500/@rem;
    }
  }

</style>
