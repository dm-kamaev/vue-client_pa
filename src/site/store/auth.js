import types from '@/store/types'
import api from 'vue_components/src/api'

const resetState = function () {
  window.store.replaceState(JSON.parse(JSON.stringify(window.initialStateCopy)))
}

const state = {
  loggedIn: false
}

const mutations = {
  [types.SIGN_OUT](state) {
    state.loggedIn = false
  },

  [types.SIGN_IN](state) {
    state.loggedIn = true
  }
}

const actions = {
  async signOut({ dispatch }) {

    await api.auth.logout()

    dispatch('cleanCookies')

    resetState()
  },

  async signIn({ commit, dispatch }) {
    commit(types.SIGN_IN)

    await dispatch('loadSettings')
  }
}

export default {
  state,
  mutations,
  actions
}
