import Vue from 'vue'
import App from './App'
import router from './router' //引入router

import Comjs from './assets/js/com.js' //引入公用js
Vue.prototype.$comjs = Comjs //将公共的js放入vue环境中

//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import axios from "axios" //引入axios
//配置axios参数
axios.defaults.baseURL = baseUrl //获取请求的基本地址
axios.defaults.headers.post['Content-Type'] = 'application/jsoncharset=UTF-8' //设置axios post请求方式头部
axios.defaults.withCredentials = true //携带session
//axios请求拦截器
axios.interceptors.request.use(
  config => {
    console.log('axios请求拦截器')
    if (sessionStorage.getItem('accesstoken')) {
      config.headers.accesstoken = sessionStorage.getItem('accesstoken') //token
    } else {
      // console.log('无token')
    }
    return config
  },
  error => {
    return Promise.error(error)
  }
)
//axios响应拦截器
axios.interceptors.response.use(
  response => {
    console.log('axios响应拦截器', response)
    return response
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  }
)
Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
