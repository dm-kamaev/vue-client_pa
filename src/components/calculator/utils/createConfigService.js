const defaultControllers = {
  switchCounter: {
    active: false,
    list: [],
    value: null
  },
  control: {
    active: false,
    list: [],
    title: null,
    value: null
  },
  radio: {
    active: false
  },
  counter: {
    active: false,
    value: 0
  },
  squareInputs: {
    active: false,
    value: 0
  },
  cards: {},
  radioButtons: {
    active: false,
    title: null,
    list: [],
    comment: null,
    value: null
  }
}


export function addSchedule(config, controllers) {
  const defaultController = JSON.parse(JSON.stringify(defaultControllers))

  if (!controllers) {
    controllers = {}
  }

  const value = {
    value: null
  }

  if (config.list.length) {
    if (!(config.view in controllers)) {
      controllers[config.view] = defaultController[config.view]
    }

    controllers[config.view].active = true
    controllers[config.view].list = config.list
    controllers[config.view].title = config.title
    controllers[config.view].comment = config.comment
    controllers[config.view].value = value
  }

  value.value = config.default.value

  return value
}

export function addService(services, serviceName) {
  if (!(serviceName in services)) {
    services[serviceName] = {
      "serviceId": serviceName,
      "service": serviceName,
      "classes": []
    }
  }

  return services[serviceName]
}

export function addClass(config, controllers) {
  const defaultController = JSON.parse(JSON.stringify(defaultControllers))

  if (!controllers) {
    controllers = {}
  }

  let quantity = 0

  const classes = {
    'classId': config.classId,
    'class': config.class,
    'quantity': {
      'value': quantity
    },
    'features': []
  }

  if (config.quantity.changeable) {
    if (!(config.quantity.view in controllers)) {
      controllers[config.quantity.view] = defaultController[config.quantity.view]
    }

    if (config.quantity.view === 'cards') {
      controllers[config.quantity.view][config.classId] = {
        active: true,
        value: {}
      }

      controllers[config.quantity.view][config.classId].value = classes.quantity
    } else {
      controllers[config.quantity.view].active = true
      controllers[config.quantity.view].value = classes.quantity
    }
  }

  if (config.quantity.default) {
    classes.quantity.value = config.quantity.default
  }

  if (config.features.length) {
    let controller = null

    config.features.forEach((featureConfig) => {
      if (!(featureConfig.view in controllers) && featureConfig.view) {
        controllers[featureConfig.view] = defaultController[featureConfig.view]
      }

      if (featureConfig.changeable && featureConfig.view === 'cards') {
        controller = controllers[featureConfig.view][config.classId] = {
          active: true,
          value: null
        }
      } else {
        controller = controllers[featureConfig.view]
      }

      const feature = addFeature(featureConfig, controller)

      classes.features.push(feature)
    })
  }

  return { classes, controllers }
}

export function addFeature(config, controller) {
  const feature = {
    feature: null,
    value: {
      value: null
    }
  }

  feature.feature = config.feature

  if (config.view !== 'cards') {
    if (config.changeable) {
      controller.value = feature.value
      controller.active = true

      if (config.values) {
        controller.list = config.values
        controller.title = config.title
        controller.value.value = config.default
      }
    } else {
      feature.value.value = config.value
    }
  } else {
    if (config.changeable) {
      controller.value = feature.value
    }
  }

  return feature
}
