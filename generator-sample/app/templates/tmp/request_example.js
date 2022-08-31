this.Msg.send("userInteral1", { actid: "mhsw_hfzz_test" }).then((data) => {
  // console.warn('tcp', data);
});
this.Msg.send("userInteral2", { actid: "mhsw_hfzz_test" }).then((data) => {
  // console.warn('tcp', data);
});
this.jsonp("getFishList1", {
  anchor_uid: this.globalData.userInfo.uid,
}).then((res) => {
  // console.warn('cgi', res)
});
this.jsonp("getFishList2", {
  anchor_uid: this.globalData.userInfo.uid,
}).then((res) => {
  // console.warn('cgi', res);
});

this.Msg.onMessage("testDemo", (res) => {
  this.test(res);
});