<template>
  <div class="order-action-move" ref="scroll" @scroll="scroll">
    <div class="order-action-move__inner">
      <h2 class="order-action-move__title">Выберите дату и время</h2>

      <div class="order-action-move__table">
        <div v-if="dateLoading" class="order-action-move__loading">
          <p class="order-action-move__loading-text">Мы ищем доступные даты, это может занять какое-то время...</p>
          <loader />
        </div>

        <template v-else-if="dateLoaded">
          <date-picker :dates="dates" :datesObject="datesObject" :selected="selected" @select="setDate" />
        </template>

        <error-fetch v-else-if="dateError"/>
      </div>

      <div class="order-action-move__btns-wrapper">
        <div class="order-action-move__form" v-if="dateLoaded">
          <input class="order-action-move__checkbox" type="checkbox" name="save-employee" id="save-employee" v-model="saveWorker">
          <label class="order-action-move__label" for="save-employee">Сохранить сотрудника</label>
        </div>
        <a class="order-action-move__link" href="#" @click="close">Отмена</a>
      </div>
    </div>

    <popup v-if="isConfirmActive" :coordinate="coordinatePopup" @close="closeConfirmPopup">
      <order-action-move-popup :disabled="disabledPopup" @submit="submit" @close="closeConfirmPopup"/>
    </popup>
  </div>
</template>

