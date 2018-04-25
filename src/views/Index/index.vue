<template>
  <div class="content">
    <div class="header">
      <!--<div class="header-search">-->
      <!--<span class="icon-search"></span>-->
      <!--<input type="text" placeholder="请输入搜索商品">-->
      <!--</div>-->
      <scroll style="width: 100%;overflow: hidden" :direction="'horizontal'">
        <div class="goods-type-wrapper" ref="content">
          <div class="goods-type" ref="types">
            <div class="type-name">
              <span :class="{'active':active===0}" @click="changeType(0,'')">大牌秒杀</span>
            </div>
            <div class="type-name" v-for="(item,index) in category">
              <span :class="{'active':active===index+1}" @click="changeType(index+1,item)">{{item.categoryName}}</span>
            </div>
            <span class="line" ref="line"></span>
          </div>
        </div>
      </scroll>
    </div>
    <my-nav :position="0"></my-nav>
    <scroll class="scroll-content" ref="wrapper">
      <div v-if="index" class="index-body">
        <swiper ref="swiper" :list="picList" style="width:100%;margin:0 auto;" :aspect-ratio="339/750"
                dots-position="center" :show-dots="true" @on-index-change="change" :dots-class="'dots'"
                :show-desc-mask="false" :auto="true" :loop="true" :interval="3000"></swiper>
        <div class="hot-list">
          <div class="hot-list-title">
            <img src="./title_global_sale@2x.png" alt="">
          </div>
          <div class="hot-list-item border-1px-e8" :class="{'first':index===0}" v-for="(item, index) in goodsList1">
            <div class="item-img" @click="goodsDetail(item.goodsId)">
              <img :src="item.goodsView+'?x-oss-process=image/resize,m_lfit,h_300,w_670'" alt="">
            </div>
            <div class="item-title">{{item.goodsName}}</div>
            <div class="item-info">
              <div class="item-info-left">
                <div class="item-info-left-inventory">
                  <span>仅剩{{item.invQty}}件</span>
                  <span :style="{width:(item.salesQty/(item.salesQty+item.invQty))*100+'%'}"></span>
                </div>
                <div class="item-info-left-price">
                  <div class="gg-price"><span>乖乖价 ￥</span><span>{{item.salesPrice.toFixed(2)}}</span></div>
                  <div class="jd-price"><span>*东价 ￥</span><span>{{item.goodsPrice.toFixed(2)}}</span></div>
                </div>
              </div>
              <div class="item-info-right">
                <span @click="goodsDetail(item.goodsId)">马上抢</span>
              </div>
            </div>
          </div>
        </div>
        <div class="hot-list">
          <div class="hot-list-title">
            <img src="./title_high_cargo_sale@2x.png" alt="">
          </div>
          <div class="hot-list-item border-1px-e8" :class="{'first':index===0}" v-for="(item, index) in goodsList2">
            <div class="item-img">
              <img :src="item.goodsView+'?x-oss-process=image/resize,m_lfit,h_300,w_670'" alt="">
            </div>
            <div class="item-title">{{item.goodsName}}</div>
            <div class="item-info">
              <div class="item-info-left">
                <div class="item-info-left-inventory">
                  <span>仅剩{{item.invQty}}件</span>
                  <span :style="{width:(item.salesQty/(item.salesQty+item.invQty))*100+'%'}"></span>
                </div>
                <div class="item-info-left-price">
                  <div class="gg-price"><span>乖乖价 ￥</span><span>{{item.salesPrice.toFixed(2)}}</span></div>
                  <div class="jd-price"><span>*东价 ￥</span><span>{{item.goodsPrice.toFixed(2)}}</span></div>
                </div>
              </div>
              <div class="item-info-right">
                <span @click="goodsDetail(item.goodsId)">马上抢</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!index" class="index-body">
        <swiper ref="swiper" :list="picList" style="width:100%;margin:0 auto;" :aspect-ratio="339/750"
                @click.native="goGoods"
                dots-position="center" :show-dots="true" @on-index-change="change" :dots-class="'dots'"
                :show-desc-mask="false" :auto="true" :loop="false" :interval="1000000"></swiper>
        <div class="hot-list">
          <div class="hot-list-item border-1px-e8" v-for="(item, index) in goodsList">
            <div class="item-img" @click="goodsDetail(item.goodsId)">
              <img :src="item.goodsView+'?x-oss-process=image/resize,m_lfit,h_300,w_670'" alt="">
            </div>
            <div class="item-title">{{item.goodsName}}</div>
            <div class="item-info">
              <div class="item-info-left">
                <div class="item-info-left-inventory">
                  <span>仅剩{{item.invQty}}件</span>
                  <span :style="{width:(item.salesQty/(item.salesQty+item.invQty))*100+'%'}"></span>
                </div>
                <div class="item-info-left-price">
                  <div class="gg-price"><span>乖乖价 ￥</span><span>{{item.salesPrice.toFixed(2)}}</span></div>
                  <div class="jd-price"><span>*东价 ￥</span><span>{{item.goodsPrice.toFixed(2)}}</span></div>
                </div>
              </div>
              <div class="item-info-right">
                <span @click="goodsDetail(item.goodsId)">马上抢</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/Scroll/Scroll'
  import {Swiper} from 'vux'
  import MyNav from 'components/Nav/Nav'
  import GoodsModel from '../../models/goods-model'

  export default {
    components: {
      Scroll,
      Swiper,
      MyNav
    },
    data: function () {
      return {
        active: 0,
        picList: [],
        current: 0,
        itemList: [0, 0, 0],
        position: 0,
        index: false,
        category: [],
        goodsList1: [],
        goodsList2: [],
        goodsList: []
      }
    },
    methods: {
      goGoods: function (el) {
        console.log(el)
      },
      goodsDetail: function (goodsId) {
        sessionStorage.setItem('goodsId', goodsId)
        this.$router.push({
          path: 'goodsIndex/goodsDetail'
        })
      },
      changeType: function (index, item) {
        this.active = index
        this.$refs.wrapper.scrollToElement(this.$refs.content)
        let width = 0
        for (let i = 0; i < index; i++) {
          width += this.$refs.types.children[i].offsetWidth
        }
        this.$refs.line.style.left = `${width + (this.$refs.types.children[index].offsetWidth - this.$refs.types.children[index].children[0].offsetWidth) / 2}px`
        console.log(this.$refs.line.style.left)
        if (item) {
          this.init(item.categoryId)
        } else {
          this.init('')
        }
      },
      change: function (index) {
        this.current = index
      },
      init: function (item) {
        GoodsModel.indexSwiper({}, (res) => {
          this.picList = []
          res.data.carouselActs.forEach((item, index, array) => {
            let url
            console.log(item.href.indexOf('http'))
            if (item.href.indexOf('http') < 0) {
              url = 'https://mgg.gzqqs.com/web/mgg-web/#/goodsIndex/goodsDetail?goodsId=' + item.href
            } else {
              url = item.href + '?device=web'
            }
            console.log(url)
            this.picList.push({
              url: url,
              img: item.image + '?x-oss-process=image/resize,m_lfit,h_339,w_750'
            })
          })
        })
        this.$nextTick(() => {
          console.log(this.$refs.swiper)
        })
        GoodsModel.categoryList({}, (res) => {
          this.category = res.data
        })
        if (!item) {
          this.index = true
          let params = {
            plateId: 5
          }
          GoodsModel.plate(params, (res) => {
            this.goodsList1 = res.data
            this.$refs.wrapper.refresh()
          })
          params = {
            plateId: 7
          }
          GoodsModel.plate(params, (res) => {
            this.goodsList2 = res.data
            this.$refs.wrapper.refresh()
          })
        } else {
          this.index = false
          let params = {
            catgId: item
          }
          GoodsModel.category(params, (res) => {
            this.goodsList = res.data
            this.$refs.wrapper.refresh()
          })
        }
      }
    },
    created: function () {
      this.init('')
      this.$nextTick(() => {
        console.log(this.$refs.types.children)
        this.$refs.line.style.left = `${(this.$refs.types.children[0].offsetWidth - this.$refs.types.children[0].children[0].offsetWidth) / 2}px`
      })
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

  .goods-type-wrapper {
    width: 100%;
    overflow: scroll;
  }

  .line {
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 120/@rem;
    background: @red;
    height: 6/@rem;
    border-radius: 3/@rem;
    transition: left 0.4s;
  }

  .active {
    color: @red !important;
  }

  .content {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1001;
  }

  .header {
    position: fixed;
    left: 0;
    top: 0;
    background: @white;
    width: 100%;
    z-index: 999;
    .header-search {
      padding: 20/@rem 26/@rem 0 30/@rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .icon-search {
        position: absolute;
        left: 56/@rem;
      }
      input {
        background: #f7f7f7;
        border-radius: 28/@rem;
        height: 56/@rem;
        .dpr-font(13px);
        padding: 0 26/@rem 0 76/@rem;
        flex-grow: 1;
        color: #333333;
      }
      input::placeholder {
        color: #a1a1a1;
        .dpr-font(13px);
      }
    }
    .goods-type {
      white-space: nowrap;
      height: 84/@rem;
      position: relative;
      .type-name {
        flex: 1;
        display: inline-block;
        text-align: center;
        height: 84/@rem;
        width: 180/@rem;
        line-height: 84/@rem;
        color: #535353;
        .dpr-font(15px);
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .first {
    padding-top: 0 !important;
  }

  .index-body {
    padding-top: 84/@rem;
    padding-bottom: 95/@rem;
    .activity {
      display: flex;
      .activity-one {
        position: relative;
        width: 345/@rem;
        height: 380/@rem;
        background: url("./1.png") no-repeat center;
        background-size: 345/@rem 380/@rem;
        border: 1/@rem solid #e8e8e8;
        border-top: none;
        border-left: none;
        border-bottom: none;
        .icon-go {
          position: absolute;
          left: 21/@rem;
          top: 149/@rem;
        }
      }
      .activity-wrapper {
        display: flex;
        flex-direction: column;
        width: 404/@rem;
        .activity-two {
          position: relative;
          height: 189/@rem;
          background: url("./2.png") no-repeat center;
          background-size: 404/@rem 189/@rem;
          border-bottom: 1/@rem solid #e8e8e8;
          .icon-go {
            position: absolute;
            left: 22/@rem;
            top: 105/@rem;
          }
        }
        .activity-three {
          position: relative;
          height: 189/@rem;
          background: url("./3.png") no-repeat center;
          background-size: 404/@rem 189/@rem;
          .icon-go {
            position: absolute;
            left: 22/@rem;
            top: 105/@rem;
          }
        }
      }
    }
    .hot-list {
      background: @white;
      margin-top: 20/@rem;
      .hot-list-title {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10/@rem;
        img {
          width: 448/@rem;
          height: 120/@rem;
        }
        .hot-list-title-change {
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            color: #666666;
            .dpr-font(13px);
          }
          span:nth-child(2) {
            margin-left: 10/@rem;
          }
        }
      }
      .hot-list-item {
        padding-top: 30/@rem;
        .item-img {
          padding: 0 40/@rem;
          img {
            width: 670/@rem;
            height: 300/@rem;
          }
        }
        .item-title {
          padding: 20/@rem 40/@rem;
          display: flex;
          align-items: center;
          .dpr-font(15px);
          color: #323232;
        }
        .item-info {
          padding: 0 40/@rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-top: 10/@rem;
          padding-bottom: 30/@rem;
          .item-info-left {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            .item-info-left-inventory {
              position: relative;
              width: 278/@rem;
              height: 30/@rem;
              span {
                display: inline-block;
                width: 278/@rem;
                height: 30/@rem;
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              span:first-child {
                border-radius: 15/@rem;
                border: 2/@rem solid @red;
                color: @red;
                z-index: 999;
              }
              span:nth-child(2) {
                background: #fddcde;
                border-radius: 15/@rem;
                top: 2/@rem;
                left: 2/@rem;
              }
            }
            .item-info-left-price {
              margin-top: 30/@rem;
              display: flex;
              align-items: flex-end;
              line-height: 40/@rem;
              .gg-price {
                display: table-cell;
                vertical-align: bottom;
                color: @red;
                .dpr-font(17px);
                span:first-child {
                  .dpr-font(12px);
                }
              }
              .jd-price {
                display: table-cell;
                vertical-align: bottom;
                margin-left: 40/@rem;
                span {
                  .dpr-font(12px);
                }
                span:nth-child(2) {
                  .dpr-font(11px);
                  color: #666666;
                  text-decoration: line-through;
                }
              }
            }
          }
          .item-info-right {
            span {
              display: inline-block;
              .dpr-font(14px);
              width: 150/@rem;
              height: 70/@rem;
              line-height: 70/@rem;
              background: none;
              border-radius: 8/@rem;
              text-align: center;
            }
            span:first-child {
              color: @red;
              border: 2/@rem solid @red;
            }
            span:last-child {
              color: @white;
              border: 2/@rem solid @red;
              background: @red;
              margin-left: 15/@rem;
            }
          }
        }
      }
    }
  }
</style>
<style lang="less">
  //noinspection CssUnknownTarget
  @import '~common/less/mixin.less';

  .dots {
    .vux-icon-dot {
      width: 10/@rem !important;
      height: 10/@rem !important;
      background: @white !important;
    }
    .active {
      width: 50/@rem !important;
      transition: width 0.3s;
    }
  }
</style>
