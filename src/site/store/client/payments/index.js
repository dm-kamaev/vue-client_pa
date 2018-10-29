import moment from 'moment'
import Vue from 'vue'
import types from '@/store/types'
import api from 'vue_components/src/api'

const state = {
  history: {},
  loading: {},
  loaded: {},
  error: {},
  balance: 0,
  bonus: 0,
  cardDebt: 0,
  cards: {
    entities: {},
    loading: false,
    loaded: false,
    error: false
  },
  balanceLoaded: false,
  balanceLoading: false,
  balanceError: false
}

function keyByMonth(month) {
  return moment(month).format('YYYYMM')
}

const mutations = {
  [types.PAYMENTS_HISTORY_REQUEST](state, month) {
    const key = keyByMonth(month)

    Vue.set(state.loading, key, true)
    Vue.set(state.error, key, false)
  },

  [types.PAYMENTS_HISTORY_SUCCESS](state, { month, history }) {
    const key = keyByMonth(month)

    Vue.set(state.loading, key, false)
    Vue.set(state.loaded, key, true)
    Vue.set(state.error, key, false)
    Vue.set(state.history, key, history)
  },

  [types.PAYMENTS_HISTORY_ERROR](state, month) {
    const key = keyByMonth(month)

    Vue.set(state.loading, key, false)
    Vue.set(state.error, key, true)
  },

  [types.BALANCE_REQUEST](state) {
    state.balanceLoading = true
    state.balanceError = false
  },

  [types.BALANCE_SUCCESS](state, { balance, bonusPoints, amountNotDeductedFromCard }) {

    state.balanceLoading = false
    state.balanceLoaded = true

    state.balance = balance
    state.bonus = bonusPoints
    state.cardDebt = amountNotDeductedFromCard
  },

  [types.BALANCE_ERROR](state) {
    state.balanceLoading = false
    state.balanceError = true
  },

  [types.REMOVE_PAYMENT_CARD](state, { key }) {
    Vue.delete(state.cards.entities, key)
  },

  [types.PAYMENT_CARDS_LIST_SUCCESS](state, { list }) {
    list.forEach((item) => {
      if (!(item.cardId in state.cards.entities)) {
        Vue.set(state.cards.entities, item.cardId, item)
      }
    })

    state.cards.loading = false
    state.cards.loaded = true
    state.cards.error = false
  },

  [types.PAYMENT_CARDS_LIST_REQUEST](state) {
    state.cards.loading = true
    state.cards.loaded = false
    state.cards.error = false
  },

  [types.PAYMENT_CARDS_LIST_ERROR](state) {
    state.cards.loading = false
    state.cards.loaded = false
    state.cards.error = true
  }
}

