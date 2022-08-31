import Vue from 'vue';
// 当前是否来自cc
const isFromcc = ClientICC.isAndroid() || ClientICC.isiOS() || ClientICC.isPC() || ClientICC.isWebCC();
const eventBus = new Vue({
    data () {
        return {
            isProduction: !!process.env.NODE_ENV.match('production'),
            isLogined: false,
            userInfo: {},
            anchorInfo: {},
            client: {},
            roomInfo: {},
            isFromcc, // 当前是否在cc端内
        }
    },
    created() {
        ClientICC.Message.onMessage(6144, 7, ({ data }) => {
            console.log('--------------web端和移动端麦序变化：');
            if (data.mic && data.mic.length > 0) {
                this.anchorInfo.ccid = data.mic[0].ccid;
                this.anchorInfo.uid = data.mic[0].uid;
                this.anchorInfo.nickname = data.mic[0].nick;
            } else {
                this.anchorInfo.uid = null;
                this.anchorInfo.ccid = null;
                this.anchorInfo.nickname = null;
            }
        });

        window.IWeb_notifyMictopChange = (int) =>{
            console.log('--------------pc客户端麦序变化：',int);
            if (int) {
                ClientICC.getAnchorInfo().then((anchorInfo) => {
                    this.anchorInfo.ccid = anchorInfo.ccid;
                    this.anchorInfo.uid = anchorInfo.uid;
                    this.anchorInfo.nickname = anchorInfo.nickname;
                }).catch((e) => {
                    console.log(e);
                });
            } else {
                this.anchorInfo.uid = null;
                this.anchorInfo.ccid = null;
                this.anchorInfo.nickname = null;
            }
        };

        // 监听品类变化，web端和移动端品类变化会关闭活动页，PC端则不会
        // Msg.onMessage(517, 32821, ({ data }) => {
        //     // this.roomInfo.gametype = data.live_gametype;
        // });
    },
    mounted() {
        
    },
});

export default eventBus;