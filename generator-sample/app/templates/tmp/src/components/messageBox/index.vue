<template>
  <transition name="fade">
    <div v-show="visible" class="page_base_dialog">
      <div class="box">
        <span class="dialog_close" v-if="showClose" @click="clickCancel"></span>
        <div class="box-title fzlt" v-if="title">
          <p class="box-text">{{ title }}</p>
        </div>
        <div class="box-scroll">
          <div class="box-content" v-html="content" v-if="content"></div>
          <div class="showList" v-if="dialogList && dialogList.length">
            <div
              class="listItem"
              v-for="(item, index) in dialogList"
              :key="index"
            >
              <span class="item_bg">
                <img :src="item.icon" class="item_img" alt="" />
              </span>
              <span class="item_desc">{{ item.desc }}</span>
            </div>
          </div>
          <div class="dialog_desc" v-if="dialog_desc">
            {{ dialog_desc }}
          </div>
          <label class="inputCheckBox" v-if="showInput">
            <input type="checkbox" class="checked" v-model="check" />
            {{inputText || '下次不再提醒'}}
          </label>
        </div>
        <div class="box-btns" :class="{ justOne: !canCelText }">
          <span v-if="canCelText" @click="clickCancel" class="btn-cancel">
            {{ canCelText }}
          </span>
          <span @click="clickConfirm" class="btn-confirm">
            {{ confirmText }}
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MessageBox",
  data() {
    return {
      visible: false,
      title: "提示",
      content: "",
      resolve: "",
      reject: "",
      promise: "",
      confirmText: "确定",
      dialogList: [],
      canCelText: "",
      showClose: false,
      dialog_desc: "",
      check: false,
      showInput: false,
      inputText: '下次不再提醒'
    };
  },
  methods: {
    clickConfirm() {
      this.visible = false;
      this.resolve({
        check: this.check
      });
    },
    clickCancel() {
      this.visible = false;
      this.reject({
        check: this.check
      });
    },
    showMsgBox: function () {
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
  },
};
</script>


<style lang="scss" scoped>
@import "./style.scss";
</style>
