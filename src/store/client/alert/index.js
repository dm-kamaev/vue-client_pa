import types from '@/store/types'
import Vue from 'vue'
import api from 'vue_components/src/api'

function generateKey() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

const state = {
  show: false,
  components: {},
  stable: false
}

const mutations = {
  [types.SHOW_ALERT](state, { view, text, timer, type, html, actions, key }) {
    if (!key) {
      key = generateKey()
    }

    if (!timer) {
      state.stable = true
    }

    if (Object.keys(state.components).length === 0) {
      state.show = true
    }

    Vue.set(state.components, key, {
      view,
      text,
      timer,
      type,
      key,
      html,
      actions
    })
  },

  [types.CLOSE_ALERT](state, key) {
    const arr = Object.keys(state.components)

    if (arr.length <= 1) {
      state.show = false
    }

    if (arr.length) {
      let view = false

      for (let key in state.components) {
        if (!state.components[key].timer) {
          view = true
        }
      }

      if (!view) {
        state.stable = false
      }
    }

    Vue.delete(state.components, key)

    if (!Object.keys(state.components).length) {
      state.stable = false
    }
  }
}

const actions = {
  async getNotifications({ commit, dispatch, rootState }) {
    const data = await api.common.getNotifications({clientId: rootState.client.clientId})

    data.forEach((item) => {
      commit(types.SHOW_ALERT, {
        view: 'notification',
        key: item.notificationId,
        html: item.html,
        text: item.text,
        actions: item.actions,
        type: 'message'
      })

      if (rootState.common.isSite) {
        let event = document.createEvent('Event');
        event.initEvent('show-notification', true, true);
        event.detail = {
          view: 'notification',
          key: item.notificationId,
          html: item.html,
          text: item.text,
          actions: item.actions,
          type: 'message'
        };
        document.dispatchEvent(event);
      }

      window.addEventListener('close-notification', (e) => {
        dispatch('sendActionOnNotification', {key: e.detail.key, actionName: 'close'})
      })
    })
  },

  async sendActionOnNotification({ commit, rootState }, {key, actionName}) {
    try {
      await api.common.sendActionOnNotification({
        clientId: rootState.client.clientId,
        notificationId: key,
        actionName: actionName
      })

      commit(types.CLOSE_ALERT, {
        key: key
      })
    } catch (error) {

    }
  }
}

export default {
  state,
  mutations,
  actions
}
