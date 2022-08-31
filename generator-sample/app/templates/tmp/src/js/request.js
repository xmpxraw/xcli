/**
 * @file 全局方法
 */

import qs from 'qs';
import Jsonp from 'jsonp';
import Axios from 'axios';
import config from '@/config.js';

if (process.env.NODE_ENV == 'development') {
    require('../mock/index.js');
}

function initTcp() {
    let tcps = Object.create(null);

    for (let key in config.tcps) {
        let [sid, cid, hasSetMock] = splitStr(config.tcps[key]);
        tcps[key] = {
            sid, 
            cid, 
            hasSetMock: hasSetMock === 'mock',
            mock: false,
        }
    }

    return tcps;
}

function splitStr(str) {
    return str.split('|');
}

function initCgi() {
    let cgis = Object.create(null);
    for (let key in config.cgis) {
        let [hostname, api, hasSetMock] = splitStr(config.cgis[key]);
        cgis[key] = {
            hostname,
            api,
            hasSetMock: hasSetMock === 'mock',
            mock: false,
        }
    }

    return cgis;
}

const tcps = initTcp();
const cgis = initCgi();

addTcpAndCgiToWindow('tcps', tcps);
addTcpAndCgiToWindow('cgis', cgis);

function addTcpAndCgiToWindow(type, data) {
    let obj = window[type];
    if (!obj) {
        obj = window[type] = {};
    }

    let keys = Object.keys(data);

    for(let key of keys) {
        if (obj.hasOwnProperty(key)) {
            console.warn(`${type} api ${key} 已被占用`);
        } else {
            obj[key] = data[key];
        }
    }
}

/**
 * 判断某个接口是否使用mock数据
 * @param {string} type tcp还是cgi
 * @param {string} name 接口别名
 */
function useMock(type, name, hasSetMock) {
    if (process.env.NODE_ENV != 'development') {
        return false;
    }
    
    if (!config.mock) {
        return false;
    }

    if (hasSetMock) {
        return true;
    }

    let apis = {};
    
    let apisSet = window.getLocalApiMockSet();

    if (type == 'cgi') {
        apis = apisSet.cgis;
    } else {
        apis = apisSet.tcps;
    }

    let api = apis[name] || '';
    if (api && api.mock) {
        return true;
    }

    return false;
}

/**
 * 封装axios，以及axios mock
 */
function createAxiosInstance() {
    return {
        get: function () {
            let name = arguments[0];
            let conf = arguments[1] || {};
            return axiosSend(name, conf, 'get');

        },
        post: function() {
            let name = arguments[0];
            let data = arguments[1] || {};
            let conf = arguments[2] || {};

            conf.data = data;
            return axiosSend(name, conf, 'post');
        },
        head: function() {
            let name = arguments[0];
            let conf = arguments[1] || {};
            return axiosSend(name, conf, 'head');
        },
        delete: function() {
            let name = arguments[0];
            let conf = arguments[1] || {};
            return axiosSend(name, conf, 'delete');
        },
        options: function() {
            let name = arguments[0];
            let conf = arguments[1] || {};
            return axiosSend(name, conf, 'options');
        },
        put: function() {
            let name = arguments[0];
            let data = arguments[1] || {};
            let conf = arguments[2] || {};

            conf.data = data;
            return axiosSend(name, conf, 'put');
        },
        patch: function() {
            let name = arguments[0];
            let data = arguments[1] || {};
            let conf = arguments[2] || {};

            conf.data = data;
            return axiosSend(name, conf, 'patch');
        },
    }
}

/**
 * 
 * @param {string} name cgi别名
 * @param {object} conf  axios配置
 * @param {string} method  请求方法
 */

