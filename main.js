import App from './App'
import uviewPlus from 'uview-plus'
import http from "@/lib/http.js"
// 长缓存
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//  store
import { createPinia } from "pinia"
const store = createPinia();
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  store.use(piniaPluginPersistedstate);
  app.use(store)
  uni.$u.config.unit = 'rpx'
  app.config.globalProperties.$http = http;
  return {
    app
  }
}
// #endif
