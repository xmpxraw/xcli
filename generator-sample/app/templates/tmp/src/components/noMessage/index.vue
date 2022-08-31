<!-- 首页 -->
<template>
  <div class="page_no_message">
    <img src="./images/tip.png" alt="" class="no_message_icon" />
    <p class="tip_text">{{ text }}</p>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: "暂无数据",
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
