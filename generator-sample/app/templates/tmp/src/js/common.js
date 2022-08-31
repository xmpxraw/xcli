/**
 * @file 公共方法
 */

import { deepObjectMergeAll } from '@js/utils';

const logs = {
    'showDialog': {
        event_id: 'clk_new_5_2_65',
        event_type: '资源曝光',
        event_classify: '弹窗', //必传，日志分类 由策划提供
        event_position: '三端通用登录首页弹窗', //必传，具体位置 由策划提供
        event_name: '登录首页通用弹窗曝光',
    },
}

// 日志
function sendLog(key, main_info = {}, other_info = {}) {
    let tInfo = logs[key];
    let info = Object.assign(tInfo, {
        log_from: "N19149_355404",  // 工号 + 日志单号
        main_info: main_info,
        other_info: other_info,
    });

    ClientICC.clickJsonLog(info);
}

// 100弹窗获取携带数据
function getLastPopupData(key) {
    return ClientICC.getBusinessData({ key }).then(res => {
        if (ClientICC.isPC()) {
            try {
                res = JSON.parse(res.data_ || res)
                res = res.data[0]
            } catch (e) {
                console.log('pc error', e)
            }
        }
        if (res && res.data && res.data.data && res.data.data.length > 0) {
            res = res.data.data[0]
        }

        return res
    })
}


/**
 * 解析url参数
 * @param {String} name 要匹配的字段
 * @param {String} url 匹配的字符串，非必传，默认location.href
 * @return {String} 返回一个字符串 如: 123
 * @example
 * this.getUrlParam('id');
 */
const getUrlParam = function (name, url = location.href) {
    let pattern = new RegExp("[?&]" + name + "=([^&]+)", "g");
    let matcher = pattern.exec(url);
    let items = null;
    if (null != matcher) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items ? items.replace('#/', '') : items;
}


/**
 * 去掉vue格式化后的数据
 * @param {Object} data 相当于console.log
 * @param {String} line 当前data的解释
 * @example
 * this.logJson(data, '这是explain');
 */
const logJson = (data, line) => {
    console.log(JSON.parse(JSON.stringify(data)), line)
}

/**
 * 刷新当前页面
 * @example
 * this.reloadWebView();
 */
function reloadWebView() {
    if (ClientICC.isWebCC()) {
        try {
            if (
                !!window.ActiveXObject ||
                'ActiveXObject' in window ||
                navigator.userAgent.toLocaleLowerCase().indexOf('edge') > -1
            ) {
                parent.roomPlugins.openPlugin(
                    '',
                    location.pathname + location.search
                )
            } else {
                location.reload()
            }
        } catch (e) { }
    } else if (ClientICC.isAndroid()) {
        window.location.href = updateUrl(location.href, 'refreshtimestamp')
    } else {
        location.reload()
    }
}

function updateUrl(url, key) {
    const tKey = (key || 't') + '=' //默认是"t"
    const reg = new RegExp(tKey + '\\d+') //正则：t=1472286066028
    const timestamp = +new Date()
    if (url.indexOf(tKey) > -1) {
        //有时间戳，直接更新
        return url.replace(reg, tKey + timestamp)
    } else {
        //没有时间戳，加上时间戳
        if (url.indexOf('?') > -1) {
            const urlArr = url.split('?')
            if (urlArr[1]) {
                return urlArr[0] + '?' + tKey + timestamp + '&' + urlArr[1]
            } else {
                return urlArr[0] + '?' + tKey + timestamp
            }
        } else {
            if (url.indexOf('#') > -1) {
                return url.split('#')[0] + '?' + tKey + timestamp + location.hash
            } else {
                return url + '?' + tKey + timestamp
            }
        }
    }
}

/**
 * 打开登录弹窗
 */
function showLoginView() {
    ClientICC.showLoginView().then(() => {
        ClientICC.isWebCC() || reloadWebView()
    })
}

/**
 * 打开用户资料页
 * @param {Number} uid
 * @param {Number} ccid
 */
function showUserInfo(uid, ccid = 0) {
    if (uid > 0) {
        ClientICC.showUserInfo(uid, ccid)
    }
}


/**
 * 打开新窗口
 * @param {String} url 页面地址
 * @param {Number} id pc端专用,业务端自定义 可传空
 * @param {Number} style 移动端专用，默认为全屏1
 * @example
 * this.openNewWindow(url, 'page_xxx', 1);
 */

function openNewWindow(url = '', id = 'page_temp', style = 1) {
    if (!url) {
        return
    }
    if (ClientICC.isPC()) {
        ClientICC.callNative('ICC_ShowWebViewWindowNew', id, url, JSON.stringify({}), 1).catch(
            (e) => {
                ClientICC.callNative('ICC_ShowWebViewWindow', id, url, JSON.stringify({}))
            }
        )
    } else {
        ClientICC.openNewWindow({
            url,
            id,
            style,
        })
    }
}


/**
 * 进入直播间,如果已在当前直播间，则toast提示
 * @param {Number} roomid 房间id
 * @param {Number} subcid 频道号
 * @example
 * this.newJoinRoom(12, 34)
 */
const newJoinRoom = (roomId, channelId) => {
    const { roomid, subcid } = this.globalData.roomInfo;
    if (roomid === roomId && subcid === channelId) {
        this.$ease.toast({
            text: "您当前已在该房间内！",
            position: "middle",
        });
        return;
    }
    ClientICC.joinRoomConfirm(roomId, channelId);
}


/**
 * @description 判断当前版本v1是否小于v2
 * @param {Number} v1 版本号
 * @param {Number} v2 版本号
 * @example
 * const than = this.vlt('1.03', '1.24');
 */
