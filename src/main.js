import Vue from 'vue'
import Vonic from 'vonic'
import axios from 'axios';
import cjs from './util/common';

window.cjs = cjs;

Vue.prototype.$http = axios;

// Page view
// 登录
import Login from './view/Login.vue'
// 主页
import Home from './view/Home.vue'
// 积分查询
import Jfcx from './view/Jfcx.vue'
// 积分查询-选择员工
import Xzyg from './view/Xzyg.vue'
// 积分排名
import Jfpm from './view/Jfpm.vue'
// 积分排名-排名查询
import Pmcx from './view/Pmcx.vue'
// 奖扣申请
import Jksq from './view/Jksq.vue'
// 任务管理
import Rwgl from './view/Rwgl.vue'
// 奖扣下达
import Jkxd from './view/Jkxd.vue'
// 奖扣下达-添加
import JkxdAdd from './view/JkxdAdd.vue'
// 奖扣审核
import Jksh from './view/Jksh.vue'
// 奖扣审核-申请详情
import Sqxq from './view/Sqxq.vue'
// 奖扣标准
import Jkbz from './view/Jkbz.vue'
// 我的
import My from './view/My.vue'
// 我的
import father from './view/father.vue'

// Routes
const routes = [
    { path: '/', component: Home },
    { path: '/Login', component: Login },
    { path: '/Home', component: Home },
    { path: '/Jfcx', component: Jfcx },
    { path: '/Jfpm', component: Jfpm },
    { path: '/Jksq', component: Jksq },
    { path: '/Rwgl', component: Rwgl },
    { path: '/Jkxd', component: Jkxd },
    { path: '/JkxdAdd', component: JkxdAdd },
    { path: '/Jksh', component: Jksh },
    { path: '/Sqxq', component: Sqxq },
    { path: '/Xzyg', component: Xzyg },
    { path: '/Pmcx', component: Pmcx },
    { path: '/Jkbz', component: Jkbz },
    { path: '/My', component: My },
    { path: '/father', component: father }
]

Vue.use(Vonic.app, {
    routes: routes
})
