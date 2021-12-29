import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import axios from 'axios'
import wln from '../wln.js'
import '../utility.js'
import './vue-ctrl.js'
import './xcenter.css'
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueCookie);
export {
  Vue,
  Vuex,
  VueRouter,
  VueCookie,
  axios,
  wln
}