import VueRouter from 'vue-router';
// 通过页面传参的方式访问指定路由
const page = ClientICC.getUrlParam('page');

const routes = [
    { path: '/', redirect:{ path: page ? `/${decodeURIComponent(page)}` : "/home" }},
    { path: '/home', component: () => import('@pages/home/index.vue')},
    { path: '/rank', component: () => import('@pages/rank/index.vue') },
    { path: '/mylog', component: () => import('@pages/mylog/index.vue') },
    { path: '/rule', component: () => import('@pages/rule/index.vue') },
    { path: '*', redirect:{ path: "/home" }},
]

const routers = new VueRouter({routes})

routers.beforeEach((to, from, next) => {
    next()
})

export default routers