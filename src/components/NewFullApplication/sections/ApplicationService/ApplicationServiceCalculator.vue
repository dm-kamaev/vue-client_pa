<template>
  <div v-if="loaded && activeService">
    <calculator-item v-if="controllers.switchCounter && showSwitchSquare" :showTitle="showTitle">
      <template slot="title">{{ controllers.switchCounter.title }}</template>

      <switch-counter
        :list="controllers.switchCounter.list"
        v-model="controllers.switchCounter.value.value" />
    </calculator-item>

    <calculator-item v-if="controllers.control">
      <select-control
        :list="controllers.control.list"
        :title="controllers.control.title"
        v-model="controllers.control.value.value"
      />
    </calculator-item>

    <calculator-item v-if="controllers.radioButtons" :showTitle="showTitle">
      <template slot="title">{{ controllers.radioButtons.title }}</template>
      <buttons-radio class="application-service__buttons-radio"
        v-model="controllers.radioButtons.value.value"
        :list="controllers.radioButtons.list" />
      <p class="calculator-item__text" v-if="controllers.radioButtons.comment">{{controllers.radioButtons.comment}}</p>
    </calculator-item>
  </div>
</template>

<script>
  import { addService, addClass, addSchedule } from '@/components/calculator/utils/createConfigService'
  import { mapMutations, mapState, mapActions } from 'vuex'
  import types from '@/store/types'

  import { SwitchCounter } from "vue_components/src/components"
  import ButtonsRadio from "@/components/common/ButtonsRadio/ButtonsRadio"
  import CalculatorItem from "@/components/calculator/CalculatorItem"
  import SelectControl from "@/components/common/SelectControl";

	export default {
		name: 'ApplicationServiceCalculator',

    components: {
      CalculatorItem,
      SwitchCounter,
      ButtonsRadio,
      SelectControl
    },

		data: () => ({
      schedule: '',
      services: {},
      controllers: {},
      showTitle: true,
      loaded: false
    }),

		computed: {
      ...mapState({
        serviceId: state => state.order.serviceId,
        mainService: state => state.order.mainService,
        objectId: state => state.order.objectId,
        defaultControllers: state => state.order.mainService.controllers,
        objectServices: state => state.services.objectServices,
        objects: state => state.client.objects
      }),

		  config() {
		    return this.objectServices[this.activeService]
      },

      activeService() {
		    if (this.serviceId) {
		      return this.serviceId
        } else {
          return this.mainService.id
        }
      },

      switchCounterValue() {
        if (this.controllers.switchCounter) {
          return this.controllers.switchCounter.value.value
        }

        return ''
      },

      radioButtonValue() {
        if (this.controllers.radioButtons) {
          return this.controllers.radioButtons.value.value
        }

        return ''
      },

      controlValue() {
        if (this.controllers.control) {
          return this.controllers.control.value.value
        }

        return ''
      },

      showSwitchSquare() {
		    if (this.objectId) {
          if (this.objects[this.objectId].square) {
            return false
          }
        }

        return true
      }
    },

		methods: {
      ...mapMutations({
        setService: types.ORDER_SET_SERVICE
      }),

      ...mapActions(['getOrderPrice', 'setMainService']),

      setService() {
        const obj = []
        const service = addService(obj, this.activeService)
        const { classes, controllers } = addClass(this.config)

        this.schedule = addSchedule(this.config.schedule, controllers)

        this.controllers = controllers

        if (this.objectId) {
          if (this.objects[this.objectId].square) {
            this.controllers.switchCounter.value.value = this.objects[this.objectId].square
          }
        }

        service.classes.push(classes)

        this.services = { ...obj }

        this.loaded = true
      },

      setDefault() {
        if (Object.keys(this.defaultControllers).length) {
          for (let key in this.controllers) {
            if (key in this.defaultControllers) {
              this.controllers[key].value.value = this.defaultControllers[key].value.value
            }
          }
        }
      }
    },

    watch: {
		  activeService() {
        this.controllers = {}
        this.service = []
        this.schedule = null
		    this.loaded = false

        this.setService()

        this.setMainService({
          'schedule': this.schedule.value,
          'controllers': JSON.parse( JSON.stringify(this.controllers)),
          'services': JSON.parse( JSON.stringify(this.services))
        })
      },

      radioButtonValue() {
        this.setMainService({
          'schedule': this.radioButtonValue,
          'controllers': JSON.parse( JSON.stringify(this.controllers)),
          'services': JSON.parse( JSON.stringify(this.services))
        })
      },

      switchCounterValue() {
        this.setMainService({
          'square': this.switchCounterValue,
          'controllers': JSON.parse( JSON.stringify(this.controllers)),
          'services': JSON.parse( JSON.stringify(this.services))
        })
      },

      controlValue() {
        this.setMainService({
          'controllers': JSON.parse( JSON.stringify(this.controllers)),
          'services': JSON.parse( JSON.stringify(this.services))
        })
      }
    },

    mounted() {
      this.setService()
      this.setDefault()

      this.setMainService({
        'schedule': this.schedule.value,
        'controllers': JSON.parse( JSON.stringify(this.controllers)),
        'services': JSON.parse( JSON.stringify(this.services))
      })
    }
	}
</script>

<style>
  .application-service__buttons-radio {
    margin-bottom: 25px;
  }
</style>
