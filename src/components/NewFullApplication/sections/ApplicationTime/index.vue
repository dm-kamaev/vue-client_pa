<template>
  <div class="application-time">
    <application-header @backwards="orderPrevStep">
      Выберите время и дату
    </application-header>

    <div class="application-time__table">
      <div v-if="dateLoading" class="application-time__loading">
        <p class="application-time__loading-text">Мы ищем доступные даты, это может занять какое-то время...</p>
        <loader />
      </div>

      <template  v-if="dateLoaded">
        <date-picker :dates="dates" :datesObject="datesObject" :selected="selected" @select="setDatePicker" />
      </template>

      <error-fetch v-if="dateError"/>
    </div>

    <div class="application-time__btns-wrapper">
      <custom-button v-if="mobile" :color="buttonColor" @click="sendContacts">
        Быстрый заказ
      </custom-button>

      <custom-button :disabled="!(this.selected && this.dateLoaded)" @click="submit">
        <template v-if="buttonOrder">Заказать</template>
        <template v-else-if="selected === date && selected">Далее</template>
        <template v-else>Выбрать</template>
      </custom-button>
    </div>

  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
  import types from '@/store/types'
  import moment from 'moment'
  import api from 'vue_components/src/api/index'
  import analytic from '@/store/common/analytic'
  import ApplicationHeader from '../../ApplicationHeader'
  import CustomButton from '@/components/common/CustomButton'
  import DatePicker from "@/components/common/DatePicker"
  import Loader from '@/components/common/Loader'
  import ErrorFetch from '@/components/common/Error/ErrorFetch'
  import getJson from '@/components/calculator/utils/getJson'

	export default {
		name: 'ApplicationTime',

    components:{
      ApplicationHeader,
      CustomButton,
      DatePicker,
      Loader,
      ErrorFetch
    },

		data: () => ({
      buttonColor: 'grey',
      selected: null,
      currentDate: null,
      amountOfDays: 10,
      dates: [],
      times: [],
      dateLoading: true,
      dateLoaded: false,
      dateError: false
    }),

		computed: {
      ...mapState({
        town: state => state.order.town,
        date: state => state.order.date,
        timeZone: state => state.order.timeZone,
        orderId: state => state.order.orderId,
        schedule: state => state.order.mainService.schedule,
        buttonOrder: state => state.order.buttonOrder,
        mobile: state => state.common.isMobile
      }),

      ...mapGetters(['servicesArray']),

      order() {
        return this.$store.state.client.orders.entities[this.orderId]
      },

      orderDate() {
        return moment.parseZone(moment.utc(this.order.date).utcOffset(this.order.timeZone))
      },

      datesObject() {
        const obj = {}

        this.times.forEach((item) => {
          obj[item.date] = {
            rate: item.rate,
            sum: item.sum
          }
        })

        return obj
      }
     },

		methods: {
      ...mapMutations({
        setPrice: types.ORDER_SET_PRICE,
        setDate: types.ORDER_SET_DATE,
        setView: types.ORDER_SET_CURRENT_VIEW
      }),

      ...mapActions(['defineError', 'orderNextStep', 'orderPrevStep', 'sendContacts']),

      async getTimeInfo() {
        const params = {
          "city": "moscow"
        }

        try {
          const data = await api.common.getTimeInfo(params)

          this.currentDate = moment.utc(data.date).utcOffset(data.timeZone)
        } catch (error) {
          this.currentDate = moment()

          this.defineError({
            error: error,
            name: 'getTimeInfo'
          })
        }

        this.getDates()
        this.getTimes()
      },

      async getTimes() {
        const params = {
          date: this.currentDate.toISOString(),
          amountOfDays: 10,
          timeZone: this.timeZone,
          city: this.town,
          withoutChangeEmployee: false,
          withEmployeeSchedule: false
        }

        if (this.orderId) {
          params.departureId = this.orderId
        }

        if (this.servicesArray.length) {
          params.services = getJson(
            this.servicesArray
          )
          params.schedule = this.schedule
        }

        try {
          this.dateLoading = true
          this.dateLoaded = false
          this.dateError = false

          const data = await api.client.getOrderTimes(params)

          this.times = data.times

          this.dateLoading = false
          this.dateLoaded = true
          this.dateError = false

          analytic.sendEvent({name: "form", value: "order_new_time_loaded", ga_action: "open"}, ['ga', 'af', 'fb'])
        } catch(error) {
          this.dateLoading = false
          this.dateLoaded = false
          this.dateError = true

          this.defineError({
            error: error,
            name: 'getOrderTimes'
          })
        }
      },

      getDates() {
        const currentDate = this.currentDate.clone()
        let i = 0

        while(i < this.amountOfDays) {
          this.dates.push(currentDate.clone())
          currentDate.add(1, 'days')
          i++
        }
      },

      setDatePicker(date) {
        analytic.sendEvent({name: "form", value: "order_new_time_select", ga_action: "open"}, ['ga', 'af', 'fb'])

        if (this.datesObject[date]) {
          this.selected = date

          this.setPrice({ discount: this.datesObject[date].sum, value: this.datesObject[date].sum })
          this.setDate(date)
        }
      },

		  submit() {
        if (this.selected) {
          analytic.sendEvent({name: "form", value: "order_new_time_next", ga_action: "open"}, ['ga', 'af', 'fb'])

          this.orderNextStep()
        } else {
          analytic.sendEvent({name: "form", value: "order_new_time_next_withiout_select", ga_action: "open"}, ['ga', 'af', 'fb'])
        }
      }
    },

    watch: {
      datesObject() {
        if (this.date) {
          this.setPrice({ discount: this.datesObject[this.date].sum, value: this.datesObject[this.date].sum })
        }
      }
    },

    created() {
      if (this.date) {
        this.selected = this.date
      }

      this.getTimeInfo()
    },

    mounted() {
		  this.setView('time')
      analytic.sendEvent({name: "form", value: "order_new_time", ga_action: "open"}, ['ga', 'af', 'fb'])
    }
	}
</script>

<style>
  @import "../../../../css/variables.css";

  .application-time {
    margin-top: -30px;

    @media (--tablet) {
      margin-top: 0;
    }

    &__table {
      min-height: 300px;

      @media (--tablet) {
        min-height: 400px;
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

    &__section {
      margin-right: 0;
    }

    &__loading {
      margin: auto;
      margin-top: 100px;
    }

    &__loading-text {
      margin-bottom: 20px;
      padding: 0 20px;
      text-align: center;
      font-family: var(--base-font-family);
      font-size: 14px;
      color: #353535;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        font-size: 16px;
        margin-bottom: 30px;
      }
    }

    & .swiper-container {
      overflow: unset;
    }
  }
</style>
