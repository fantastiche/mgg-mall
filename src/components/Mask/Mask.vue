<template>
  <div class="mask" @click="hide"></div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    methods: {
      hide: function () {
        setTimeout(() => {
          this.hideMask()
        }, 500)
      },
      ...mapActions([
        'hideMask'
      ])
    }
  }
</script>

<style lang="less">
  //noinspection CssUnknownTarget
  @import '~common/less/mixin.less';

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #4a4a4a;
    opacity: 0.5;
  }

</style>
