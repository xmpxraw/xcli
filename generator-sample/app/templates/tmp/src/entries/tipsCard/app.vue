<template>
  <div class="page_tip_cards" @click.stop="sendLog26">
    <span class="close cursor" @click.stop="handleClose"></span>
    <span class="left_icon">
      <img :src="pageData.icon" alt="" />
    </span>
    <span class="right">
      <p>
        <span class="red">{{ pageData.role_name | cutStr }}</span
        >进入直播间
      </p>
      <p class="p2">
        <span class="red">大话战神榜</span>进入直播间, 请与TA多多互动吧
      </p>
    </span>
  </div>
</template>

<script>
import {handleSendLog } from '@js/modules/sendlog'
export default {
  data() {
    return {
      pageData: {},
    };
  },
  created() {
    // 房间内弹窗调用  通知客户端在页面加载完成之后显示页面  根据业务场景自行选择保留
    ClientICC.callNative("roomWindowLoaded", { success: true }).catch(
      function () {}
    );

    // 房间外弹窗调用  通知客户端在页面加载完成之后显示页面  根据业务场景自行选择保留
    ClientICC.callNative("windowLoaded", { success: true }).catch(
      function () {}
    );
  },
  mounted() {
    this.getPageData();
    this.sendLog27();
  },
  filters: {
    // 超过7位str length, 返回 1234567.... 格式
    cutStr(str, len = 8) {
      if (!str) return "未知";
      const format = "...";
      if (str && str.length > len) {
        str = str.slice(0, len) + format;
      }
      return str;
    },
  },
  methods: {
    // 点击关闭日志
    sendLog25() {
      const params = {
        event_position: "公屏区",
        event_id: "clk_new_11_5_25",
        event_name: "精彩时刻触发浮层-点击关闭",
        event_type: "其他点击",
        main_info: {
          play_id: this.pageData.act_id,
          account_uid: this.pageData.uid,
        },
      };
      handleSendLog(params);
    },
    // 点击查看
    sendLog26() {
      const params = {
        event_position: "公屏区",
        event_id: "clk_new_11_5_26",
        event_name: "精彩时刻触发浮层-点击查看",
        event_type: "其他点击",
        main_info: {
          play_id: this.pageData.act_id,
          account_uid: this.pageData.uid,
        },
      };
      handleSendLog(params);
    },
    // 精彩时刻触发浮层曝光
    sendLog27() {
      const params = {
        event_position: "公屏区",
        event_id: "clk_new_11_5_27",
        event_name: "精彩时刻触发浮层曝光",
        event_type: "其他曝光",
        main_info: {
          play_id: this.pageData.act_id,
          account_uid: this.pageData.uid,
        },
      };
      handleSendLog(params);
    },
    handleClose() {
      this.sendLog25();
      if (ClientICC.isWebCC()) {
        ClientICC.callNative("closeChatScreenNotification");
      } else if (ClientICC.isPC()) {
        ClientICC.callNative("ICC_CloseChatTipsWidget");
      } else {
        ClientICC.callNative("closeWebView");
      }
    },
    getPageData() {
      // 兼容新旧协议的pagename
      ClientICC.getBusinessData({ key: "agbigrexchange22_anchor_tips" }).then(
        (res) => {
          let pageData;
          if (typeof res === "string") {
            res = JSON.parse(res.data_ || res);
            pageData = res.data[0].data;
          } else if (typeof res === "object") {
            if (Array.isArray(res.data.data)) {
              pageData = res.data.data[0].data;
            } else {
              pageData = res.data;
            }
          }
          this.pageData = pageData || {};
        }
      );
    },
  },
};
</script>

<style lang="scss">
@import "~@styles/funs";
@import "~@styles/reset";
@import "./style.scss";
</style>