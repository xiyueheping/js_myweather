//导入vue模块
import Vue from 'vue';
//导入路由模块
import VueRouter from 'vue-router'
//启用路由模块
Vue.use(VueRouter)
//导入axios模块
import axios from 'axios'
//将axios赋值到全局作用域，便于子组件使用
window.axios = axios;
//导入jQuery
import $ from 'jquery'
window.$ = $;
//导入echart.js绘图库
import echarts from './module/echarts.min.js'
window.echarts = echarts;
//导入css文件
// import "./css/index.css"


//导入.vue单文件组件
import app from "./vue/app.vue"
import today from "./vue/today.vue"
import citymanage from "./vue/citymanage.vue"
import oneweek from "./vue/oneweek.vue"

//创建路由对象
var router = new VueRouter({
  routes:[
     {path:'/',redirect:'/today'},  //将重定向根路径
     {path:'/today',component:today},
     {path:'/citymanage',component:citymanage},
     {path:'/oneweek',component:oneweek}
  ]
})

//创建根实例
var root = new Vue({
  el: '#root',
  data: {
    weather_data:'sssssssss'
  },
  render:function(create){
      return create(app)
  },
  router:router
});