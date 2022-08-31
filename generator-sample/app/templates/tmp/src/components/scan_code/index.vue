<!-- 首页 -->
<template>
  <div class="page_bind_phone">
    <div class="bind_content">
      <p class="title">好友通过微信扫描二维码, 获得礼包</p>
      <span class="close cursor" @click="close"></span>
      <span class="code" v-if="codeUrl">
        <img :src="codeUrl" class="code" alt="" />
      </span>
      <span class="code fzlt red" v-else> 生成分享二维码失败,请刷新重试 </span>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcode";
export default {
  props: ["handleCloseScanCode", "pageShareUrl"],
  data() {
    return {
      codeUrl: "",
    };
  },
  created() {
    this.generateQRCode();
  },
  methods: {
    generateQRCode() {
      QRCode.toDataURL(this.pageShareUrl)
        .then((url) => {
          this.codeUrl = url;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    close() {
      this.$emit("handleCloseScanCode");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
