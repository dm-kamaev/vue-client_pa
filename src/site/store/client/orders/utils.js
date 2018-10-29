import Vue from 'vue'

export function checkEntity(state, key) {
  if (!(key in state.entities)) {
    Vue.set(state.loading, key, false)
    Vue.set(state.loaded,key, false)
    Vue.set(state.error, key, false)
    Vue.set(state.entities, key, {})
  }
}

export function updateOrder(state, key, data) {
  checkEntity(state, key)

  const entity = state.entities[key]

  for (let field in data) {
    Vue.set(entity, field, data[field])
  }
}
