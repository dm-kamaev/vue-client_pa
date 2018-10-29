import types from '@/store/types'
import api from 'vue_components/src/api'
import { arrayToMap } from '@/store/utils'
import payments from './payments'
import profile from './profile'
import orders from './orders'
import alert from './alert'
import router from '@/site/router'
import transform from '@/utils/transform'
import moment from 'moment'
import HandleErr from '@/lib/HandleErr'

const state = {
  clientId: null,
  fullTitle: '',
  name: '',
  addCards: false,
  needEmail: false,
  currentObject: null,
  currentOrder: null,
  isInitialized: null,
  objects: {},
  reviewsRatingData: {
    reviewsRating: null,
    numberOfReviews: null,
    numberOfOrders: null
  }
}

const mutations = {
  [types.SET_CLIENT_ID](state, { clientId }) {
    state.clientId = clientId
    api.client.setId(clientId)

    HandleErr.setUserId(clientId)
  },

  [types.SET_CURRENT_OBJECT](state, { objectId }) {
    state.currentObject = objectId
  },

  [types.SET_CURRENT_ORDER](state, { orderId }) {
    state.currentOrder = orderId
  },

  [types.SET_CLIENT_INFO](state, info) {
    for (let key in info) {
      if (key === 'objects') {
        continue
      }

      state[key] = info[key]
    }

    state.isInitialized = info.isClientInitialized

    if (state.isInitialized) {
      state.objects = arrayToMap(info.objects, 'objectId')
    }
  }
}

const actions = {
  async getClientCommon({ state, commit, dispatch, rootState }) {
    if (!state.clientId) {
      return
    }

    try {
      const data = await api.client.getCommon()

      commit(types.SET_CLIENT_INFO, data)

      if (data.isClientInitialized) {
        if (data.departureIDNotReviewed && window.location.pathname.search(/order/i) === -1) {
          router.replace({ path: `/adr${transform(data.objects[0].objectId)}/ord${transform(data.departureIDNotReviewed)}#review` })
        }

        if (rootState.common.isApp) {
          router.replace({ path: `/adr${transform(data.objects[0].objectId)}` })
        }

        if (window.location.pathname === '/private/auth' || window.location.pathname === '/private/' || window.location.pathname === '/private' || window.location.pathname.search(/info/i) !== -1) {
          // if (rootState.common.isMobile) {
          //   router.replace({ path: `/adr${transform(data.objects[0].objectId)}` })
          // } else {
          //   if (data.objects[0].departureId) {
          //     router.replace({ path: `/adr${transform(data.objects[0].objectId)}/ord${transform(data.objects[0].departureId)}` })
          //   }
          // }

          router.replace({ path: `/adr${transform(data.objects[0].objectId)}` })
        }

        if (window.location.pathname === '/private/bind-card-error') {
          if (localStorage.redirect) {
            let path = window.localStorage.redirect.split('/')

            if (path[2] && path[3]) {
              router.replace({ path: `/${path[2]}/${path[3]}` })
            } else {
              router.replace({ path: `/${path[2]}` })
            }
          } else {
            router.replace({ path: `/psm${moment().format('ggggMM')}` })
          }

          localStorage.removeItem('redirect');
          commit(types.SHOW_ALERT, { view: 'message', text: `Произошла ошибка при попытке привязки карты`, timer: 6000, type: 'error' })
        }

        if (window.location.pathname === '/private/bind-card-success') {
          if (localStorage.redirect) {
            let path = window.localStorage.redirect.split('/')

            if (path[2] && path[3]) {
              router.replace({ path: `/${path[2]}/${path[3]}` })
            } else {
              router.replace({ path: `/${path[2]}` })
            }
          } else {
            router.replace({ path: `/psm${moment().format('ggggMM')}` })
          }


          await api.client.completeAddCard()

          localStorage.removeItem('redirect');

          if (window.localStorage.sum) {
            commit(types.SHOW_ALERT, { view: 'message', text: `Баланс был успешно пополнен`, timer: 6000, type: 'success' })
            localStorage.removeItem('sum')
          } else {
            commit(types.SHOW_ALERT, { view: 'message', text: `Карту привязали успешно`, timer: 6000, type: 'success' })
          }
        }

        if (window.location.pathname === '/private/payment-success') {
          if (localStorage.redirect) {
            let path = window.localStorage.redirect.split('/')

            if (path[2] && path[3]) {
              router.replace({ path: `/${path[2]}/${path[3]}` })
            } else {
              router.replace({ path: `/${path[2]}` })
            }
          } else {
            router.replace({ path: `/psm201807` })
          }

          localStorage.removeItem('redirect')

          if (window.localStorage.sum) {
            commit(types.SHOW_ALERT, { view: 'message', text: `Баланс был успешно пополнен`, timer: 6000, type: 'success' })
            localStorage.removeItem('sum')
          } else {
            commit(types.SHOW_ALERT, { view: 'message', text: `Заказ был успешно оплачен`, timer: 6000, type: 'success' })
          }
        }
      } else {
        if (window.location.pathname.search(/order/i) === -1) {
          router.replace({ path: `/order` })
        }
      }
    } catch(error) {
      dispatch('defineError', {
        error: error,
        name: 'getCommon'
      })

      commit(types.SIGN_OUT)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  modules: {
    payments,
    profile,
    orders,
    alert
  }
}
