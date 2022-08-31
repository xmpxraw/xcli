// @ts-nocheck
const scheduleMixins = {
    data() {
        return {
            pName: '功绩值', // 礼物名称
            fakerHead: require("@img/faker_head.png"),
        }
    },
    filters: {

    },
    methods: {
        cutStr(str, len = 8) {
            if (!str) return '未知';
            const format = "...";
            if (str && str.length > len) {
                str = str.slice(0, len) + format;
            }
            return str;
        },
        dealDotFunc(value) {
            if (!value) {
                return 0;
            }
            if (value >= 10000) {
                let val = Math.floor((value / 1000) * 10) / 10;
                let str = val.toString();
                let n = str.length % 3;
                if (n) {
                    str = str.slice(0, n) + str.slice(n).replace(/(\d{3})/g, ",$1");
                } else {
                    str = str.replace(/(\d{3})/g, ",$1").slice(1);
                }
                return `${str}K`;
            }
            return value;
        },


        // 打开新窗口
        // style为移动端专用，默认为全屏（1为全屏、2为半屏、3可指定大小/位置浏览器，譬如答题）
        openWindow(url, style = 2) {
            console.log(url)
            const actid = ClientICC.getUrlParam("activity_id", location.href) || "page_2021_game_celebration_individual"
            ClientICC.openNewWindow({
                url,
                id: actid,
                style,
                isdrag: true,
                isqt5: true
            });

        },
        /**
       * 打开用户资料页
       * @param {Number} uid
       * @param {Number} ccid
       */
        showUserInfo(uid, ccid = 0) {
            if (uid > 0) {
                // @ts-ignore
                ClientICC.showUserInfo(uid, ccid);
            }
        },
        handleGoJoin(item) {
            const { roomid: roomId, subcid: channelId } = item;
            if (!roomId || !channelId) return;
            if (this.roomid == roomId && this.subcid == channelId) {
                // this.$ease.toast({
                //     text: "您当前已在该房间内！",
                //     position: "middle",
                // });
                return;
            }
            ClientICC.joinRoomConfirm(roomId, channelId);
        },
        // 加入直播间
        handleJoinRoom(item) {
            if (!item) return;
            const { roomid } = item;
            if (roomid > 0) {
                this.handleGoJoin(item);
            } else {
                const { ccid, uid } = item;
                if (!ccid || !uid) {
                    // this.toast("不存在此cc账号");
                    return;
                }
                this.showUserInfo(uid, ccid);
            }
        },
        log(obj, line) {
            console.log(JSON.parse(JSON.stringify(obj)), line);
        },



    }
}
export {
    scheduleMixins
}