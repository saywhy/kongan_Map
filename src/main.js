// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './assets/css/index.css'

// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api/';

// 引入echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

import "echarts/extension/bmap/bmap.js";
import '../node_modules/echarts/map/js/world.js'

//过滤器
import '@/filters/index'

import '@/assets/js/common.js'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
