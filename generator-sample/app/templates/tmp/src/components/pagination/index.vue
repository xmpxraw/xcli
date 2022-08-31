<template>
  <div class="turn-page" v-if="total > 0">
    <span class="first-btn" @click="changePage(1)"> </span>
    <span
      :class="{ 'pre-btn': true, disable: curPage <= 1 }"
      @click="changePage(curPage - 1)"
    ></span>
    <span class="items">
      <span
        v-for="item in showArr"
        :key="item"
        @click="changePage(item)"
        :class="{ item: true, select: item === curPage }"
        >{{ item }}</span
      >
    </span>
    <span
      :class="{ 'next-btn': true, disable: curPage >= total }"
      @click="changePage(curPage + 1)"
    ></span>
    <span class="last-btn" @click="changePage(total)"></span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "curPage"],
  data() {
    return {
      totalArr: [],
      showArr: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.totalArr = [];
      for (var i = 0; i < this.total; i++) {
        this.totalArr.push(i + 1);
      }
      if (this.total > 5) {
        this.showArr = this.totalArr.slice(0, 5);
      } else {
        this.showArr = this.totalArr;
      }
    },
    changePage(page) {
      if (page < 1 || page > this.total || page == this.curPage) return;
      this.$emit("changePage", page);
    },
  },
  watch: {
    total() {
      this.init();
    },
    curPage(val) {
      if (this.total > 5) {
        let head = val;
        let end = val;
        for (var i = 0; i < 2; i++) {
          if (head - 1 > 0) {
            head -= 1;
          } else {
            end += 1;
          }

          if (end + 1 <= this.total) {
            end += 1;
          } else {
            head -= 1;
          }
        }
        this.showArr = this.totalArr.slice(head - 1, end);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@styles/funs";

@mixin wh($w, $h) {
  width: $w;
  height: $h;
}
$themeColor: none;
.turn-page {
  text-align: center;
  font-size: p2r(24);
  color: #fff;
  height: p2r(90);
  line-height: p2r(90);
  padding: p2r(20) 0;
  position: fixed;
  bottom: p(10);
  z-index: 19;
  left: p(10);
  box-sizing: border-box;
  width: p(720);
  background: $themeColor;
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    float: left;
  }
  .first-btn,
  .last-btn {
    display: inline-block;
    @include wh(p2r(56), p2r(48));
    box-sizing: border-box;
    text-align: center;
    line-height: p2r(44);
    border-radius: p2r(12);
    position: relative;
    cursor: pointer;
    display: none;
    @include bg("./images/arrow_page.png");
  }
  .last-btn {
    transform: rotate(180deg);
  }
  .items {
    width: p2r(540);
    text-align: center;
  }
  .item {
    display: inline-block;
    width: p2r(68);
    line-height: p2r(48);
    height: p2r(48);
    cursor: pointer;
    border: 1px #fff solid;
    margin-right: p(20);
    border-radius: p(5);
  }
  .select {
    text-decoration: underline;
    cursor: default;
    background: #c2915b;
  }
  .pre-btn,
  .next-btn {
    display: inline-block;
    @include wh(p2r(68), p2r(48));
    border-radius: p2r(12);
    box-sizing: border-box;

    cursor: pointer;
    border: 1px #fff solid;
    border-radius: p(5);
    position: relative;

    &:before {
      content: "";
      width: p(20);
      height: p(20);
      @include bg("./images/arrow_page.png");
      display: inline-block;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: p(13);
    }
  }
  .disable {
    cursor: default;
  }
  .next-btn {
    transform: scaleX(-1);
  }
  .first-btn {
    margin-left: p2r(10);
    padding-left: p2r(32);
    &::before {
      left: p2r(20);
    }
  }
  .last-btn {
    padding-right: p2r(32);
    &::before {
      right: p2r(20);
      transform: scaleX(-1);
    }
  }
  .pre-btn {
    margin-left: p2r(10);
  }
  .next-btn {
    margin-right: p2r(10);
  }
}
</style>
