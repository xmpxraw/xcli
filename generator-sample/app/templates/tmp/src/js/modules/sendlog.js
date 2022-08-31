// @ts-nocheck
import sendBILog from "@cc/bi_log_new";
/**
 * @description 获取当前是否是测试环境
 * @return {Boolean} 返回一个布尔值， true / false
 * @example
 * const isDev = this.getIsDev()
*/
const getIsDev = () => {
    const isProduction = !!process.env.NODE_ENV.match('production');
    const isDev = !isProduction;
    return isDev;
}
const isDev = getIsDev();
const logBaseConfig = {
    id: 'clk_new',
    isDev: isDev, //不传则表示是在正式环境
    event_position: '大话大R服务系统页面',
    event_classify: '玩法活动页面',
    log_from: 'N23818_529073', //必传，记录来源，记录者工号_pm单号
    main_info: {},
    other_info: {},
}
/**
* @description 发送三端日志, 区分cc端内端外,端内端外都用同一个参数即可
* @param {Object} conf 日志参数
* @example
* const params = {
 event_id: "clk_new_4_95_5",
 event_name: "通用活跃抽奖玩法 - 积分不足站内弹窗曝光",
 event_type: "其他曝光"
};
this.handleSendLog(params);
*/
const handleSendLog = (conf = {}) => {
    try {
        const perConf = { ...logBaseConfig }
        const params = Object.assign(perConf, conf);
        // 当前是否来自cc
        const isFromcc = ClientICC.isAndroid() || ClientICC.isiOS() || ClientICC.isPC() || ClientICC.isWebCC();
        if (isFromcc) {
            console.log('端内日志 ========================', params)
            ClientICC.clickJsonLog(params);
        } else {
            // 这个要安装依赖
            console.log('端外日志 ========================', params)
            sendBILog(params)
        }
    } catch (e) {
        console.log(e, '日志发送失败')
    }
}



export {
    handleSendLog
}