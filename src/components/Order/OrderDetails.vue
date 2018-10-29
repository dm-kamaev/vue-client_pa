<template>
  <div ref="scroll" class="order">
    <div class="order__container">
      <button-close @closeHandler="prevLink"/>

      <header  class="order__section">
        <h2 class="order__title order__title--main title">Номер заказа №{{ order.orderNumber }}</h2>
        <p class="order__status text" :class="classStatus">{{  statusTitle }}</p>
        <p class="order__time">{{ dateOrder }} <span class="order__time-orange">{{ timeOrder }}</span></p>
      </header>

      <section  v-if="this.activeOrder" class="order__section">
        <order-action :order="order"/>
      </section>

      <section v-if="this.complitedOrder" class="order__section">
        <h3 class="order__title title">Оценка заказа</h3>

        <order-review :order="order"/>
      </section>

      <section v-if="order.services.length" class="order__section">
        <h3 class="order__title title">Услуги</h3>

        <order-services :services="order.services"/>

        <div class="order__services">
          <div class="order__services-col">
            <p v-if="order.discount" class="order__services-text">Скидка {{ discountPercent }}%:</p>
            <p class="order__services-text">Итого<template v-if="order.discount"> со скидкой</template>:</p>
          </div>
          <div class="order-services-col">
            <p v-if="order.discount" class="order__services-cost">{{ order.discount | currency }}</p>
            <p class="order__services-cost">{{ order.amountWithDiscount | currency }}</p>
          </div>
        </div>
      </section>

      <section v-if="order.employees.length" class="order__section">
        <h3 class="order__title title">Домовята</h3>

        <order-employee v-for="(employee, index) in order.employees" :key="employee.employeeId" :employee='employee' />
      </section>

      <section v-if="this.activeOrder || this.complitedOrder" class="order__section">
        <h3 class="order__title title">Оплата</h3>

        <div v-if="orderIsPaid" class="order__payment-row">
          <svg class="order__payment-icon" xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 13 8.08">
            <path class="cls-1" d="M.5 2.2l5.34 5.17L12.5.5" fill="none" stroke="#65b22b" stroke-linecap="round" stroke-miterlimit="10"/>
          </svg>
          <p class="text">Оплачено</p>
        </div>

        <order-payment v-else :order="order"/>
      </section>
    </div>
  </div>
</template>

<script>
import api from  'vue_components/src/api'
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import types from '@/store/types'
  import analytic from '@/store/common/analytic'

  import Modal from '@/components/common/Modal'
  import ButtonClose from '@/components/common/ButtonClose'
  import OrderServices from './OrderServices'
  import OrderEmployee from './OrderEmployee'
  import OrderReview from './OrderReview'
  import OrderAction from './OrderAction'
  import OrderPayment from './OrderPayment'
  import { statusesTitles, statuses } from './orderStatus'
  import PerfectScrollbar from 'perfect-scrollbar'
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import moment from 'moment'

  export default {
    name: 'OrderDetails',

    components: {
      ButtonClose,
      OrderServices,
      OrderEmployee,
      OrderReview,
      OrderAction,
      OrderPayment,
      VuePerfectScrollbar,
      Modal
    },

    props: {
      order: {
        type: Object,
        required: true
      }
    },

    data: () => ({
      settings: {},
      paymentLoading: false,
      paymentError: false
    }),

    computed: {
      discountPercent() {
        return Math.round(this.order.discount / (this.order.amountWithDiscount + this.order.discount) * 100)
      },

      statusTitle() {
        return statusesTitles[this.order.statusCode]
      },

      fullDate() {
        return moment.utc(this.order.date).utcOffset(this.order.timeZone);
      },

      dateOrder() {
        return this.fullDate.format('DD.MM.YYYY')
      },

      timeOrder() {
        return this.fullDate.format('HH:mm')
      },

      classStatus() {
        return {
          'order__status--orange': this.activeOrder,
          'order__status--green': this.complitedOrder,
          'order__status--red': statuses.canceled === this.order.statusCode,
        }
      },

      activeOrder() {
        return statuses.active === this.order.statusCode
      },

      complitedOrder() {
        return statuses.complited === this.order.statusCode
      },

      orderIsPaid() {
        return (this.order.amountWithDiscount - this.order.paidAmount) <= 0
      }
    },

    methods: {
      ...mapMutations({
        setPaymentAmount: types.SET_ORDER_PAYMENT_AMOUNT,
        showAlert: types.SHOW_ALERT
      }),

      ...mapActions(['defineError']),

      prevLink() {
        const currentPath = this.$route.path

        this.$router.push(currentPath.split('/').slice(null, -1).join('/'))
      }
    },

    mounted() {
      const ps = new PerfectScrollbar(this.$refs.scroll);
    }
  }
</script>

<style scoped>
  @import "../../css/variables.css";
  @import "../../css/components/title.css";
  @import "../../css/components/text.css";
  @import "../../css/components/button.css";
  @import "../../css/mixins.css";

  .order {
    position: relative;
    height: 100%;
    width: 100%;

    &__container {
      position: relative;
      padding: 20px;
      box-sizing: border-box;

      @media (--tablet) {
        padding: 30px;
      }
    }

    &__section {
      margin-bottom: 25px;

      @media (--tablet) {
        margin-bottom: 30px;
      }
    }

    &__title {
      margin-bottom: 15px;

      @media (--tablet) {
        margin-bottom: 20px;
      }

      &--main {
        width: calc(100% - 40px);
        margin-bottom: 10px;
      }
    }

    &__status {
      margin-bottom: 10px;

      &--red {
        color: var(--color-red);
      }

      &--green {
        color: var(--color-green);
      }

      &--orange {
        color: var(--brand-color-orange);
      }
    }

    &__time {
      position: relative;
      padding-left: 35px;
      font-size: 14px;
      line-height: 28px;
      color: var(--text-color);

      &-orange {
        padding-left: 10px;
        font-weight: 400;
        color: #fd8204;
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 28px;
        height: 28px;
        background-image: url("./img/clock.svg");
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    &__payment-row {
      display: flex;
      align-items: center;
    }

    &__payment-icon {
      margin-right: 10px;
    }

    &__payment-success {
      padding: 0 30px;
      text-align: center;
      color: #000;
      font-size: 18px;
      margin-top: 50px;
    }

    &__payment-error {
      padding: 0 30px;
      text-align: center;
      color: #000;
      font-size: 18px;
      margin-top: 50px;
    }

    &__services {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
    }

    &__services-col {
      width: 135px;
    }

    &__services-cost {
      text-align: right;
      color: var(--brand-color-orange);
    }
  }
</style>

