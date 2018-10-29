import HandleErr from '@/lib/HandleErr'
import types from '@/store/types'

const apiUrl = function () {
  if (process.env.NODE_ENV === 'app') return 'https://www.domovenok.su'

  const path = window.location.origin

  if (path) {
    if (path.search( /spb/i )) {
      return path.replace('spb', 'www')
    }

    if (path.search( /nn/i )) {
      return path.replace('nn', 'www')
    }
  }
}

const devUrl = function () {
  const path = window.location.origin

  if (path) {
    if (path.search( /dev/i )) {
      return true
    }
  }

  return false
}

function isMobile() {
  return window.innerWidth < 768
}

const state = {
  loading: false,
  isApp: process.env.NODE_ENV === 'app',
  isSite: process.env.NODE_ENV === 'site',
  apiUrl: apiUrl(),
  appVersion: 2,
  isMobile: isMobile(),
  cookies: [
    { name: 'A' },
    { name: 'B' },
    { name: 'status' },
    { name: 'x-dom-Authorization' }
  ],
  oldView: false,
  showMenu: true
}

const mutations = {
  [types.OLD_PAGE_VIEW](state, value) {
    state.oldView = value
  },

  [types.SET_MOBILE_VERSION](state, value) {
    state.isMobile = value
  },

  [types.SHOW_MENU](state) {
    state.showMenu = true
  },

  [types.HIDE_MENU](state, value) {
    state.showMenu = false
  },
}

const actions = {
  setCookies({ commit }, cookies) {
    cookies.forEach((item) => {
      localStorage.setItem(item.name, item.value);
    });
  },

  cleanCookies({ state }) {
    state.cookies.forEach((item) => {
      localStorage.removeItem(item.name);
    });
  },

  setPageOldView({state, commit}, value) {
    if (state.oldView !== value) {
      const page = document.querySelector('.page')

      if (value) {
        page.classList.add('page--old-view')
      } else {
        page.classList.remove('page--old-view')
      }

      commit(types.OLD_PAGE_VIEW, value)
    }
  },

  defineError({ commit, rootState }, obj) {
    if (obj.error.error.code === 1 || obj.error.error.code === -3) {
      commit(types.SIGN_OUT)
    } else {
      if (!devUrl()) {
        HandleErr.send({
          path: __filename+`:${obj.name}`,
          error: obj.error,
          cookies: document.cookie
        });
      }
    }
  },

  async loadPage({ state, dispatch, rootState }) {
    state.loading = true

    await dispatch('signIn')

    state.loading = false

    if (state.isApp) {
      navigator.splashscreen.hide();
    }
  }
}

export default {
  state,
  actions,
  mutations
}
