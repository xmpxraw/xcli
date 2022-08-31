/** 
 * 会等待下面的异步获取的变量全部获取才会创建vue实例
*/

import { deepObjectMergeAll } from '@js/utils';

// 需要异步获取的全局变量
let funs = [
    // 获取当前是否已登录
    new Promise((resolve) => {
        ClientICC.isLogined().then((isLogined) => {
            resolve({
                isLogined: isLogined
            });
        }).catch((e) => {
            console.log(e);
            resolve({});
        });
    }),

    // 获取当前用户信息
    new Promise((resolve) => {
        ClientICC.getUserInfo().then((userInfo) => {
            resolve({
                userInfo: {
                    ccid: userInfo.ccid,
                    uid: userInfo.uid,
                    nickname: userInfo.nickname,
                    purl: userInfo.purl,
                }
            });
        }).catch((e) => {
            console.log(e);
            resolve({});
        });
    }),

    // 获取当前主播
    new Promise((resolve) => {
        ClientICC.getAnchorInfo().then((anchorInfo) => {
            resolve({
                anchorInfo: {
                    ccid: anchorInfo.ccid,
                    uid: anchorInfo.uid,
                    nickname: anchorInfo.nickname,
                }
            });
        }).catch((e) => {
            console.log(e);
            resolve({});
        });
    }),

    // 获取客户端信息
    new Promise((resolve) => {
        resolve({
            client: {
                isAndroid: ClientICC.isAndroid(),
                isiOS: ClientICC.isiOS(),
                isPC: ClientICC.isPC(),
                isWebCC: ClientICC.isWebCC(),
                isMobile: ClientICC.isAndroid() || ClientICC.isiOS(),
                isUnderIE9: navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<=9,
            }
        });
    }),

    // 获取房间信息
    new Promise((resolve) => {
        ClientICC.getRoomId().then((roomid) => {            
            resolve({
                roomInfo: {
                    roomid: roomid || 0
                }
            });
        }).catch((e) => {
            console.log(e);
            resolve({});
        });
    }),

    // 获取房间子频道号信息
    new Promise((resolve) => {
        ClientICC.getChannelId().then((subcid) => {            
            resolve({
                roomInfo: {
                    subcid: subcid || 0
                }
            });
        }).catch((e) => {
            console.log(e);
            resolve({});
        });
    }),

    // 获取直播间品类
    new Promise((resolve) => {
        ClientICC.getGameType().then((data) => {
            resolve({
                roomInfo: {
                    gametype: parseInt(data.data.type) || null
                }
            });
        }).catch((e) => {
            console.log(e);
            resolve({});
        });
    })

    // 获取房间信息
    // ClientICC.getRoomInfo().then();

    // ATTENTATION!
    // ClientICC.getRoomInfo()在ios客户端返回的roomid/subid/topcid为字符串格式,而在安卓客户端是数字格式
]
export const initGlobalData = function(){
    return new Promise((resolve) => {
        Promise.all(funs).then((result) => {
            
            // 合并异步获取的变量
            let data = deepObjectMergeAll(result);

            resolve(data)
        }).catch((e) => {
            console.log(e);
            resolve({})
        })
    })
}