function axiosSend(name, conf, method) {
    let {hostname, api, hasSetMock} = cgis[name];
    let host = config.apiHost[hostname];
    let url = `${host}${api}`;
    let mock = useMock('cgi', name, hasSetMock);
    let obj = {url, conf};
    consoleInfo('AXIOS', method, name, obj, mock);
    
    return new Promise((resolve, reject) => {
        if (mock) {
            window.callBackMockData('cgi', name, conf).then(res => {
                obj.res = res;
                consoleInfo('AXIOS', method, name, obj, mock);
                resolve(res);
            }).catch(err => {
                obj.err = err;
                consoleInfo('AXIOS', method, name, obj, mock, false);
                reject(err)
            })
        } else {
            // 如果未设置请求头 则设置默认请求头 避免CORS options请求
            if (!conf.headers || !conf.headers['Content-Type']) {
                conf.headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            Axios.request({
                url,
                method,
                ...conf
            }).then(resp => {
                obj.res = resp.data;
                consoleInfo('AXIOS', method, name, obj);
                resolve(resp.data);
            }).catch(err => {
                obj.err = err;
                consoleInfo('AXIOS', method, name, obj, mock, false);
                reject(err);
            })
        }
    })
}

function consoleInfo(apiType, method, name, res, mock = false, success = true) {
    if (process.env.NODE_ENV != 'development') {
        return;
    }

    let key = `------${success ? '' : 'fail'} ${mock ?'MOCK' : ''} [${apiType}] ${method}Message [${name}] ------`;
    
    debugInfo(key, {...res})

}
function debugInfo(label, ...args) {
    if (!window.console) { 
        return;
    }

    console.groupCollapsed(label);
    
    args.forEach((item) => {
        if (typeof item === 'object' && !Array.isArray(item)) {
            Object.keys(item).forEach((key) => {
                console.log(`${key}:`, item[key]);
            })
        } else {
            console.log(item);
        }
    });

    console.groupEnd();
}

/**
 * 全局方法
 * @class 
 * @hideconstructor
 */
const requestMethods = {
    // tcps: tcps,
    // cgis: cgis,
    Msg: {
        send: function(name, params = {}, timeout = 5000) {
            let {sid, cid, hasSetMock, register} = tcps[name];
            let type = 'TCP';
            let mock = useMock('tcp', name, hasSetMock);
            let obj = {sid, cid, params};

            consoleInfo(type, 'send', name, obj, mock);

            return new Promise((resolve, reject) => {
                if (mock) {
                    window.callBackMockData('tcp', name, params).then(res => {
                        obj.res = res;
                        consoleInfo(type, 'back', name, obj, mock);
                        resolve(res);
                    }).catch(err => {
                        obj.err = err;
                        consoleInfo(type, 'back', name, obj, mock, false);
                        reject(err);
                    });
                } else {
                    ClientICC.Message.send(sid, cid, params, timeout).then(res => {
                        obj.res = res;
                        // 如果注册监听 则不再打印消息回执  以广播收到的消息打印
                        if (!register) {
                            consoleInfo(type, 'back', name, obj);
                        }
                        resolve(res);
                    }).catch(err => {
                        if (!register) {
                            obj.err = err;
                            consoleInfo(type, 'back', name, obj, mock, false);
                            reject(err);
                        }
                    });
                }
            })
        },
        onMessage: function(name, fn) {
            let {sid, cid} = tcps[name];
            tcps[name].register = true;

            let fn1 = (res) => {
                consoleInfo('TCP', 'on', name, {sid, cid, res});
                fn(res);
            }

            return ClientICC.Message.onMessage(sid, cid, fn1);
        },
        onMessageOnce: function(name, fn) {
            let {sid, cid } = tcps[name];
            tcps[name].register = true;
            
            let fn1 = (res) => {
                consoleInfo('TCP', 'on', name, {sid, cid, res});
                fn(res);
            }

            return ClientICC.Message.onMessageOnce(sid, cid, fn1);
        },
        unRegister: function(name) {
            let {sid, cid } = tcps[name];
            tcps[name].register = false;

            return ClientICC.Message.unRegister(sid, cid);
        },
    },
    
    /**
     * jsonp
     * @function
     * 
     * @param {String} name - 请求别名
     * @param {Object} params - 请求参数
     * @return {Promise} 成功返回数据对象，否则返回error
     * 
     * @example 
     * this.jsonp('getList', {
     *      uid: 1234567
     * }, 'list').then(() => {
     *      console.log(list);
     * }).catch((error) => {
     *      console.log(error);
     * });
     */
    jsonp: function(name, params) {
        let {hostname, api, hasSetMock} = cgis[name];
        let host = config.apiHost[hostname];
        let mock = useMock('cgi', name, hasSetMock);
        let url = `${host}${api}`;
        let obj = {url, params};

        consoleInfo('CGI', 'send', name, obj, mock);

        return new Promise((resolve, reject) => {
            if (mock) {    // 使用mock数据
                window.callBackMockData('cgi', name, params).then(data => {
                    obj.data = data;
                    consoleInfo('CGI', 'get', name, obj, mock, true);
                    resolve(data);
                }).catch(err => {
                    obj.err = err;
                    consoleInfo('CGI', 'get', name, obj, mock, false);
                    reject(err);
                });
                return;
            }
            
            params = qs.stringify(params)
            Jsonp(`${ url }?${ params }`, {
                timeout: 10000,
            }, (err, data) => {
                if (err) {
                    obj.err = err;
                    consoleInfo('CGI', 'get', name, obj, false, true);
                    reject(err);
                    return;
                }
                obj.data = data;
                consoleInfo('CGI', 'get', name, obj);
                resolve(data);
            });
        })
    },

    /**
     * axios封装
     */
    axios: createAxiosInstance(),

}

export default requestMethods;
