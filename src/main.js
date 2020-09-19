// 入口文件
import Vue from 'vue'

// 按需导入 Mint-UI的组件
import { Header,Button } from 'mint-ui'
import 'mint-ui/lib/style.css'

// 导入MUI的样式
import './lib/mui/css/mui.css'

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)

// 导入App组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app)
})