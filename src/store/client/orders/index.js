import { mutations as ordersListMutations, actions as ordersListActions, state as ordersListState, getters as ordersListGetters} from "./ordersList"
import { mutations as orderDetailsMutations, actions as orderDetailsActions, getters as orderDetailsGetters} from './orderDetails'

const state = {
  entities: {},
  loading: {},
  loaded: {},
  error: {},
  ...ordersListState,
}

const mutations = {
  ...ordersListMutations,
  ...orderDetailsMutations
}

const actions = {
  ...ordersListActions,
  ...orderDetailsActions
}

const getters = {
  ...ordersListGetters,
  ...orderDetailsGetters
}

export default {
  state,
  mutations,
  actions,
  getters
}