const actions = {
  async fetchPaymentsHistory({ state, commit, dispatch }, month) {
    const key = keyByMonth(month)

    if (state.loading[key]) return

    commit(types.PAYMENTS_HISTORY_REQUEST, month)

    try {
      const history = await api.client.getPaymentsHistory(month)

      commit(types.PAYMENTS_HISTORY_SUCCESS, { month, history })
    } catch (error) {
      dispatch('defineError', {
        error: error,
        name: 'fetchPaymentsHistory',
        params: month
      })

      commit(types.PAYMENTS_HISTORY_ERROR, month)
    }

    dispatch('fetchBalance')
  },

  async fetchBalance({ state, commit, dispatch }) {
    if (state.balanceLoading) return

    commit(types.BALANCE_REQUEST)

    try {
      const { balance, bonusPoints, amountNotDeductedFromCard } = await api.client.getBalance()

      commit(types.BALANCE_SUCCESS, { balance, bonusPoints, amountNotDeductedFromCard })
      if (amountNotDeductedFromCard > 0) {
        commit(types.SHOW_ALERT, { view: 'paymentDebt', type: 'error' })
      }
    } catch (error) {
      dispatch('defineError', {
        error: error,
        name: 'fetchBalance',
        params: {}
      })

      commit(types.BALANCE_ERROR)
    }
  },

  async removeCard({ state, commit, dispatch }, key) {
    const params = {
      cardId: key
    }

    try {
      const { result } = await api.client.removeCard(params)

      if (result) {
        commit(types.REMOVE_PAYMENT_CARD, { key })
      }

    } catch (error) {
      dispatch('defineError', {
        error: error,
        name: 'removeCard',
        params: params
      })
    }
  },

  async getCardList({ commit, dispatch }) {
    commit(types.PAYMENT_CARDS_LIST_REQUEST)

    try {
      const list = await api.client.getCardList()

      commit(types.PAYMENT_CARDS_LIST_SUCCESS, { list })
    } catch (error) {
      dispatch('defineError', {
        error: error,
        name: 'getCardList',
        params: {}
      })

      commit(types.PAYMENT_CARDS_LIST_ERROR)
    }
  },

  async addCard({ state, commit, dispatch, rootState}, orderId) {
    const params = {}

    if (orderId) {
      params.departureId = orderId
    }

    try {
      const { paymentUrl } = await api.client.addPaymentCard(params)

      if (!rootState.common.isApp) {
        localStorage.setItem('redirect', window.location.pathname);
        window.location = paymentUrl
      } else {
        let ref = cordova.InAppBrowser.open(paymentUrl, '_blank', 'location=yes')

        ref.addEventListener('loadstart', (e) => {
          const success = /bind-card-success/.test(e.url)
          const error = /bind-card-error/.test(e.url)

          if (success || error) {
            ref.close();

            if (success) {
              dispatch('getCardList')
              commit(types.SHOW_ALERT, { view: 'message', text: 'Карта была успешно привязана' , timer: 3000, type: 'success' })
            }

            if (error) {
              commit(types.SHOW_ALERT, { view: 'message', text: 'Произошла ошибка при попытке привязать карту' , timer: 3000, type: 'error' })
            }
          }
        })
      }
    } catch (error) {
      dispatch('defineError', {
        error: error,
        name: 'addCard',
        params: params
      })

      commit(types.SHOW_ALERT, { view: 'message', text: 'Произошла ошибка при попытке привязать карту' , timer: 3000, type: 'error' })
    }
  },

  async addPayment({ state, commit, dispatch, rootState}, { orderId, recurrent, sum }) {
    const params = {
      recurrent: false
    }

    if (orderId) {
      params.departureId = orderId
    }

    if (recurrent) {
      params.recurrent = recurrent
    }

    if (sum) {
      params.sum = sum
    }

    try {
      const { paymentUrl } = await api.client.addPayment(params)

      if (!rootState.common.isApp) {
        localStorage.setItem('redirect', window.location.pathname);

        if (sum) {
          localStorage.setItem('sum', sum);
        }

        window.location = paymentUrl
      } else {
        let ref = cordova.InAppBrowser.open(paymentUrl, '_blank', 'location=yes')

        ref.addEventListener('loadstart', (e) => {
          const success = /bind-card-success/.test(e.url)
          const error = /bind-card-error/.test(e.url)

          if (success || error) {
            ref.close();

            if (success) {
              if (sum) {
                commit(types.SHOW_ALERT, { view: 'message', text: 'Баланс был успешно пополнен' , timer: 3000, type: 'success' })
              } else {
                commit(types.SHOW_ALERT, { view: 'message', text: 'Оплата прошла успешно' , timer: 3000, type: 'success' })
              }
            }

            if (error) {
              commit(types.SHOW_ALERT, { view: 'message', text: 'Произошла ошибка при попытке оплаты' , timer: 3000, type: 'error' })
            }
          }
        })
      }
    } catch (error) {
      dispatch('defineError', {
        error: error,
        name: 'addPayment',
        params: params
      })

      commit(types.SHOW_ALERT, { view: 'message', text: 'Произошла ошибка при попытке оплаты' , timer: 3000, type: 'error' })
    }
  },

  async getInvoiceForCurrentBalance({ state, commit, dispatch, rootState}) {

    try {
      const { paymentUrl } = await api.client.getInvoiceForCurrentBalance()

      if (!rootState.common.isApp) {
        localStorage.setItem('redirect', window.location.pathname);
        window.location = paymentUrl
      } else {
        let ref = cordova.InAppBrowser.open(paymentUrl, '_blank', 'location=yes')

        ref.addEventListener('loadstart', (e) => {
          const success = /bind-card-success/.test(e.url)
          const error = /bind-card-error/.test(e.url)

          if (success || error) {
            ref.close();

            if (success) {
              commit(types.SHOW_ALERT, { view: 'message', text: 'Оплата прошла успешно' , timer: 3000, type: 'success' })
            }

            if (error) {
              commit(types.SHOW_ALERT, { view: 'message', text: 'Произошла ошибка при оплате' , timer: 3000, type: 'error' })
            }
          }
        })
      }
    } catch (error) {
      dispatch('defineError', {
        error: error,
        name: 'addPayment',
        params: {}
      })

      commit(types.SHOW_ALERT, { view: 'message', text: 'Произошла ошибка при попытке оплаты' , timer: 3000, type: 'error' })
    }
  }
}

const getters = {
  paymentsHistoryLoading: state => month => state.loading[keyByMonth(month)],

  paymentsHistoryLoaded: state => month => state.loaded[keyByMonth(month)],

  paymentsHistoryError: state => month => state.error[keyByMonth(month)],

  paymentsHistory: state => month => {
    const history = state.history[keyByMonth(month)]
    const { payment } = history
    const paymentSum = Object.keys(payment).reduce((result, key) => result + payment[key], 0)

    return {
      paymentSum,
      ...history
    }
  },

  paymentCards: state => {
    const list = []

    for (let key in state.cards.entities) {
      list.push(state.cards.entities[key])
    }

    return list
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