function vlt(v1, v2) {
    if (!v1 || !v2) {
        return false
    }
    const version1 = v1.split('.')
    const version2 = v2.split('.')
    for (let i = 0; i < version1.length; i++) {
        if (+version1[i] < +version2[i]) {
            return true
        } else if (+version1[i] > +version2[i]) {
            return false
        }
    }
    return false
}

// 屏蔽右键
const disabledKeys = () => {
    document.body.oncontextmenu = document.body.ondragstart = document.body.onbeforecopy = function () {
        return false
    }
    function doKey(e) {
        let ev = e || window.event //获取event对象
        let obj = ev.target || ev.srcElement //获取事件源
        let t = obj.type || obj.getAttribute('type') //获取事件源类型
        if (ev.keyCode == 8 && t != 'password' && t != 'text' && t != 'textarea') {
            return false
        }
        if (!(ev.keyCode == 86 && ev.ctrlKey) && !(ev.keyCode == 67 && ev.ctrlKey) && (ev.ctrlKey || ev.keyCode == 78 && ev.ctrlKey || ev.altKey || ev.altKey && ev.keyCode == 115)) {
            return false
        }
    }
    //禁止后退等其它按键 作用于Firefox、Opera
    document.onkeypress = doKey
    //禁止后退等其它按键  作用于IE、Chrome
    document.onkeydown = doKey
}


/**
 * toast提示
 * @param {String} text 显示信息
 * @example this.toast('i am theshy')
*/
const toast = function (text) {
    this.$ease.toast({
        text,
        position: 'middle'
    })
}

/**
 * @description 可以安全地获取无限多层次的数据，一旦数据不存在不会报错，会返回undefined，相当于ts的安全导航符
 * @param {Object} o data 如 {a: {b:2}}
 * @param {String} p 路径 如 'a.b'
 * @return {String | Number | Object | Boolean | Function} 对应的key值
 * @example
 * const data = {a: {b:2}}
 * const b = this.safeGet(data, 'a.b') // 返回2
 * const b = this.safeGet(data, 'a.b.c.d.f') // 返回undefined
 */
const safeGet = (o, p) => {
    try {
        return p.split('.').reduce((o, k) => o[k], o)
    } catch (e) {
        return null
    }
}

/**
* @description 发送三端日志, 区分cc端内端外,端内端外都用同一个参数即可
* @param {Object} conf 日志参数
* @example
* const params = {
 event_id: "clk_new_4_95_5",
 event_name: "通用活跃抽奖玩法 - 积分不足站内弹窗曝光",
 event_type: "其他曝光",
};
this.handleSendLog(params);
*/
const handleSendLog = (conf = {}) => {
    try {
        const isDev = this.getIsDev();
        const perConf = {
            id: 'clk_new',
            isDev: isDev, //不传则表示是在正式环境
            event_position: 'xxxxx',
            event_classify: '玩法活动页面',
            log_from: 'xxxxx', //必传，记录来源，记录者工号_pm单号
            main_info: {},
            other_info: {},
        }
        const params = Object.assign(perConf, conf);
        // 当前是否来自cc
        const isFromcc = ClientICC.isAndroid() || ClientICC.isiOS() || ClientICC.isPC() || ClientICC.isWebCC();
        if (isFromcc) {
            console.log('端内日志', params)
            ClientICC.clickJsonLog(params);
        } else {
            // 这个要安装依赖
            console.log('端外日志', params)
            // sendBILog(params)
        }
    } catch (e) {
        console.log(e, '日志发送失败')
    }
}

/**
 * @description 获取当前是否是正式环境
 * @return {Boolean} 返回一个布尔值， true / false
 * @example
 * const isProd = this.getIsProd()
*/
const getIsProd = () => {
    const isProduction = !!process.env.NODE_ENV.match('production');
    return isProduction;
}

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

/**
* @description 截取字符串
* @param {String} str 要截取的字符串
* @param {Number} len 长度
* @param {String} format 格式化后面跟着的东西
* @return {String} 返回一个字符串, 如 '123...'
* @example
* const str = this.cutStr('12345678', 3)
*/
const cutStr = (str, len, format = '...') => {
    if (str && str.length > len) {
        str = str.slice(0, len) + format
    }
    return str
}

/**
* @description 判断数字超过多少，则显示多少+， 如超过99，显示99+
* @param {Number} rank 当前数字
* @param {Number} len 超过多少，如20、99
* @param {String} text 不匹配返回的数字
* @return {String} 返回一个字符串, 如 '99+'
* @example
* const str = this.normalizeRank(101, 99, '暂无')
*/
const normalizeRank = (rank, len, text = '暂无') => {
    if (rank === undefined || rank === null || rank === 0) {
        return text
    } else {
        return rank > len ? `${len}+` : rank
    }
}

/**
* @description 秒转换成字符串
* @param {Number} s 当前时间戳秒数
* @example
* const str = this.seconds2str(new Date())
*/
const seconds2str = (s) => {
    let hours = Math.floor(s / 3600)
    let minutes = Math.floor(s % 3600 / 60)
    let seconds = Math.floor(s % 60)

    if (hours < 10) {
        hours = '0' + hours
    }

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    if (seconds < 10) {
        seconds = '0' + seconds
    }

    return `${hours}:${minutes}:${seconds}`
}

/**
 * 公共方法
 * @class 
 * @hideconstructor
 */
const Common = {
    deepObjectMerge: deepObjectMergeAll,
    sendLog,
    getLastPopupData,
    getUrlParam,
    logJson,
    reloadWebView,
    showLoginView,
    showUserInfo,
    openNewWindow,
    newJoinRoom,
    vlt,
    disabledKeys,
    toast,
    safeGet,
    handleSendLog,
    getIsProd,
    getIsDev,
    cutStr,
    normalizeRank,
    seconds2str,


}

export default Common;