<script>
  import moment from 'moment'
  import api from 'vue_components/src/api/index'
  import analytic from '@/store/common/analytic'
  import types from '@/store/types'
  import { mapMutations, mapActions } from 'vuex'

  import Loader from '@/components/common/Loader'
  import ErrorFetch from '@/components/common/Error/ErrorFetch'
  import Popup from '@/components/common/Popup'
  import OrderActionMovePopup from './OrderActionMovePopup'
  import DatePicker from "@/components/common/DatePicker"
  import 'swiper/dist/css/swiper.css'

	export default {
		name: 'OrderActionMove',

    components: {
      OrderActionMovePopup,
      Popup,
      Loader,
      ErrorFetch,
      DatePicker
    },

    props: {
      date: {
        type: Object,
        required: true
      },

      order: {
        type: Object,
        required: true
      }
    },

		data: () => ({
      selected: null,
      currentDate: null,
      times: [],
      timesRow: {
        '09:00': '06:00',
        '09:30': '06:30',
        '10:00': '07:00',
        '10:30': '07:30',
        '11:00': '08:00',
        '11:30': '08:30',
        '12:00': '09:00',
        '12:30': '09:30',
        '13:00': '10:00',
        '13:30': '10:30',
        '14:00': '11:00',
        '14:30': '11:30',
        '15:00': '12:00',
        '15:30': '12:30',
        '16:00': '13:00',
        '16:30': '13:30',
        '17:00': '14:00',
        '17:30': '14:30',
        '18:00': '15:00',
        '18:30': '15:30',
        '19:00': '16:00',
        '19:30': '16:30',
        '20:00': '17:00'
      },
      dates: [],
      amountOfDays: 10,
      saveWorker: false,
      isConfirmActive: false,
      coordinatePopup: null,
      dateLoading: false,
      dateLoaded: false,
      dateError: false
    }),

		computed: {
      disabledPopup() {
        return this.order.date === this.selected
      },

		  datesObject() {
		    const obj = {}

		    this.times.forEach((item) => {
		      obj[item.date] = {
            rate: item.rate
          }
        })

        return obj
      },

      mobile() {
        return window.innerWidth < 768
      },

      beginDate() {
        return moment.max(this.currentDate, this.date.clone().subtract(2, 'day'))
      }
    },

		methods: {
      ...mapMutations({
        showAlert: types.SHOW_ALERT,
        changeDate: types.CHANGE_ORDER_DATE,
      }),

      ...mapActions(['defineError']),

      setDate(date, event) {
		    if (this.datesObject[date]) {
          this.selected = date
          this.coordinatePopup = event.currentTarget.getBoundingClientRect()
          this.isConfirmActive = true
        }
      },

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
      },

      async getTimes() {
        this.dateLoading = true
        this.dateLoaded = false
        this.dateError = false

        const param = {
          departureId: this.order.departureId,
          date: this.beginDate.toISOString(),
          amountOfDays: this.amountOfDays,
          timeZone: '+03:00',
          city: 'moscow',
          withoutChangeEmployee: this.saveWorker,
          withEmployeeSchedule: false
        }

        try {
          const data = await api.client.getOrderTimes(param)

          this.dateLoading = false
          this.dateLoaded = true
          this.dateError = false

          this.times = data.times
        } catch (error) {
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
        const currentDate = this.beginDate.clone()
        let i = 0

        while(i < this.amountOfDays) {
          this.dates.push(currentDate.clone())
          currentDate.add(1, 'days')
          i++
        }
      },

      async submit() {
        this.moveOrderLoading = true
        const keyAlert = moment().format()

        const params = {
          "departureId": this.order.departureId,
          "date": this.selected,
          "timeZone": "+03:00",
          "reasons": [
            {
              "param": "Move_NobodyAtHome",
              "value": true
            }
          ],
          'withoutChangeEmployee': this.saveWorker
        }

        try {
          const { confirmed } = await api.client.moveOrder(params)

          this.close()

          if (confirmed) {
            this.changeDate({orderId: this.order.departureId, date: this.selected})
            this.showAlert({ view: 'message', text: 'Ваш заказ был перенесен', timer: 3000, type: 'success', key: keyAlert })
          } else {
            this.showAlert({ view: 'message', text: 'Спасибо, мы скоро подтвердим перенос заказа', timer: 3000, type: 'success', key: keyAlert })
          }

          analytic.sendEvent({name: "button", value: "move_order_success", ga_action: "click"}, ['ga', 'af', 'fb']);

        } catch (error) {
          this.close()
          this.showAlert({ view: 'message', text: 'Произошла ошибка, свяжитесь с нашими менеджерами', timer: 3000, type: 'error', key: keyAlert })
          analytic.sendEvent({name: "button", value: "move_order_fail", ga_action: "click"}, ['ga', 'af', 'fb'])

          this.defineError({
            error: error,
            name: 'moveOrder'
          })
        }
      },

      closeConfirmPopup() {
        if (this.isConfirmActive) {
          this.isConfirmActive = false

          this.selected = this.order.date
        }
      },

      close() {
        this.$emit('close')
      },

      scroll() {
        const fixColumnElement = document.querySelector('.date-picker__fix-column')
        const container = document.querySelector('.date-picker')

        if (fixColumnElement && container) {
          const containerBottom = container.getBoundingClientRect().top

          if (containerBottom > 52) {
            fixColumnElement.style.top = '0'
            fixColumnElement.style.position = 'absolute'
          } else {
            fixColumnElement.style.top = '52px'
            fixColumnElement.style.position = 'fixed'
          }
        }
      }
    },

    watch: {
      currentDate() {
        this.getDates()
        this.getTimes()
      },

      saveWorker() {
        this.getTimes()
      }
    },

    created() {
      this.getTimeInfo()
      this.selected = this.order.date
    }
	}
