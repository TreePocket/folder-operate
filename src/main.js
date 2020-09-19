/*
 * @Author: your name
 * @Date: 2020-09-10 16:25:55
 * @LastEditTime: 2020-09-19 15:41:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /folder-operate/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'

//elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//路由
import router from './router'

//Vuex
import store from './store'

//axios
import axios from './config/httpRequset'
Vue.prototype.$http = axios

//全局变量config
import config from './config/config'
Vue.prototype.$config = config

//精灵图样式
import './style/sprite.less'




//全局样式
import './style/index.scss'

//公用方法
import './utils/prototype'
import './utils/utils'
import './utils/directives'
import './utils/filter'

// 插件
import { localData, sessionData } from "../src/plugins/storage"
Vue.prototype.$localData = localData;
Vue.prototype.$sessionData = sessionData;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
