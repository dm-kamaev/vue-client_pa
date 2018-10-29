import Vue from 'vue'
import moment from 'moment'
import { sync } from 'vuex-router-sync'
import App from '@/components/App'
import router from '@/router'
import store from '@/store'
import types from '@/store/types'
import api from 'vue_components/src/api'
import HandleErr from '@/lib/HandleErr.js'
import polyfillCustomEvent from '@/utils/customEvent'
import '@/filters'
require('intersection-observer');

HandleErr.installRaven();

Vue.config.productionTip = false

window.store = store
window.app = {}

new Vue({
  el: '#app',
  router,
  store,
  template: `<App />`,
  components: { App }
})

polyfillCustomEvent();
sync(store, router)

moment.locale('ru')

window.initialStateCopy = JSON.parse(JSON.stringify(store.state))

api.fetch.setApiUrl(store.state.common.apiUrl)

if (store.state.common.isApp) {
  const headers = {}

  store.state.common.cookies.forEach((item) => {
    if (localStorage[item.name]) {
      headers[item.name] = localStorage[item.name]
    }
  });

  headers['is-cordova'] = 'true'
  headers['app-version'] = store.state.common.appVersion

  api.fetch.setHeaders(headers)
}

window.addEventListener('resize', function () {
  if (window.innerWidth < 768) {
    store.commit(types.SET_MOBILE_VERSION, true)
  } else {
    store.commit(types.SET_MOBILE_VERSION, false)
  }
})

const cookie_date = new Date ( )
cookie_date.setTime ( cookie_date.getTime() - 1 )
document.cookie = `payment_domen=https://www-dev2.domovenok.su;path=/;domain=.domovenok.su;expires=${cookie_date.toGMTString()}`

store.dispatch('loadPage')
