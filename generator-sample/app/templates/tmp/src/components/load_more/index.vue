<template>
  <div class="load_more" :id="rederId">{{loadText}}</div>
</template>
<script>
export default {
  props: {
    rederId: {
      type: String,
      default: "",
    },
    loadText: {
      type: String,
      default: "下拉加载更多",
    },
    handleLoadBottom: {
      type: Function,
      default: () => {},
    },
  },
  mounted() {
    this.initLoadMore();
  },
  methods: {
    initLoadMore() {
      let box = document.querySelector(`#${this.rederId}`);

      let observer = new IntersectionObserver((entries) => {
        entries.forEach((item) => {
          let tips = item.isIntersecting
            ? "进入了父元素的内部"
            : "离开了父元素的内部";
          item.isIntersecting && this.$emit('handleLoadBottom')
        });
      });

      observer.observe(box); // 监听一个box
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
