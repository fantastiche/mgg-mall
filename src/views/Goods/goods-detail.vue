<template>
  <div class="content">
    <img :src="item" v-for="(item, index) in goods.goodsDetail">
  </div>
</template>

<script>
  export default {
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    created: function () {
      this.$nextTick(() => {
        this.$emit('initScroll')
      })
    }
  }
</script>

<style lang="less" scoped>
  //noinspection CssUnknownTarget
  @import '~common/less/mixin.less';

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 100%;
    }
  }

</style>
