// 入口文件
import Vue from 'vue'

// 1.1导入路由的包
import VueRouter from 'vue-router'

// 1.2安装路由
Vue.use(VueRouter)

// 1.3 导入自己router.js
import router from './router.js'

// 2.1 导入vue-resource
import VueResource from 'vue-resource'
// 2.2 安装vue-resouce 
Vue.use(VueResource)

// 按需导入 Mint-UI的组件
import { Header,Button } from 'mint-ui'
import 'mint-ui/lib/style.css'

import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入MUI的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'


Vue.component(Header.name, Header)
Vue.component(Button.name, Button)

// 导入App组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router  // 1.4挂载路由对象到Vue
})