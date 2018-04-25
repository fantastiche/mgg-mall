<template>
  <div style="height: 100%">
    <transition :name="transitionName">
      <router-view ref="child" class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        transitionName: 'slide-left',
        name: '',
        className: '',
        phone: '',
        code: '',
        show: false
      }
    },
    beforeRouteUpdate: function (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next()
    },
    methods: {
    }
  }
</script>
<style scoped>
  .child-view {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all .8s cubic-bezier(.55, 0, .1, 1);
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
</style>
