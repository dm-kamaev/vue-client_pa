import { updateOrder } from "./utils"
import types from '@/store/types'
import api from 'vue_components/src/api'

const lle = { // кто придумает название лучше - тому печенька
  loading: false,
  loaded: false,
  error: false
}

export const statuses = {
  undefined: 'undefined',
  active: 'active',
  completed: 'completed'
}

const statusByStatusCode = {
  1: statuses.active,
  2: statuses.completed
}

export const state = {
  active: {
    up: { ...lle },
    down: { ...lle },
    end: false,
    begin: false
  },
  completed: {
    up: { ...lle },
    down: { ...lle },
    end: false,
    begin: false
  },
  undefined: {
    up: {...lle},
    down: {...lle},
    end: false,
    begin: false
  },
  status: statuses.undefined
}

export const mutations = {
  [types.LOAD_ORDERS_LIST_REQUEST](state, { status, direction }) {

    if (direction <= 0) {
      state[status].down.loading = true
      state[status].down.loaded = false
      state[status].down.error = false
    }

    if (direction >= 0) {
      state[status].up.loading = true
      state[status].up.loaded = false
      state[status].up.error = false
    }
  },

  [types.LOAD_ORDERS_LIST_SUCCESS](state, { direction, data }) {
    const status = statusByStatusCode[data.statusCode]

    for(let order of data.departureList) {
      order.objectId = data.objectId
      order.statusKey = status
      updateOrder(state, order.departureId, order)
    }

    if (direction <= 0) {
      state[status].down.loading = false
      state[status].down.loaded = true
      state[status].down.error = false
    }

    if (direction >= 0) {
      state[status].up.loading = false
      state[status].up.loaded = true
      state[status].up.error = false
    }

    if (!state[status].end) {
      state[status].end = data.end
    }

    if (!state[status].begin) {
      state[status].begin = data.begin
    }
  },

  [types.LOAD_ORDERS_LIST_ERROR](state, { status, direction }) {
    if (direction <= 0) {
      state[status].down.loading = false
      state[status].down.loaded = false
      state[status].down.error = true
    }

    if (direction >= 0) {
      state[status].up.loading = false
      state[status].up.loaded = false
      state[status].up.error = true
    }
  },

  [types.SET_ORDERS_STATUS](state, { status }) {
    state.status = status
  }
}

export const actions = {
  async getOrders({ state, commit, dispatch }, { objectId, status, key, direction }) {
    let loading = false

    if (direction <= 0) {
      loading = state[status].down.loading || state[status].end
    }

    if (direction >= 0) {
      loading = state[status].up.loading || state[status].begin
    }

    if (!loading) {
      commit(types.LOAD_ORDERS_LIST_REQUEST, { status, direction })

      const params = {
        filter: {
          objectId: objectId
        },

        nav: {
          count: 20
        }
      }

      if (status !== statuses.undefined) {
        params.filter.status = String.prototype.toUpperCase.call(status[0]) + status.slice(1)
      }

      if (key) {
        params.nav.objectId = key
        params.nav.direction = direction
      }

      try {
        const data = await api.client.getDepartureList(params)

        commit(types.LOAD_ORDERS_LIST_SUCCESS, { direction, data })

        status = statusByStatusCode[data.statusCode]

        if (data.statusCode === 3) {
          status = statusByStatusCode[1]
        }

        commit(types.SET_ORDERS_STATUS, { status })

      } catch (error) {
        dispatch('defineError', {
          error: error,
          name: 'getOrders',
          params: params
        })

        commit(types.LOAD_ORDER_DETAILS_ERROR, { status, direction })
      }
    }
  }
}

export const getters ={
  orderList: state => (id, filter) => {
    const list = []

    for (let key in state.entities) {
      if (state.entities[key].objectId === id && state.entities[key].statusKey === filter) {
        list.push(state.entities[key])
      }
    }

    list.sort((a, b) => {
      let dateA = new Date(a.date).valueOf()
      let dateB = new Date(b.date).valueOf()

      if (filter === statuses.active) {
        if (dateA > dateB) return 1;
        if (dateA < dateB) return -1;
      } else {
        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
      }
    })

    return list
  },

  ordersLoading: state => (id, status) => {
    return state[status].down.loading || state[status].up.loading
  },

  ordersLoaded: state => (id, filter) => {
    if (state[filter]) {
      return state[filter].loaded
    }



    return false
  },
}
