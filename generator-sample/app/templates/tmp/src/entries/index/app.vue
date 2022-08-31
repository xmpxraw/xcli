<template>
  <div class="ui-wrap">
    <i-close></i-close>
    <i-refresh></i-refresh>

    <i class="icon-back" v-show="$route.path === '/rule'" @click="goback"></i>
    <router-link
      tag="span"
      to="/rule"
      class="icon-rule"
      v-show="$route.path !== '/rule'"
      >规则页</router-link
    >

    <div class="kv">KV</div>
    <div class="nav-field" v-show="$route.path !== '/rule'">
      <router-link
        to="/home"
        class="nav"
        active-class="router-link-exact-active"
        >互动首页</router-link
      >
      <router-link
        to="/rank"
        class="nav"
        active-class="router-link-exact-active"
        >奖励榜</router-link
      >
      <router-link
        to="/mylog"
        class="nav"
        active-class="router-link-exact-active"
        >互动记录</router-link
      >
    </div>

    <div class="container">
      <router-view id="routerView" class="routerView"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created() {
    console.warn(this.globalData);
  },
  mounted() {
    // 隐藏系统的关闭按钮
    ClientICC.hideCloseBtn(1).catch((e) => {});
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@styles/funs";
@import "./style.scss";
</style>