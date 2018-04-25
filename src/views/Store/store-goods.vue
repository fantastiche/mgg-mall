<template>
  <div class="content">
    <scroll ref="wrapper" class="scroll-content">
      <div class="store-body">
        <div class="swiper-wrapper border-1px-e5">
          <swiper ref="swiper" :list="picList" style="width:100%;margin:0 auto;" :aspect-ratio="750/750" dots-position="center" :show-dots="false" @on-index-change="change" :show-desc-mask="false" :auto="true" :loop="true" :interval="3000"></swiper>
          <div class="swiper-num">
            <span>{{current+1}}/{{picLegth}}</span>
          </div>
        </div>
        <div class="store-info">
          <div class="store-info-title">成为美乖乖导师，获取专属礼包</div>
          <div class="store-info-price">
            <span>￥{{goods.salesPrice}}</span>
            <span>￥{{goods.goodsPrice}}</span>
          </div>
        </div>
        <div class="store-inviter">
          <span>邀请人</span>
          <img :src="shop.headImg?shop.headImg:'https://mgg.gzqqs.com/web/mgg-web/default.png'" alt="">
          <span>姓名</span>
          <span>{{shop.username}}</span>
        </div>
        <div class="goods-detail">
          <img v-for="(img, index3) in goodsDetail" :key="index3" :src="img" alt="">
        </div>
      </div>
    </scroll>
    <div class="store-btn" @click="toInfo">立即注册</div>
    <spec-choose :goodsId="goodsId" @enable="enable" ref="spec" :goods="goods" :attrs="goods.attrs" :specs="goods.specs" @sub="sub"></spec-choose>
  </div>
</template>

<script>
import Scroll from "components/Scroll/Scroll";
import { Swiper, querystring } from "vux";
import GoodsModel from "../../models/goods-model";
import SpecChoose from "components/SpecChoose/SpecChoose";

// const USERID = this.USERID
const ID = "5f77ff1468c3470ea7b21e5c843c74a1";
export default {
  components: {
    Scroll,
    Swiper,
    SpecChoose
  },
  data: function() {
    return {
      picList: [],
      picLegth: 0,
      goods: {},
      current: 0,
      goodsId: ID,
      shop: {},
      goodsDetail: []
    };
  },
  methods: {
    init: function() {
      let req = querystring.parse(location.href.split("?")[1]);
      let that = this;
      if (req) {
        sessionStorage.setItem("openId", req.openId);
        sessionStorage.setItem("invCode", req.invCode);
      }
      let params = {
        openId: sessionStorage.getItem("openId"),
        url: location.href.split("#")[0]
      };
      GoodsModel.share(
        params,
        res => {
          that.$wechat.config({
            debug: false,
            appId: res.pd.appId,
            timestamp: res.pd.timeStamp,
            nonceStr: res.pd.nonceStr,
            signature: res.pd.signature,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
          });
          that.$wechat.ready(function() {
            that.$wechat.onMenuShareTimeline({
              title: "美乖乖开店礼包",
              link:
                "https://mgg.gzqqs.com/qqs/mggindex/toShop.do?invCode=" +
                sessionStorage.getItem("invCode"),
              imgUrl: "https://mgg.gzqqs.com/web/mgg-web/logo.png",
              success: function() {
                that.$vux.toast.show({
                  text: "分享成功!",
                  type: "success"
                });
              }
            });
            that.$wechat.onMenuShareAppMessage({
              title: "美乖乖开店礼包",
              desc: "快来加入美乖乖大家族吧！",
              link:
                "https://mgg.gzqqs.com/qqs/mggindex/toShop.do?invCode=" +
                sessionStorage.getItem("invCode"),
              imgUrl: "https://mgg.gzqqs.com/web/mgg-web/logo.png",
              success: function() {
                that.$vux.toast.show({
                  text: "分享成功!",
                  type: "success"
                });
              }
            });
          });
        },
        () => {}
      );
      params = {
        id: ID
      };
      GoodsModel.goods(params, res => {
        this.goods = res.data;
        this.picLegth = this.goods.goodsPic.length;
        for (let i = 0; i < this.goods.goodsPic.length; i++) {
          this.picList.push({
            url: "javascript:",
            img:
              this.goods.goodsPic[i] +
              "?x-oss-process=image/resize,m_lfit,h_750,w_750"
          });
        }
        this.goods.goodsPrice = this.goods.goodsPrice.toFixed(2);
        this.goods.salesPrice = this.goods.salesPrice.toFixed(2);
        this.goodsDetail = this.goods.goodsDetail;
      });
      params = {
        id: "000250"
      };
      if (sessionStorage.getItem("invCode")) {
        params.id = sessionStorage.getItem("invCode");
      }
      GoodsModel.shopInfo(params, res => {
        this.shop = res.data;
      });
    },
    change: function(index) {
      this.current = index;
    },
    toInfo: function() {
      // this.$router.push({
      //   path: '/storeInfo'
      // })
      this.$refs.spec.action = true;
      this.$refs.spec.show = true;
      if (!this.$refs.spec.specImg) {
        this.$refs.spec.specImg =
          this.goods.specs[0].specPicture +
          "?x-oss-process=image/resize,m_lfit,h_200,w_200";
      }
      this.$refs.wrapper.disable();
    },
    enable: function() {
      this.$refs.wrapper.enable();
    },
    sub: function(arr) {
      if (arr.num > 1) {
        this.$vux.toast.show({
          text: "礼包只能购买一个哦～",
          time: 3000,
          type: "cancel"
        });
      } else {
        let params = {
          spec_id: arr.specId,
          goods_count: 1,
          goods_id: this.goodsId,
          shopCode: sessionStorage.getItem("invCode")
        };
        sessionStorage.setItem("specId", params.spec_id);
        sessionStorage.setItem("goodsCount", params.goods_count);
        sessionStorage.setItem("goodsId", params.goods_id);
        sessionStorage.setItem("shopCode", params.shopCode);
        this.$router.push({
          path: "/storeInfo"
        });
      }
    }
  },
  created: function() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
//noinspection CssUnknownTarget
@import "~common/less/mixin.less";
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

.scroll-content {
  height: 100%;
  overflow: hidden;
}

.content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .store-body {
    padding-bottom: 100/@rem;
    .store-info {
      background: white;
      height: 96/@rem;
      padding: 20/@rem 30/@rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .store-info-title {
        .dpr-font(15px);
        color: #333333;
      }
      .store-info-price {
        span:first-child {
          .dpr-font(14px);
          color: @red;
        }
        span:nth-child(2) {
          .dpr-font(12px);
          color: #999999;
          text-decoration: line-through;
          margin-left: 40/@rem;
        }
      }
    }
    .store-inviter {
      display: flex;
      align-items: center;
      padding: 0 30/@rem;
      height: 92/@rem;
      .dpr-font(14px);
      color: #333333;
      background: white;
      margin-top: 20/@rem;
      img {
        width: 64/@rem;
        height: 64/@rem;
        margin-left: 18/@rem;
        margin-right: 24/@rem;
      }
      span:last-child {
        .dpr-font(13px);
        color: #666666;
        margin-left: 36/@rem;
      }
    }
    .goods-detail {
      display: flex;
      flex-direction: column;
      img {
        width: 100%;
      }
    }
  }
  .store-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    color: @white;
    .dpr-font(17px);
    background: linear-gradient(to right, #ff3963, @red);
    height: 99/@rem;
    line-height: 99/@rem;
  }
}
</style>
