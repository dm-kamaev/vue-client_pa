import types from '@/store/types'
import api from 'vue_components/src/api'

const state = {
  loading: false,
  loaded: false,
  error: false
}

const mutations = {
  [types.LOAD_SETTINGS_START](state) {
    state.loading = true
    state.error = false
  },

  [types.LOAD_SETTINGS_SUCCESS](state) {
    state.loading = false
    state.loaded = true
  },

  [types.LOAD_SETTINGS_ERROR](state) {
    state.loading = false
    state.error = true
  },
};

const actions = {
  async loadSettings({ state, commit, dispatch, rootState }) {
    if (state.loaded) return

    commit(types.LOAD_SETTINGS_START)

    if (!rootState.client.clientId && !rootState.employee.employeeId) {
     try {
       const { clientId, employeeId } = await api.auth.getAuthData()

       if (clientId) {
         commit(types.SET_CLIENT_ID, { clientId })
       }

       if (employeeId) {
         commit(types.SET_EMPLOYEE_ID, { employeeId })
       }
     } catch (error) {
       if (rootState.common.isSite) {
         commit(types.LOAD_SETTINGS_ERROR)
       }

       dispatch('defineError', {
         error: error,
         name: 'getAuthData',
         params: {}
       })
     }
    }

    if (rootState.common.isApp) {
      if (!rootState.client.clientId && rootState.client.employeeId) {
        commit(types.SIGN_OUT)
      }
    }

    if (!rootState.common.isApp && !rootState.common.isSite) {
      if (!rootState.client.clientId && rootState.client.employeeId) {
        window.location = '/staff'
      }
    }

    if (rootState.client.clientId) {
      try {
        await dispatch('getClientCommon')

      } catch (error) {
        commit(types.LOAD_SETTINGS_ERROR)

        dispatch('defineError', {
          error: error,
          name: 'loadSettings'
        })
      }

      try {
        await dispatch('fetchBalance')
        await dispatch('getNotifications')
        await dispatch('getContactInfo')

        if (rootState.client.addCards) {
          await dispatch('getCardList')
        }
      } catch (error) {
        dispatch('defineError', {
          error: error,
          name: 'loadSettings',
          params: {}
        })
      }

      commit(types.LOAD_SETTINGS_SUCCESS)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
