<!-- 首页 -->
<template>
  <div class="page_home">
    <div class="item">
      <div class="no_msg_wrapper">
        <NoMessage text="暂无活动信息" />
      </div>
    </div>
    <div class="item">
      <Rate
        void-icon-class="icon-rate-face-off"
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
        v-model="rateValue"
      />
    </div>
    <div class="item white">
      点击复制
      <CopyText :copyIconUrl="copyIconUrl" copyText="复制的文案" />
    </div>
    <div class="item">
      <Pagination curPage="10" total="30" @changePage="changePage"></Pagination>
    </div>
    <div class="item">
      <LoadMore
        rederId="rank_load_more"
        :loadText="loadText"
        @handleLoadBottom="handleLoadBottom"
      />
    </div>
    <div class="item">
      <button @click="handleAlert">点击提示</button>
    </div>
    <div class="item">
      <button class="white" @click="handleShowScanCode">显示分享二维码</button>
      <ScanCode
        pageShareUrl="baidu.com"
        @handleCloseScanCode="handleCloseScanCode"
        v-if="showScanCode"
      />
    </div>
    <div class="item">
      <SelectCom :selectList="selectList" @handleSelect="handleSelect" />
    </div>
    <div class="item">
      剩余{{ countDownCodeNumber }}秒
    </div>
  </div>
</template>
<script>
import NoMessage from "@components/noMessage";
import Rate from "@components/rate";
import CopyText from "@components/copy_text";
import Pagination from "@components/pagination";
import LoadMore from "@components/load_more";
import ScanCode from "@components/scan_code";
import SelectCom from "@components/select-com";
// 倒计时
import { addCountDown } from "@js/modules/countdown.js";
export default {
  components: {
    NoMessage,
    Rate,
    CopyText,
    Pagination,
    LoadMore,
    ScanCode,
    SelectCom,
  },
  data() {
    return {
      countDownCodeNumber: 0, // 倒计时
      rateValue: null, // rate
      copyIconUrl: "", // copy
      loadText: "下拉加载更多", // loadmore
      isLastPage: true,
      showScanCode: false,
      selectList: [
        {
          id: 1,
          name: "离群之刺1",
          active: true,
        },
        {
          id: 2,
          name: "离群之刺2",
          active: false,
          disabled: true,
        },
        {
          id: 3,
          name: "离群之刺3",
          active: false,
        },
        {
          id: 4,
          name: "离群之刺4",
          active: false,
        },
        {
          id: 5,
          name: "离群之刺5",
          active: false,
        },
      ],
    };
  },
  created() {
    this.send();
    this.handleCountDownTime()
  },
  methods: {
    // 添加倒计时
    handleCountDownTime() {
      addCountDown(
        6000,
        (res) => {
          const timer = res;
          this.countDownCodeNumber = timer;
        },
        "page_bind_code"
      );
    },
    handleSelect(item) {
      console.log(item, "选择了item");
      this.selectList = this.selectList.map(i => {
         return {
            ...i,
            active: item.id == i.id
          }
      })
    },
    // 显示二维码
    handleShowScanCode() {
      this.showScanCode = true;
    },
    // 关闭二维码
    handleCloseScanCode() {
      this.showScanCode = false;
    },
    handleAlert() {
      // messagebox使用方式
      this.$MessageBox({
        showInput: true,
        dialog_desc: "中间内容可以传富文本",
        inputText: "我帅吗",
        title: "标题",
        content: `中间内容可以传富文本`,
        canCelText: "取消",
        confirmText: "好的",
        dialogList: [
          {
            icon: require("../../img/back.png"),
            desc: "这是描述",
          },
        ],
      })
        .then((res) => {
          // 是否选中下次不再提醒
          console.log(res.check);
          console.log("删除");
        })
        .catch(() => {
          console.log("取消删除");
        });
    },
    handleLoadBottom() {
      console.log("触底了");
      // if (this.isLastPage) return;
      // this.pageNation = {
      //   ...this.pageNation,
      //   page: this.pageNation.page + 1,
      // };
      // this.getRecommendList();
    },
    send() {
      let params = {
        uid: this.globalData.userInfo.uid,
      };
      this.axios.get("getUserInfoByUid", { params }).then((res) => {
        console.warn(res);
      });
    },
    // 修改当前页
    changePage(page) {
      this.pagination = {
        ...this.pagination,
        cur: page,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@styles/funs";
@import "./style";
</style>