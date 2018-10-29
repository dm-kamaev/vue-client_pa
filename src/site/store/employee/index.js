import types from '@/store/types'
import api from 'vue_components/src/api'

const state = {
  employeeId: null
}

const mutations = {
  [types.SET_EMPLOYEE_ID](state, { employeeId }) {
    state.employeeId = employeeId
    api.employee.setId(state.employeeId)
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
