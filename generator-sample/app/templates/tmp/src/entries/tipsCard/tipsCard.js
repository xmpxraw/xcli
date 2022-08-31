// @ts-nocheck
import Vue from "vue";
const isProduction = !!process.env.NODE_ENV.match("production");

import gift from "./app.vue";
import { scheduleMixins } from "@js/modules/mixin.js";
Vue.mixin(scheduleMixins)
if (isProduction) {
  // 生产环境重写console.log
  console.log = function () { };
} else {
}

if (ClientICC.isPC() || ClientICC.isWebCC()) {
  ClientICC.setWindowSize(280, 75);
  // 定义PC端可拖动位置
  // ClientICC.setDraggableAreas([
  //   {
  //     left: "0",
  //     top: "0",
  //     width: "280px",
  //     height: "39px",
  //   },
  // ]);
}

new Vue({
  el: "#app",
  render: (h) => h(gift),
});