</script>
<style scoped>
  @import "../../../../css/variables.css";

  .order-action-move {
    position: fixed;
    top: 52px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    max-width: 1280px;
    margin: auto;
    overflow: scroll;
    background-color: #f6f6f6;

    @media (--tablet) {
      top: 60px;
      overflow: hidden;
    }

    &__inner {
      box-sizing: border-box;
      padding-top: 20px;
      padding-bottom: 50px;
      background-color: var(--color-white);

      @media (--tablet) {
        width: 690px;
        margin: 50px auto 30px;
        padding: 40px 50px;
      }

      @media (--desktop) {
        width: 835px;
        padding-left: 80px;
        padding-right: 80px;
      }
    }

    &__loading {
      margin: auto;
    }

    &__loading-text {
      font-family: var(--base-font-family);
      font-size: 14px;
      color: #353535;
      margin-bottom: 20px;
      text-align: center;
      padding: 0 20px;

      @media (--tablet) {
        font-size: 16px;
        margin-bottom: 30px;
      }
    }

    &__title {
      margin-bottom: 20px;
      text-align: center;
      font-size: 18px;
      line-height: 25px;
      font-weight: 400;
      color: #353535;

      @media (--tablet) {
        margin-bottom: 30px;
      }
    }

    &__btns-wrapper {
      position: fixed;
      bottom: 0px;
      width: 100%;
      left: 0;
      background-color: #ffffff;
      z-index: 3;
      box-sizing: border-box;
      padding-top: 15px;
      padding-bottom: 15px;


      display: flex;
      justify-content: space-between;
      padding-left: 20px;
      padding-right: 20px;

      @media (--tablet) {
        position: static;
      }
    }

    &__form {
      display: inline-flex;
      width: 190px;
    }

    &__checkbox {
      display: none;

      &:checked ~ .order-action-move__label::after {
        display: block;
      }

      &:checked ~ .order-action-move__label::before {
        border-color: #ff5a19;
      }
    }

    &__label {
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
      position: relative;
      display: block;
      padding-left: 30px;
      font-size: 14px;
      line-height: 16px;
      color: #353535;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 1px solid #cbc9c9;
        border-radius: 3px;
      }

      &::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 5px;
        display: none;
        width: 5px;
        height: 8px;
        border-top: 1px solid #ff5a19;
        border-left: 1px solid #ff5a19;
        transform: rotate(-140deg);
      }
    }

    &__link {
      cursor: pointer;
      user-select: none;
      margin-left: auto;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 16px;
      text-decoration: underline;
      color: #ff5a19;
    }

    &__table {
      width: 100%;
      min-height: 384px;
      overflow: hidden;

      @media (--tablet) {
        min-width: 590px;
        min-height: 400px;
      }
    }

    &__fix-column {
      width: 90px;
      flex-shrink: 0;
      z-index: 5;
      margin-right: -1px;
      border-right: 1px solid white;

      @media (--tablet) {
        width: 125px;
      }
    }

    &__scroll-column {
      display: flex;
      width: calc(100% - 90px);

      @media (--tablet) {
        width: calc(100% - 125px);
      }
    }

    &__column {
      width: 65px;

      @media (--tablet) {
        width: 90px;
      }
    }

    &__cell {
      position: relative;
      user-select: none;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 14px;
      border-top: 1px solid var(--color-white);
      border-left: 1px solid var(--color-white);
      font-size: 14px;
      line-height: 19px;
      color: #353535;
      background-color: #f2f2f2;

      @media (--tablet) {
        padding: 15px 27px;

        &:hover {
          color: var(--color-white);
          background-color: #ff5a19;

          & .order-action-move__text-green {
            color: var(--color-white);
          }
        }
      }

      &--header {
        cursor: default;
        background-color: #e5e5e5;

        @media (--tablet) {
          &:hover {
            color: #353535;
            background-color: #e5e5e5;
          }
        }
      }

      &--disabled {
        cursor: default;
        background-color: #f2f2f2;

        @media (--tablet) {
          &:hover {
            color: #353535;
            background-color: #f2f2f2;
          }
        }
      }

      &--btn-wrapper {
        height: 48px;
        padding: 0;
        border-top: none;
        border-left: none;
        background-color: var(--color-white);

        @media (--tablet) {
          height: 50px;
          padding: 0;

          &:hover {
            background-color: var(--color-white);
          }
        }
      }

      &--hover {
        @media (--tablet) {
          background-color: rgba(255, 255, 255, 0.6);

          &:hover {
            color: #353535;
            background-color: rgba(255, 255, 255, 0.6);
          }
        }
      }

      &--active {
        color: var(--color-white);
        background-color: #ff5a19;

        @media (--tablet) {
          background-color: #ff5a19;
        }

        & .order-action-move__text-green {
          color: var(--color-white);
        }
      }
    }

    &__text-green {
      color: #65b22b;
    }

    &__btn {
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
      position: relative;
      width: 50%;
      height: 48px;
      outline: none;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 65%;
        transform: translate(-50%, -50%)
        rotate(-45deg);
        display: block;
        width: 10px;
        height: 10px;
        border-top: 1px solid #353535;
        border-left: 1px solid #353535;
      }

      &--next {
        &::before {
          left: 35%;
          transform: translate(-50%, -50%)
          rotate(135deg);
        }
      }

      &--disabled {
        &::before {
          border-top-color: #cbc9c9;
          border-left-color: #cbc9c9;
        }
      }
    }
  }
</style>

