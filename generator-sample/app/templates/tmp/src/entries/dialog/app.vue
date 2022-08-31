<template>
    <div class="ui-dialog">
        <i-close></i-close>
        <div class="container">
            dialog
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    created () {
        // 房间内弹窗调用  通知客户端在页面加载完成之后显示页面  根据业务场景自行选择保留
        ClientICC.callNative('roomWindowLoaded', {success:true}).catch(function(){});
        
        // 房间外弹窗调用  通知客户端在页面加载完成之后显示页面  根据业务场景自行选择保留
        ClientICC.callNative('windowLoaded', {success:true}).catch(function(){});
    },
    mounted() {
        if (this.globalData.client.isMobile) {
            ClientICC.hideCloseBtn(1);
        }
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
@import '~@styles/funs';
@import './style.scss';
</style>