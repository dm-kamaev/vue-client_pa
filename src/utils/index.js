import PathToRegexp from 'path-to-regexp'

export function router(routes, path) {
  for (let route of routes) {
    let keys = []
    const re = PathToRegexp(route.path, keys)

    const res = re.exec(`/${path}`)

    if (res) {
      const props = keys.reduce((props, key, i) => {
        props[key.name] = res[i + 1]
        return props
      }, {})

      return {
        component: route.component,
        props: props
      }
    }
  }

  return {
    component: null,
    props: null
  }
}
