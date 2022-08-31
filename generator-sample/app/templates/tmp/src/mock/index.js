import Jsonp from 'jsonp';
import qs from 'qs';
import axios from 'axios';

import tcpMockData from '@mock/tcpMockData.js';  // tcp模拟数据
import cgiMockData from '@mock/cgiMockData.js';  // cgi模拟数据

window.cgiMockData = cgiMockData;
window.tcpMockData = tcpMockData;

function callBackMockData(type, name, params) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try{
                let mockData = window[`${type}MockData`];
                let res = mockData[name];
                
                if (typeof res == 'function') {
                    resolve(res(params));
                } else {
                    resolve(res);
                }
            } catch(e) {
                console.log('fail', e);
                reject(e);
            }
        }, 500);
    })
}


async function tiggerBroadCast(name) {
    let userInfoPro = ClientICC.getUserInfo();
    let userInfo = await userInfoPro;

    let {sid, cid} = window.tcps[name];

    let url = '//frontend-doc.dev.cc.163.com/tcpMsg';
    let data = tcpMockData[name] || {};
    if (typeof data == 'function') {
        data = data();
    }

    let params = {
        sid,
        cid,
        bctype: 'send_2_uid',
        uid: userInfo.uid,
        json_param: JSON.stringify(data),
        reason: 'Success',
        result: 0,
        test_type: 'bc'
    }
    params = qs.stringify(params)
    try {
        axios.get(`${url}?${params}`, {
            responseType: 'text',
        }).then((resp) => {
            console.log(resp);
        })
    } catch(e) {
        console.log(e);
    }
}

window.callBackMockData = callBackMockData;
window.tiggerBroadCast = tiggerBroadCast;