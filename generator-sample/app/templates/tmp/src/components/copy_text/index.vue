<template>
  <span class="page_copy" @click="handleClickCopy" >
    <img :src="getUrl()" alt="" class="copy_icon" />
  </span>
</template>
<script>
import copy from "copy-to-clipboard";
export default {
  props: {
    copyIconUrl: {
      type: String,
      default: "tab2/copy.png",
    },
    copyText: {
      type: String,
      default: "",
    },
    copySuccessTip: {
      type: String,
      default: "已复制",
    }
  },
  methods: {
    getUrl() {
      if (!this.copyIconUrl) {
        return require(`./images/copy.png`)
      }
      return require(`@img/${this.copyIconUrl}`)
    },
    handleClickCopy() {
      console.log(this.copyText, '复制的文字')
      if (!this.copyText) return;
      copy(this.copyText);
      this.toast(this.copySuccessTip)
    },
  }
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
