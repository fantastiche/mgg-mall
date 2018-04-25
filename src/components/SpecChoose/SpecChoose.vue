<template>
  <div v-if="show" class="spec-mask-wrapper">
    <div class="mask" @click="hide"></div>
    <div class="spec-choose" ref="spec">

      <div class="spec-choose-wrapper">
        <span class="icon-close" @click="hide"></span>
        <div class="goods-pic">
          <img :src="specImg" alt="">
        </div>
        <div class="goods-info border-1px-e5">
          <span>￥{{goods.salesPrice}}</span>
          <span>库存 {{goods.invQty}}</span>
          <span v-if="!specStr">请选择规格</span>
          <span v-if="specStr">{{specStr}}</span>
        </div>
        <scroll class="scroll-content">
          <div>
            <div class="goods-spec border-1px-e5">
              <div v-for="(item, index) in attrs">
                <div class="goods-spec-title">{{item.attrName}}</div>
                <div class="goods-spec-detail">
          <span v-for="(item2, index2) in item.items" :class="{'active':item2.active}"
                @click="choose(item, index, item2, index2)">{{item2.attrName}}</span>
                </div>
              </div>
            </div>
            <div class="goods-num">
              <span class="goods-num-title">数量</span>
              <div class="goods-num-ctrl">
                <span @click="sub">－</span>
                <input type="text" v-model="num">
                <span @click="add">＋</span>
              </div>
            </div>
          </div>
        </scroll>
        <div class="goods-ctrl">
          <div class="goods-ctrl-buy" @click="buy">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroll from 'components/Scroll/Scroll'
  // import GoodsModel from '../../models/goods-model'

  export default {
    components: {
      Scroll
    },
    props: {
      attrs: {
        type: Array,
        default: function () {
          return []
        }
      },
      specs: {
        type: Array,
        default: function () {
          return []
        }
      },
      goods: {
        type: Object,
        default: function () {
          return {}
        }
      },
      goodsId: {
        type: String,
        default: ''
      }
    },
    data: function () {
      return {
        spec: [],
        num: 1,
        show: false,
        specStr: '',
        specId: '',
        action: false,
        specImg: ''
      }
    },
    methods: {
      choose: function (item, index, item2, index2) {
        item.items.forEach((item4, index4, array4) => {
          item4.active = false
        })
        item.items[index2].active = true
        this.spec[index] = item2.attrName
        let specStr = this.spec.join(',')
        console.log(this.spec)
        this.specs.forEach((spec, i, a) => {
          if (specStr === spec.specName) {
            this.specStr = spec.specName
            this.specId = spec.specId
            this.goods.salesPrice = spec.specPrice
            this.goods.invQty = spec.invQty
            this.specImg = spec.specPicture + '?x-oss-process=image/resize,m_lfit,h_200,w_200'
          }
        })
        this.$set(this.attrs, index, item)
      },
      add: function () {
        this.num++
      },
      sub: function () {
        if (this.num > 1) {
          this.num--
        }
      },
      hide: function () {
        this.$emit('enable')
        this.$nextTick(() => {
          this.$refs.spec.style.top = `100%`
        })
        setTimeout(() => {
          this.show = false
        }, 300)
      },
      buy: function () {
        if (this.action) {
          this.$emit('sub', {specId: this.specId, num: this.num})
        } else {
          this.$emit('addIntoCart', {specId: this.specId, num: this.num})
        }
      }
    },
    created: function () {
    },
    watch: {
      show: function (val, oldVal) {
        if (val) {
          this.$nextTick(() => {
            this.$refs.spec.style.top = `${(document.documentElement.clientHeight - this.$refs.spec.offsetHeight)}px`
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  //noinspection CssUnknownTarget
  @import '~common/less/mixin.less';

  .scroll-content {
    width: 100%;
    height: 274/@rem;
    overflow: hidden;
  }

  .spec-mask-wrapper {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed
  }

  .spec-choose {
    position: absolute;
    top: 100%;
    left: 0;
    height: 560/@rem;
    width: 100%;
    background: @white;
    z-index: 1001;
    transition: top 0.4s;
    .spec-choose-wrapper {
      position: relative;
      padding: 0 30/@rem;
      height: 100%;
      .icon-close {
        position: absolute;
        top: 30/@rem;
        right: 30/@rem;
        z-index: 1000;
      }
      .goods-pic {
        position: absolute;
        top: -40/@rem;
        left: 30/@rem;
        width: 202/@rem;
        height: 202/@rem;
        img {
          width: 200/@rem;
          height: 200/@rem;
          border: 2/@rem solid #e5e5e5;
          border-radius: 6/@rem;
        }
      }
      .goods-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 40/@rem 0 40/@rem 270/@rem;
        color: #999999;
        .dpr-font(12px);
        span:first-child {
          .dpr-font(15px);
          color: #e60012;
        }
      }
      .goods-spec {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding-bottom: 30/@rem;
        padding-top: 10/@rem;
        .goods-spec-title {
          color: #666666;
          .dpr-font(14px);
          margin-top: 20/@rem;
        }
        .goods-spec-detail {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          span {
            margin-top: 20/@rem;
            margin-right: 20/@rem;
            padding: 0 20/@rem;
            height: 48/@rem;
            background: #f7f7f7;
            color: #333333;
            .dpr-font(12px);
            border-radius: 24/@rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          span:last-child {
            margin-right: 0;
          }
        }
      }
      .goods-num {
        height: 138/@rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .goods-num-title {
          .dpr-font(14px);
          color: #666666;
        }
        .goods-num-ctrl {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          span {
            width: 60/@rem;
            height: 60/@rem;
            line-height: 60/@rem;
            border: 2/@rem solid #cccccc;
          }
          span:first-child {
            border-right: none;
            border-radius: 6/@rem 0 0 6/@rem;
          }
          span:last-child {
            border-left: none;
            border-radius: 0 6/@rem 6/@rem 0;
          }
          input {
            width: 92/@rem;
            height: 60/@rem;
            text-align: center;
            border: 2/@rem solid #cccccc;
            .dpr-font(14px);
            color: #333333;
          }
        }
      }
      .goods-ctrl {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 98/@rem;
        display: flex;
        align-items: center;
        div {
          flex-grow: 1;
          .dpr-font(17px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .goods-ctrl-add {
          height: 100%;
          background: @white;
          color: @red;
          border-top: 1/@rem solid #e5e5e5;
        }
        .goods-ctrl-buy {
          height: 100%;
          background: linear-gradient(to right, #ff3963, @red);
          color: @white;
        }
      }
    }
  }

  .active {
    background: @red !important;
    color: @white !important;
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #4a4a4a;
    opacity: 0.5;
  }
</style>
