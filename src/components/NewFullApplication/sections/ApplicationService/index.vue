<template>
  <div>
    <application-header @backwards="orderPrevStep">
      <template v-if="showSelect">
        Выберите услугу
      </template>
      <template v-else>
        Укажите параметры уборки
      </template>
    </application-header>

    <calculator-item v-if="showSelect">
      <custom-select :options="servicesList" label="title" v-model="service"/>
    </calculator-item>

    <application-service-calculator v-if="activeService"/>

    <calculator-item class="application-service__border-top">

      <custom-checkbox
        v-if="Object.keys(addition).length" v-for="(item, index) in addition"
        class="application-service__custom-checkbox"
        :key="index"
        :title="item.title"
        :note="item.description"
        v-model="item.value"
        @input="checkboxHandler(index, item.value)"
        @openNote="openNote"
        name="additionWork"/>

      <popup :coordinate='coordinate' v-if="checkboxNoteShow" @close="checkboxNoteShow = false">
        <p class="application-service__note">{{ checkboxNote }}</p>
      </popup>

    </calculator-item>

    <div class="application-service__btns-wrapper">
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
  import analytic from '@/store/common/analytic'
  import { mapActions, mapMutations, mapState } from 'vuex'
  import types from '@/store/types'

  import ApplicationHeader from '../../ApplicationHeader'
  import ApplicationServiceCalculator from './ApplicationServiceCalculator'
  import CustomSelect from '../../CustomSelect'
  import CustomCheckbox from '@/components/CustomCheckbox'
  import CustomButton from '@/components/common/CustomButton'
  import CalculatorItem from '../../../calculator/CalculatorItem'
  import Popup from '@/components/common/Popup'

	export default {
		name: 'ApplicationService',

    components: {
      CustomButton,
      ApplicationHeader,
      ApplicationServiceCalculator,
      CustomSelect,
      CustomCheckbox,
      CalculatorItem,
      Popup
    },

		data: () => ({
      buttonColor: 'grey',
      showSelect: false,
      service: null,
      addition: {},
      checkboxNoteShow: false,
      checkboxNote: '',
      coordinate: null
    }),

		computed: {
      ...mapState({
        town: state => state.order.town,
        serviceId: state => state.order.serviceId,
        mobile: state => state.common.isMobile,
        mainService: state => state.order.mainService,
        objectServices: state => state.services.objectServices,
        objectAddition: state => state.services.objectAddition,
      }),

		  servicesList() {
        return this.$store.state.services.servicesByTown[this.town][0].services
      },

      activeService() {
        if (this.showSelect) {
          return this.service.value
        }

        return this.service
      },

      windowConfig() {
        return {
          "serviceId": "window_cleaning",
          "service": "window_cleaning",
          "classes": [
            {
              "classId": "window_space",
              "class": "window_space",
              "quantity": {
                "value": 1
              },
              "features": [
                {
                  "feature":"square",
                  "value": {
                    "value": this.mainService.square
                  }
                },
                {
                  'feature': "kind_frame",
                  'value': {
                    'value': "one-piece"
                  }
                },
                {
                  'feature': "side",
                  'value': {
                    'value': "twoside"
                  }
                }
              ]
            }
          ]
        }
      },

      wetCleaningConfig() {
        return {
          "serviceId": "wet_cleaning_of_surfaces",
          "service": "wet_cleaning_of_surfaces",
          "classes": [
            {
              "classId": "space",
              "class": "space",
              "quantity": {
                "value": 1
              },
              "features": [
                {
                  "feature":"square",
                  "value": {
                    "value": this.mainService.square
                  }
                }
              ]
            }
          ]
        }
      }
    },

    methods: {
      ...mapMutations({
        setMainServiceMutation: types.ORDER_SET_MAIN_SERVICE,
        setWindow: types.ORDER_SET_WINDOW,
        setWetCleaning: types.ORDER_SET_WET_CLEANING,
        setView: types.ORDER_SET_CURRENT_VIEW
      }),

      ...mapActions(['getOrderPrice', 'setMainService', 'orderNextStep', 'orderPrevStep', 'sendContacts']),

      setAddition() {
        if (this.objectServices[this.activeService].addition.length) {
          this.objectServices[this.activeService].addition.forEach((item) => {
            this.$set(this.addition, item, {
              title: this.objectAddition[item].title,
              description: this.objectAddition[item].description ? this.objectAddition[item].description : null,
              value: this.mainService.addition[item] ? this.mainService.addition[item].value : this.objectAddition[item].value
            })
          })
        }

        this.setMainService({'addition': JSON.parse(JSON.stringify(this.addition))})
      },

      checkboxHandler(key, value) {
        if (key === 'window_cleaning') {
          if (value) {
            this.setWindow({
              key: 'service',
              value: JSON.parse(JSON.stringify(this.windowConfig))
            })
          } else {
            this.setWindow({
              key: 'service',
              value: {}
            })
          }
        }

        if (key === 'wet_cleaning_of_surfaces') {
          if (value) {
            this.setWetCleaning({
              key: 'service',
              value: JSON.parse(JSON.stringify(this.wetCleaningConfig))
            })
          } else {
            this.setWetCleaning({
              key: 'service',
              value: {}
            })
          }
        }

        this.setMainService({'addition': JSON.parse(JSON.stringify(this.addition))})
      },

      openNote(text, coordinate) {
        this.checkboxNoteShow = true;
        this.checkboxNote = text;
        this.coordinate = coordinate
      },
    },

    watch: {
      activeService() {
        this.setMainServiceMutation({
          key: 'id',
          value: this.activeService
        })
      }
    },

    created() {
      if (!this.serviceId) {
        this.showSelect = true
        this.service = this.servicesList[0]

        this.setMainService({
          id: this.service.value
        })
      } else {
        this.service = this.serviceId

        this.setMainService({
          id: this.service
        })
      }

      this.setAddition()
    },

    mounted() {
      this.setView('service')
      analytic.sendEvent({name: "form", value: "order_new_service", ga_action: "open"}, ['ga', 'af', 'fb'])
    }
	}
</script>

<style>
  @import "../../../../css/variables.css";

  .application-service {

    &__border-top {
      padding-top: 25px;
      border-top: 1px solid #cbc9c9;

      @media (--tablet) {
        padding-top: 30px;
      }
    }

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

    &__custom-checkbox {
      margin-bottom: 15px;

      @media (--tablet) {
        margin-bottom: 20px;
      }
    }

    &__note {
      text-align: center;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 1.3em;
      font-weight: 400;
      color: #353535;
    }
  }
</style>
