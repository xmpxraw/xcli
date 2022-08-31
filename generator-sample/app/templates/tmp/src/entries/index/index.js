// @ts-nocheck
// @ts-ignore
require('./def.scss'); 

import './view.js';
import '@js/initEnv.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
// @ts-ignore
import app from './app.vue';

// @ts-ignore
import filters from '@js/filters.js';
// @ts-ignore
import common from '@js/common.js';
// @ts-ignore
import requestMethods from '@js/request.js';
// @ts-ignore
import eventBus from '@js/eventBus.js';
// @ts-ignore
import { initGlobalData } from '@js/globalData.js';

import  routers  from './router.js';
// @ts-ignore
import config from '@/config.js';
// @ts-ignore
import { disabledKeys } from '@js/utils.js';

// @ts-ignore
import { scheduleMixins } from "@js/modules/mixin.js";
Vue.mixin(scheduleMixins)

import {handleSendLog} from '@js/modules/sendlog.js'; // 日志
Vue.prototype.handleSendLog = handleSendLog;

// @ts-ignore
import MessageBox from '@components/MessageBox/modules/main.js'
Vue.use(MessageBox)

import { 
    // @ts-ignore
    Toast,
    // @ts-ignore
    IClose,
    // @ts-ignore
    IRefresh,
    // @ts-ignore
    Loading,
// @ts-ignore
} from '@cc/ease-ui';
Vue.use(Toast);
Vue.use(IClose);
Vue.use(IRefresh);
Vue.use(Loading);

Vue.use(VueRouter)

Vue.prototype.conf = config;

Object.keys(filters).forEach(function (name) {
    Vue.filter(name, filters[name]);
});

Object.keys(common).forEach(function (name) {
    Vue.prototype[name] = common[name];
});

Object.keys(requestMethods).forEach(function (name) {
    Vue.prototype[name] = requestMethods[name];
});

if (eventBus.isProduction) {
    // 生产环境重写console.log
    console.log = function() {};
    // 屏蔽右键
    disabledKeys();
}

// 初始化全局数据
initGlobalData().then((globalData) => {
    for (let key in globalData) {
        eventBus[key] = globalData[key];
    }
    
    Vue.prototype.globalData = eventBus;
    // @ts-ignore
    const instance = new Vue({
        el: "#app",
        router: routers,
        render: h => h(app)
    });
});