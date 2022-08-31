<!-- 首页 -->
<template>
  <div class="page_select">
    <div class="select">
      <span
        class="select_item"
        @click="handleToggleSelect"
        v-on-clickaway="handleCloseSelect"
      >
        {{ getActive }}
      </span>
      <transition name="fade">
        <span class="select_pos" v-show="showSelect">
          <span
            class="select_pos_item"
            v-for="(i, k) in selectList"
            :key="k"
            @click="handleClickItem(i, k)"
            :class="{disabled: i.disabled, active: i.active}"
          >
            {{ i.name }}
          </span>
        </span>
      </transition>
    </div>
  </div>
</template>
<script>
import { directive as onClickaway } from "vue-clickaway";
export default {
  directives: { onClickaway },
  props: {
    selectList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    handleSelect: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    getActive() {
      const curVal = this.selectList.filter((i) => i.active);
      return curVal[0].name || "";
    },
  },
  data() {
    return {
      showSelect: false,
    };
  },
  methods: {
    handleToggleSelect() {
      this.showSelect = !this.showSelect;
    },
    handleClickItem(i, index) {
      if (i.disabled) return;
      this.$emit("handleSelect", i);
    },
    handleCloseSelect() {
      this.showSelect = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
