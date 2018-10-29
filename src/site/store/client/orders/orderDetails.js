import { checkEntity, updateOrder } from "./utils";

import types from '@/store/types'
import api from 'vue_components/src/api'

import { statuses, statusesKey } from "@/components/Order/orderStatus"

export const mutations = {
  [types.LOAD_ORDER_DETAILS_REQUEST](state, { key }) {
    checkEntity(state, key)

    state.loading[key] = true
    state.loaded[key] = false
    state.error[key] = false
  },

  [types.LOAD_ORDER_DETAILS_SUCCESS](state, { key, details }) {
    updateOrder(state, key, details)

    state.loading[key] = false
    state.loaded[key] = true
    state.error[key] = false
  },

  [types.LOAD_ORDER_DETAILS_ERROR](state, { key }) {
    state.loading[key] = false
    state.loaded[key] = false
    state.error[key] = true
  },

  [types.SET_ORDER_REVIEW](state, { orderId, value }) {
    state.entities[orderId].review = true
    state.entities[orderId].rating = value
  },

  [types.CHANGE_ORDER_DATE](state, { orderId, date }) {
    state.entities[orderId].date = date
  },

  [types.CHANGE_ORDER_PAYMENT_TYPE](state, { orderId, details }) {
    state.entities[orderId].payment.details = details
  },

  [types.SET_ORDER_PAYMENT_AMOUNT](state, { orderId, value }) {
    state.entities[orderId].paidAmount = value
  },

  [types.CHANGE_STATUS_ORDER](state, { orderId, status }) {
    state.entities[orderId].statusCode = status
    state.entities[orderId].statusKey = statusesKey.status
  }
}

export const actions = {
  async getOrderDetails({ state, commit, dispatch }, key) {
    if (state.loading[key]) {
      return
    }

    commit(types.LOAD_ORDER_DETAILS_REQUEST, { key })

    try {
      const details = await api.client.getDeparture({
        departureId: key
      })

      commit(types.LOAD_ORDER_DETAILS_SUCCESS, { key, details })
    } catch (error) {
      dispatch('defineError', {
        error: error,
        name: 'getOrderDetails',
        params: {
          departureId: key
        }
      })

      commit(types.LOAD_ORDER_DETAILS_ERROR, { key })
    }
  }
}

export const getters = {
  orderDetailsLoading: state => key => {
    if (state.loading[key]) {
      return state.loading[key]
    }

    return false
  },

  orderDetailsLoaded: state => key => {
    if (state.loaded[key]) {
      return state.loaded[key]
    }

    return false
  },

  orderDetailsError: state => key => {
    if (state.error[key]) {
      return state.error[key]
    }

    return false
  },

  orderDetails: state => key => {
    if (state.entities[key]) {
      return state.entities[key]
    }

    return false
  }
}
