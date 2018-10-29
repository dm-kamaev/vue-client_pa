<template>
  <div>
    <application-header @backwards="orderPrevStep">
      Выберите доп. работы
    </application-header>

    <calculator-item v-if="length" class="application-addition__section">
      <swiper class="carousel" :options="options">
        <swiper-slide  v-for="slide in config.additionWorks" :key="slide" class="application-addition__carousel-item carousel__item">
          <service-card :serviceId="slide" v-model="controllers.cards[slide].value.value" @input="change"/>
        </swiper-slide>
      </swiper>
    </calculator-item>

    <div class="application-addition__btns-wrapper">
      <custom-button v-if="mobile" :color="buttonColor" @click="sendContacts">
        Быстрый заказ
      </custom-button>

      <custom-button @click="orderNextStep">
        Далее
      </custom-button>
    </div>
  </div>
</template>

<script>
  import { addService, addClass, addSchedule, addServices } from '@/components/calculator/utils/createConfigService'
  import analytic from '@/store/common/analytic'
  import { mapMutations, mapState, mapActions } from 'vuex'
  import types from '@/store/types'

  import ApplicationHeader from "../../ApplicationHeader"
  import ServiceCard from '../../ServiceCard'
  import CustomButton from '@/components/common/CustomButton'
  import CalculatorItem from '../../../calculator/CalculatorItem'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

	export default {
		name: 'ApplicationAddition',

    components: {
      ApplicationHeader,
      swiper,
      swiperSlide,
      ServiceCard,
      CustomButton,
      CalculatorItem
    },

		data: () => ({
      buttonColor: 'grey',
      controllers: null,
      service: null
    }),

		computed: {
      ...mapState({
        serviceId: state => state.order.serviceId,
        mobile: state => state.common.isMobile,
        mainService: state => state.order.mainService,
        defaultControllers: state => state.order.addition.controllers
      }),

		  options() {
		    if (this.mobile) {
		      return {
            slidesPerColumn: 4,
            direction: 'horizontal',
            slidesPerView: "auto",
            clickable: true,
            spaceBetween: 15
          }
        }

        return {
          slidesPerColumn: 3,
          direction: 'horizontal',
          slidesPerView: "auto",
          clickable: true,
          spaceBetween: 15
        }
      },

      config() {
        return this.$store.state.services.objectServices[this.mainService.id]
      },

      listServicesConfig() {
        const addition = []

        this.config.additionWorks.forEach((item) => {
          addition.push(this.$store.state.services.objectClasses[item])
        })

        return addition
      },

      length() {
        if (this.controllers) {
          if (Object.keys(this.controllers).length) {
            return Object.keys(this.controllers.cards).length
          }
        }

        return 0
      }
    },

		methods: {
      ...mapMutations({
        setView: types.ORDER_SET_CURRENT_VIEW
      }),

      ...mapActions(['getOrderPrice', 'setAddition', 'orderNextStep', 'orderPrevStep', 'sendContacts']),

      getArray() {
		    const arr = []
		    for (let key in this.controllers.cards) {
		      if (this.controllers.cards[key].value.value) {
		        arr.push(key)
          }
        }

        return arr
      },

      getProperty(arr) {
		    const obj = JSON.parse(JSON.stringify(this.service))
        const obj2 = {}

		    for (let key in obj) {
		      const classes = []

		      obj[key].classes.forEach((item) => {
            if (arr.indexOf(item.classId) !== -1) {
              classes.push(item)
            }
          })

		      if (classes.length) {
		        obj2[key] = {
              service: obj[key].service,
              serviceId: obj[key].serviceId,
              classes: classes
            }

          }
        }

        return obj2
      },

      getValue() {
		    const obj = {}

		    for (let key in this.controllers.cards) {
		      obj[key] = this.controllers.cards[key].value.value
        }

        return obj
      },

      setService() {
        const obj = []

        this.listServicesConfig.forEach((item) => {
          const service = addService(obj, item.service)
          const { classes, controllers } = addClass(item, this.controllers)

          this.controllers = controllers

          this.service = { ...obj }

          service.classes.push(classes);
        })

        this.setDefault()
      },

      setDefault() {
        if (Object.keys(this.defaultControllers).length) {
          for (let key in this.controllers) {
            for (let item in this.controllers[key]) {
              if (key in this.defaultControllers) {
                this.controllers[key][item].value.value = this.defaultControllers[key][item].value.value
              }
            }
          }
        }

        this.setAddition({
          services: JSON.parse(JSON.stringify(this.getProperty(this.getArray()))),
          countServices: JSON.parse(JSON.stringify(this.getValue())),
          controllers: JSON.parse(JSON.stringify(this.controllers))
        })
      },

      change() {
        this.setAddition({
          services: JSON.parse(JSON.stringify(this.getProperty(this.getArray()))),
          countServices: JSON.parse(JSON.stringify(this.getValue())),
          controllers: JSON.parse(JSON.stringify(this.controllers))
        })
      }
    },

    mounted() {
      this.setView('addition')
		  this.setService()

      analytic.sendEvent({name: "form", value: "order_new_addition", ga_action: "open"}, ['ga', 'af', 'fb'])
    }
	}
</script>

<style>
  @import "../../../../css/variables.css";

  .application-addition {

    &__btns-wrapper {
      position: fixed;
      bottom: 0;
      z-index: 10;
      display: flex;
      width: 100%;

      @media (--tablet) {
        position: static;
      }
    }

    &__carousel-item {
      width: 215px;

      @media (--tablet) {
        width: 230px;
      }

      @media (--desktop) {
        width: 260px;
      }
    }

    &__section {
      margin-right: 0;
    }
  }
</style>
