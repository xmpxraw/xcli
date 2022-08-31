require('./def.scss'); 

import './view.js';
import '@js/initEnv.js';
import Vue from 'vue';
import app from './app.vue';

import filters from '@js/filters.js';
import common from '@js/common.js';
import requestMethods from '@js/request.js';
import eventBus from '@js/eventBus.js';
import { initGlobalData } from '@js/globalData.js';

import config from '@/config.js';
import { disabledKeys } from '@js/utils.js';

import { 
    Toast,
    IClose,
    IRefresh,
    Loading,
} from '@cc/ease-ui';

Vue.use(Toast);
Vue.use(IClose);
Vue.use(IRefresh);
Vue.use(Loading);

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
    const instance = new Vue({
        el: "#app",
        render: h => h(app)
    });
});