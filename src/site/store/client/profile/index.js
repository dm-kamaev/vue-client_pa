import types from '@/store/types'
import api from 'vue_components/src/api'

const state = {
  name: '',
  surname: '',
  contacts: []
}

const mutations = {
  [types.SET_CONTACT_INFO](state, contacts) {
    state.contacts = contacts
  }
}

const actions = {
  async getContactInfo({commit, dispatch, rootState}) {
    try {
      const contacts = await api.client.getContactInfo()

      commit(types.SET_CONTACT_INFO, contacts)

      if (contacts.length) {
        const exist = contacts.some((item) => {
          return item.type === 'mail'
        })

        rootState.client.needEmail = !exist
      }
    } catch (error) {
      dispatch('defineError', {
        error: error,
        name: 'getContactInfo',
        params: {}
      })
    }
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
