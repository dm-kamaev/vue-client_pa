import Vue from 'vue'
import HandleErr from '@/lib/HandleErr'
import { sync } from 'vuex-router-sync'
import router from './router'
import types from './store/types'
import moment from 'moment'
import App from './App'
import store from './store'
import '@/filters'
require('intersection-observer')

HandleErr.installRaven();

require('intersection-observer');

Vue.config.productionTip = false

window.store = store

new Vue({
  el: '#app',
  store,
  router,
  template: `<App />`,
  components: { App }
})

moment.locale('ru')
sync(store, router)
window.initialStateCopy = JSON.parse(JSON.stringify(store.state))
window.addEventListener('resize', function () {
  if (window.innerWidth < 768) {
    store.commit(types.SET_MOBILE_VERSION, true)
  } else {
    store.commit(types.SET_MOBILE_VERSION, false)
  }
})
store.dispatch('signIn')
