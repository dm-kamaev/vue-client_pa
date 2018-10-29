import Vue from 'vue'
import Vuex from 'vuex'
import types from './types'

import client from './client'
import employee from './employee'
import auth from './auth'
import settings from './settings'
import common from './common'
import services from './common/services'
import order from './order'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},

  mutations: {},

  actions: {},

  modules: {
    client,
    employee,
    auth,
    common,
    settings,
    services,
    order
  }
})

export { types }
