import types from '@/store/types'
import Vue from 'vue'
import getJson from '@/components/calculator/utils/getJson'
import api from 'vue_components/src/api'
import router from '@/site/router'
import analytic from '@/store/common/analytic'
import transform from '@/utils/transform'

const state = {
  addition: {
    controllers: {},
    services: {},
    countServices: {}
  },
  window: {
    service: {},
    services: {},
    controllers: {}
  },
  wetCleaning: {
    service: {}
  },
  mainService: {
    id: '',
    schedule: '0x_week',
    services: {},
    square: '',
    controllers: {},
    addition: {}
  },
  town: '',
  date: null,
  price: {
    loading: false,
    loaded: false,
    error: false,
    discount: null,
    value: null
  },
  timeZone: '+03:00',
  currentView: null,
  serviceId: null,
  orderId: null,
  objectId: null,
  services: null,
  address: {
    street: {
      geoObject: {},
      value: ''
    },
    flat: '',
    floor: '',
    intercom: '',
    porch: '',
  },
  sidebar: {},
  getContactOrder: false,
  viewList: [],
  firstLoad: false,
  buttonOrder: false,
  path: null,
  progress: {
    loading: false,
    error: false,
    pathSuccess: null
  }
}

const mutations = {
  [types.ORDER_SET_VIEW_LIST](state, value) {
    state.viewList = value
  },

  [types.ORDER_SET_TOWN](state, value) {
    state.town = value
  },

  [types.ORDER_SET_SERVICE_ID](state, value) {
    state.serviceId = value
  },

  [types.ORDER_SET_DATE](state, value) {
    state.date = value
  },

  [types.ORDER_SET_PRICE](state, { value, discount }) {
    Vue.set(state.price, 'value', value)
    Vue.set(state.price, 'discount', discount)
  },

  [types.ORDER_PRICE_LOADING](state) {
    Vue.set(state.price, 'loaded', false)
    Vue.set(state.price, 'loading', true)
    Vue.set(state.price, 'error', false)
  },

  [types.ORDER_PRICE_LOADED](state) {
    Vue.set(state.price, 'loaded', true)
    Vue.set(state.price, 'loading', false)
    Vue.set(state.price, 'error', false)
  },

  [types.ORDER_PRICE_ERROR](state) {
    Vue.set(state.price, 'loaded', false)
    Vue.set(state.price, 'loading', false)
    Vue.set(state.price, 'error', true)

    Vue.set(state.price, 'value', null)
    Vue.set(state.price, 'discount', null)
  },

  [types.ORDER_SET_CURRENT_VIEW](state, value) {
    state.currentView = value
  },

  [types.ORDER_SET_OBJECT_ID](state, value) {
    state.objectId = value
  },

  [types.ORDER_SET_ORDER_ID](state, value) {
    state.orderId = value
  },

  [types.ORDER_SET_SERVICES](state, value) {
    state.services = value
  },

  [types.ORDER_SET_ADDRESS](state, { key, value }) {
    Vue.set(state.address, key, value)
  },

  [types.ORDER_SET_ADDRESS_STREET](state, { key, value }) {
    Vue.set(state.address.street, key, value)
  },

  [types.ORDER_SET_SERVICE](state, { key, value }) {
    Vue.set(state.service, key, value)
  },

  [types.ORDER_SET_ADDITION](state, { key, value }) {
    Vue.set(state.addition, key, value)
  },

  [types.ORDER_SET_WINDOW](state, { key, value }) {
    Vue.set(state.window, key, value)
  },

  [types.ORDER_SET_WET_CLEANING](state, { key, value }) {
    Vue.set(state.wetCleaning, key, value)
  },

  [types.ORDER_SET_MAIN_SERVICE](state, { key, value }) {
    Vue.set(state.mainService, key, value)
  },

  [types.ORDER_LOADING](state) {
    Vue.set(state.progress, 'loading', true)
    Vue.set(state.progress, 'loaded', false)
    Vue.set(state.progress, 'error', false)
  },

  [types.ORDER_LOADED](state) {
    Vue.set(state.progress, 'loading', false)
    Vue.set(state.progress, 'loaded', true)
    Vue.set(state.progress, 'error', false)
  },

  [types.ORDER_ERROR](state) {
    Vue.set(state.progress, 'loading', false)
    Vue.set(state.progress, 'loaded', false)
    Vue.set(state.progress, 'error', true)
  }
}

