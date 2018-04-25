<template>
  <div id="app">
    <router-view></router-view>
    <v-mask v-if="mask"></v-mask>
  </div>
</template>

<script>
  import Mask from 'components/Mask/Mask'
  import {mapGetters} from 'vuex'

  document.querySelector('body').addEventListener('touchmove', function (ev) {
    event.preventDefault()
  })
  export default {
    name: 'app',
    components: {
      'VMask': Mask
    },
    data: function () {
      return {
        show: true
      }
    },
    computed: {
      ...mapGetters([
        'mask'
      ])
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import "./common/less/mixin";
  @import '~vux/src/styles/1px.less';

  html {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  input, textarea, select, button {
    font-family: "PingFang SC", apple-system-font, "Helvetica Neue", sans-serif;
  }

  body {
    width: 100%;
    height: 100%;
    background-color: #f3f5f7;
    overflow: hidden;
    font-family: "PingFang SC", apple-system-font, "Helvetica Neue", sans-serif;
  }

  #app {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }

  input, textarea {
    -webkit-appearance: none;
    border-radius: 0;
    border: none;
    outline: none;
  }

  input:focus, textarea:focus {
    border: none;
  }

  .weui-dialog {
    width: 580/@rem !important;
    border-radius: 20/@rem;
  }

  .weui-dialog__bd:first-child {
    padding: 50/@rem 60/@rem;
  }

  .weui-dialog__bd {
    .dpr-font(15px);
    color: #333333;
    line-height: 45/@rem;
  }

  .weui-dialog__ft {
    height: 90/@rem;
    line-height: 90/@rem;
  }

  .weui-dialog__btn {
    .dpr-font(17px);
    color: #333333;
  }

  .weui-dialog__btn_primary {
    color: @red !important;
  }
</style>

<style>
  .vux-popup-header-right {
    color: #e60012 !important;
  }
</style>