const actions = {

  async getOrderPrice({ state, commit, getters, dispatch, rootState}) {
    commit(types.ORDER_PRICE_LOADING)
    const schedule = state.mainService.schedule ? state.mainService.schedule : '0x_week'

    const params = {
      "city": state.town,
      "schedule": schedule,
      "services": getJson(
        getters.servicesArray
      )
    }

    if (state.date) {
      params.date = state.date
      params.timeZone = state.timeZone
    }

    try {
      const data = await api.client.calculateOrder(params)

      const arr = []

      data[schedule].services.forEach((item) => {
        let serviceTitle = null

        if (item.serviceId in rootState.services.objectServices) {
          serviceTitle = rootState.services.objectServices[item.serviceId].title
        }

        item.classes.forEach((item) => {
          if (item.classId === 'space' || item.classId === 'window_space') {

            if (serviceTitle && state.mainService.square) {
              serviceTitle = `${serviceTitle} ${state.mainService.square}м2`
            }
          } else {
            if (Object.keys(state.addition.services).length) {
              if (state.addition.countServices[item.classId]) {
                arr.push(`${rootState.services.objectClasses[item.classId].title} x ${state.addition.countServices[item.classId]}`)
              }
            }

            if (Object.keys(state.window.services).length) {
              if (state.window.countServices[item.classId]) {
                arr.push(`${rootState.services.objectClasses[item.classId].title} x ${state.window.countServices[item.classId]}`)
              }
            }
          }
        })

        if (serviceTitle) {
          arr.unshift(serviceTitle)
        }
      })

      commit(types.ORDER_SET_SERVICES, arr)
      commit(types.ORDER_SET_PRICE, {value: data[schedule].totalAmount, discount: data[schedule].amountWithDiscount})
      commit(types.ORDER_PRICE_LOADED)
    } catch (error) {
      commit(types.ORDER_PRICE_ERROR)

      dispatch('defineError', {
        error: error,
        name: 'calculateOrder'
      })
    }

    dispatch('updateLocalStore')
  },

  async sendOrder({ state, commit, getters, dispatch, rootState}) {
    commit(types.ORDER_LOADING)
    const params = {}

    if (!state.getContactOrder) {
      if (state.orderId) {
        params.objectId = state.objectId
        params.departureId = state.orderId
        params.date = state.date
        params.timeZone = state.timeZone

        try {
          const { data, result } = await api.client.repeatOrder(params)

          if (result) {
            if (state.objectId && data.departureId) {
              state.progress.pathSuccess = `${window.location.origin}/private/adr${transform(state.objectId)}/ord${transform(data.departureId)}`
            }
          }

          commit(types.ORDER_LOADED)
          analytic.sendEvent({name: "form", value: "order_new_repeat_success", ga_action: "open"}, ['ga', 'af', 'fb'])
        } catch(error) {
          commit(types.ORDER_ERROR)

          dispatch('defineError', {
            error: error,
            name: 'newOrder'
          })

          analytic.sendEvent({name: "form", value: "order_new__repeat_fail", ga_action: "open"}, ['ga', 'af', 'fb'])
        }
      } else {
        params.services = getJson(
          getters.servicesArray
        )

        if (state.date) {
          params.date = state.date
          params.timeZone =  state.timeZone
        }

        if (state.objectId) {
          params.objectId = state.objectId
        } else {
          params.city = state.town

          params.address = {
            addressJson: JSON.stringify({
              GeoObject: state.address.street.geoObject
            }),
            title: state.address.street.value,
            house: state.address.house,
            flat: state.address.flat,
            floor: state.address.floor,
            porch: state.address.porch,
            intercom: state.address.intercom
          }
        }

        if (state.phone) {
          params.phone = state.phone
          params.name = state.name
        }

        try {
          const { data, result }= await api.client.newOrder(params)

          if (result) {
            if (data) {
              if (data.departureId) {
                state.progress.pathSuccess = `${window.location.origin}/private/`
              }

              if (data.objectId && data.departureId) {
                state.progress.pathSuccess = `${window.location.origin}/private/adr${transform(data.objectId)}/ord${transform(data.departureId)}`
              }
            }
          }

          commit(types.ORDER_LOADED)
          analytic.sendEvent({name: "form", value: "order_new_success", ga_action: "open"}, ['ga', 'af', 'fb'])
        } catch(error) {
          commit(types.ORDER_ERROR)
          analytic.sendEvent({name: "form", value: "order_new_fail", ga_action: "open"}, ['ga', 'af', 'fb'])

          dispatch('defineError', {
            error: error,
            name: 'newOrder'
          })
        }
      }
    } else {
      if (state.phone) {
        params.phone = state.phone
        params.name = state.name
      }

      try {
        if (!rootState.client.clientId) {
          await api.common.sendContactInfo(params)
        } else {
          await api.client.postCallBack()
        }

        commit(types.ORDER_LOADED)
        analytic.sendEvent({name: "form", value: "order_new_contact_success", ga_action: "open"}, ['ga', 'af', 'fb'])
      } catch(error) {
        commit(types.ORDER_ERROR)
        analytic.sendEvent({name: "form", value: "order_new_contact_fail", ga_action: "open"}, ['ga', 'af', 'fb'])

        dispatch('defineError', {
          error: error,
          name: 'newOrder'
        })
      }
    }
  },

  sendContacts({ state, commit, dispatch, rootState}) {
    state.getContactOrder = true
    const newArr = state.viewList.slice(0, state.viewList.indexOf(state.currentView) + 1)

    if (!rootState.client.clientId) {
      newArr.push('contacts')
      newArr.push('info')

    } else {
      newArr.push('info')
    }

    commit(types.ORDER_SET_VIEW_LIST, newArr)
    dispatch('orderNextStep')
  },

  setMainService({ state, commit, dispatch}, obj) {
    for (let key in obj) {
      commit(types.ORDER_SET_MAIN_SERVICE, { key: key, value: obj[key]})
    }

    dispatch('getOrderPrice')
  },

  setAddition({ state, commit, dispatch}, obj) {
    for (let key in obj) {
      commit(types.ORDER_SET_ADDITION, { key: key, value: obj[key]})
    }

    dispatch('getOrderPrice')
  },

  setWindow({ state, commit, dispatch}, obj) {
    for (let key in obj) {
      commit(types.ORDER_SET_WINDOW, { key: key, value: obj[key]})
    }

    dispatch('getOrderPrice')
  },

  setAddress({ state, commit, dispatch}, obj) {
    for (let key in obj) {
      if (key === 'street') {
        for (let item in obj[key]) {
          commit(types.ORDER_SET_ADDRESS_STREET, { key: item, value: obj[key][item]})
        }
      } else {
        commit(types.ORDER_SET_ADDRESS, { key: key, value: obj[key]})
      }
    }

    dispatch('updateLocalStore')
  },

  orderNextStep({ state, commit, dispatch }) {
    if (state.currentView === 'history') {
      if (state.objectId) {
        if (state.orderId) {
          commit(types.ORDER_SET_VIEW_LIST, [ 'history', 'time', 'info' ])
        } else {
          commit(types.ORDER_SET_VIEW_LIST, [ 'history', 'service', 'addition', 'time', 'info' ])
        }
      } else {
        if (state.town) {
          if (state.serviceId) {
            commit(types.ORDER_SET_VIEW_LIST, ['history', 'service', 'addition', 'time', 'address', 'info'])
          } else {
            commit(types.ORDER_SET_VIEW_LIST, ['history', 'services', 'service', 'addition', 'time', 'address', 'info'])
          }
        } else {
          commit(types.ORDER_SET_VIEW_LIST, ['history', 'town', 'services', 'service', 'addition', 'time', 'address', 'info'])
        }
      }
    }

    if (state.currentView === 'service') {
      if (Object.keys(state.mainService.addition).length) {
        for (let key in state.mainService.addition) {
          if (key === 'window_cleaning' && state.mainService.addition[key].value && state.viewList.indexOf('window') === -1) {
            const index = state.viewList.indexOf('addition') + 1
            const arr = state.viewList

            arr.splice(index, 0, 'window')
            commit(types.ORDER_SET_VIEW_LIST, arr)
          }
        }
      }
    }

    if (state.currentView) {
      if (state.viewList.length !== state.viewList.indexOf(state.currentView) + 1) {
        commit(types.ORDER_SET_CURRENT_VIEW, state.viewList[state.viewList.indexOf(state.currentView) + 1])
        router.push(`/order/${state.currentView}`)
      }

      if (state.viewList.length === state.viewList.indexOf(state.currentView) + 2) {
        state.buttonOrder = true
      }

      if (state.viewList.length === state.viewList.indexOf(state.currentView) + 1) {
        dispatch('sendOrder')
      }
    } else {
      commit(types.ORDER_SET_CURRENT_VIEW, state.viewList[state.viewList.indexOf(state.viewList[0])])
      router.push(`/order/${state.currentView}`)
    }

    dispatch('updateLocalStore')
    window.scrollTo(0, 0)
  },

  initOrderRoute({ state, commit, dispatch}, { path, town, service }) {
    if ('order-story' in localStorage) {
      const historyState = JSON.parse(localStorage['order-story'])

      if (path === `/order/${historyState.currentView}` && (historyState.viewList.length - 1 !== historyState.viewList.indexOf(historyState.currentView))) {
        for (let key in state) {
          if (historyState[key]) {
            Vue.set(state, key, historyState[key])
          }
        }

        router.replace(`/order/${historyState.currentView}`)
      } else {
        if (town) {
          commit(types.ORDER_SET_TOWN, town)
        }

        if (service) {
          commit(types.ORDER_SET_SERVICE_ID, service)
        }

        dispatch('getOrderViewList')
        router.replace(`/order/${state.viewList[0]}`)
      }
    } else {
      if (town) {
        commit(types.ORDER_SET_TOWN, town)
      }

      if (service) {
        commit(types.ORDER_SET_SERVICE_ID, service)
      }

      dispatch('getOrderViewList')
      router.replace(`/order/${state.viewList[0]}`)
    }
  },

  getOrderViewList({ state, commit, rootState}) {
    if (rootState.client.clientId) {
      if (rootState.client.isInitialized && Object.keys(rootState.client.objects).length) {
        commit(types.ORDER_SET_VIEW_LIST, [ 'history', 'time', 'info' ])

        return
      }

      if (state.town) {
        if (state.serviceId) {
          commit(types.ORDER_SET_VIEW_LIST, [ 'service', 'addition', 'time', 'address', 'info' ])

          return
        }

        commit(types.ORDER_SET_VIEW_LIST, [ 'services', 'service', 'addition', 'time', 'address', 'info' ])

        return
      }

      commit(types.ORDER_SET_VIEW_LIST, [ 'town', 'services', 'service', 'addition', 'time', 'address', 'info' ])
    } else {
      if (state.town) {
        if (state.service) {
          commit(types.ORDER_SET_VIEW_LIST, [ 'contacts', 'service', 'addition', 'time', 'address', 'info' ])

          return
        }

        commit(types.ORDER_SET_VIEW_LIST, [ 'contacts', 'services', 'service', 'addition', 'time', 'address', 'info' ])
        return
      }

      commit(types.ORDER_SET_VIEW_LIST, [ 'contacts', 'town', 'services', 'service', 'addition', 'time', 'address', 'info' ])
    }
  },

  orderPrevStep({ state, dispatch, commit, rootState }) {
    if (state.viewList[state.viewList.indexOf(state.currentView) - 1] === 'history') {
      commit(types.ORDER_SET_TOWN, '')
      commit(types.ORDER_SET_SERVICE_ID, null)
    }

    if (state.viewList.indexOf(state.currentView) === 0) {
      if (rootState.common.isSite) {
        if (state.path) {
          window.location = `${window.location.origin}${state.path}`

          return
        }

        window.location = window.location.origin
      }
    }

    state.buttonOrder = false
    router.go(-1)
    dispatch('updateLocalStore')
    window.scrollTo(0, 0)
  },

  updateLocalStore({ state }) {
    localStorage.setItem('order-story', JSON.stringify(state))
  }
}

const getters = {
  servicesArray: state => {
    const services = []

    if (Object.keys(state.addition.services).length) {
      for (let key in state.addition.services) {
        services.push(state.addition.services[key])
      }
    }

    if (Object.keys(state.window.service).length) {
      services.push(state.window.service)
    }

    if (Object.keys(state.window.services).length) {
      for (let key in state.window.services) {
        services.push(state.window.services[key])
      }
    }

    if (Object.keys(state.wetCleaning.service).length) {
      services.push(state.wetCleaning.service)
    }

    if (state.mainService) {
      for (let key in state.mainService.services) {
        services.push(state.mainService.services[key])
      }
    }

    return services
  },
}


export default {
  state,
  mutations,
  actions,
  getters
}
