<template>
  <div v-if="isMonthCorrect" class="payment">
    <payment-carousel class="payment__carousel" :prev="prevMonthLink" :next="nextMonthLink" :month="month"/>

    <loader v-if="loading"/>

    <error-fetch v-else-if="error">Ошибка получения данных. Перезагрузите страницу или попробуйте позже</error-fetch>

    <template v-else-if="loaded">
      <div class="payment__wrap">
        <div class="payment__row">
          <p class="payment__title text">
            <template v-if="history.openingBalance > 0">Задолженность</template>
            <template v-else>Переплата</template>
            на начало месяца</p>
          <span class="payment__price payment__price--lg text"> {{ Math.abs(history.openingBalance) | currency }} </span>
        </div>

        <ul class="payment__list payment__list--border list">
          <li class="payment__item payment__item--row item">
            <p class="payment__text text">Услуги</p>
            <span class="payment__price text">{{ history.servicesSum | currency }}</span>
          </li>

          <li v-if="history.paymentSum > 0" class="payment__item payment__item--switcher payment__item--open item">
            <div class="payment__item payment__item--row item">
              <span class="payment__icon-more">Открыть больше</span>
              <p class="payment__text">Оплата</p>
              <span class="payment__price">{{ history.paymentSum | currency }}</span>
            </div>

            <ul class="payment__list list">
              <li v-if="history.payment.cash > 0" class="payment__item payment__item--row item">
                <span class="payment__text">Наличными</span>
                <span class="payment__price">{{ history.payment.cash | currency }}</span>
              </li>

              <li v-if="history.payment.credit > 0" class="payment__item payment__item--row item">
                <span class="payment__text">Картой</span>
                <span class="payment__price">{{ history.payment.credit | currency }}</span>
              </li>

              <li v-if="history.payment.bonus > 0" class="payment__item payment__item--row item">
                <span class="payment__text">Баллами</span>
                <span class="payment__price">{{ history.payment.bonus | currency }}</span>
              </li>
            </ul>
          </li>
        </ul>

        <p class="payment__row">
          <span class="payment__title text">
            <template v-if="history.closingBalance > 0">Задолженность</template>
            <template v-else>Переплата</template>
            на конец месяца</span>
          <span class="payment__price payment__price--lg text">{{ Math.abs(history.closingBalance) | currency }}</span>
        </p>
      </div>

      <div >
        <button class="payment__button payment__button--full payment__button--stroke button" @click='openModal'>
          Пополнить баланс
        </button>

        <div class="payment__tools">

          <div v-if="balance > 0 && newPaymentMethod" class="payment__select-wrap">
            <button class="payment__select-button button" @click='chooseCard'>
              <template v-if="paymentCards.length">Оплатить</template>
              <template v-else>Привязать карту</template>
            </button>

            <popup v-if="showPaymentSelect" :length="paymentCards.length + 1" :coordinate="coordinate" @close="showPaymentSelect = false">
              <payment-select :list="paymentCards" @select="selectPaymentCard" @close="closePaymentSelect" @add="addCard" />
            </popup>
          </div>

          <button v-if="balance > 0 && !newPaymentMethod" @click="getInvoiceForCurrentBalance" class="payment__button button">
            Оплатить ({{ balance | currency }})
          </button>

          <router-link class="payment__button payment__button--stroke button" :to="shareLink">Заработать баллы</router-link>
        </div>
      </div>


      <modal v-if="showModal" :show="showModal" @close="closeModal">
        <div class="payment__modal">
          <p class="payment__modal-title">Введите сумму</p>
          <input class="payment__modal-input input" type="number" v-model="valueOfReplenishment">
          <button class="payment__modal-button button" @click="replenishmentBalance" :disabled="!buttonOfReplenishment">Пополнить</button>
        </div>
      </modal>

      <router-link :to="detailsLink" class="payment__read-more">
        <span class="payment__text">Подробнее</span>
        <svg width="38.54" height="10" viewBox="0 0 38.54 10">
          <rect x="14.27" y="-14.27" width="10" height="38.54" transform="translate(14.27 24.27) rotate(-90)"
                fill="none"></rect>
          <polyline points="33.53 1.22 19.27 8.78 5.01 1.22" fill="none" stroke="#8e8d8d" stroke-linecap="round"
                    stroke-miterlimit="10" stroke-width="1.5"></polyline>
        </svg>
      </router-link>
    </template>
  </div>

  <error v-else>
    Неверный месяц
  </error>
</template>

<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  import moment from 'moment'
  import types from '@/store/types'
  import api from  'vue_components/src/api'

  import { startDate, endDate, paymentsHistoryMixin } from '@/components/Payment/mixin'
  import Loader from "@/components/common/Loader"
  import ErrorComponent from '@/components/common/Error'
  import ErrorFetch from '@/components/common/Error/ErrorFetch'
  import Popup from '@/components/common/Popup'
  import PaymentSelect from "@/components/Payment/PaymentSelect"
  import PaymentCarousel from "@/components/Payment/PaymentCarousel"
  import Modal from '@/components/common/Modal'

  export default {
    name: 'Payment',

    props: ['monthAsStringProp'],

    components: {
      Loader,
      Error: ErrorComponent,
      ErrorFetch,
      Popup,
      PaymentSelect,
      PaymentCarousel,
      Modal
    },

    data: () => ({
      prevMonthLink: null,
      nextMonthLink: null,
      detailsLink: null,
      showPaymentSelect: false,
      coordinate: null,
      showModal: false,
      valueOfReplenishment: '',
      buttonOfReplenishment: false
    }),

    computed: {
      ...mapGetters(['paymentCards']),

      monthAsString() {
        return this.monthAsStringProp.replace('.', '')
      },

      newPaymentMethod() {
        return this.$store.state.client.addCards
      },

      shareLink() {
        const clientId = this.$store.state.client.clientId.replace(/-/g, '')

        return `/share/cln${clientId}`
      },
      ...mapState({
        balance: state => state.client.payments.balance
      })
    },

    methods: {
      ...mapActions(['addCard', 'addPayment', 'getInvoiceForCurrentBalance', 'fetchBalance']),

      ...mapMutations({
        showAlert: types.SHOW_ALERT
      }),

      replenishmentBalance() {
        if (this.valueOfReplenishment > 0) {
          this.addPayment({sum: this.valueOfReplenishment})
        } else {
          this.errorOfReplenishment = true
        }
      },

      prepareData() {
        if (!this.isMonthCorrect)
          return

        this.prevMonthLink = this.month.valueOf() === startDate.valueOf() ?
          null :
          `/psm${moment(this.month).add(-1, 'month').format('YYYYMM')}`

        this.nextMonthLink = this.month.valueOf() === endDate.valueOf() ?
          null :
          `/psm${moment(this.month).add(1, 'month').format('YYYYMM')}`

        this.detailsLink = `/psm${this.monthAsString}/pdm${this.monthAsString}`
      },

      async repeatPayment(item) {
        const { result } = await api.client.changeDebtPaymentType({ cardId: item.cardId })

        if (result) {
          this.showAlert({ view: 'message', text: `Долг погашен в размере ${this.balance} руб.`, timer: 3000, type: 'success' })
          this.$emit('close')
        }

        this.fetchPaymentsHistory(this.month)
      },

      chooseCard(e) {
        if (this.paymentCards.length) {
          this.coordinate = e.currentTarget.getBoundingClientRect()

          this.showPaymentSelect = true
        } else {
          this.closePaymentSelect()
          this.addCard()
        }
      },

      payOrder() {
        if (this.newPaymentMethod) {
          this.addCard()
        } else {
          this.getInvoiceForCurrentBalance()
        }
      },

      closePaymentSelect() {
        this.showPaymentSelect = false
      },

      selectPaymentCard(item) {
        this.closePaymentSelect()
        this.repeatPayment(item)
      },

      openModal() {
        this.showModal = true
        this.valueOfReplenishment = ''
      },

      closeModal() {
        this.showModal = false
        this.valueOfReplenishment = ''
      }
    },

    watch: {
      valueOfReplenishment() {
        this.buttonOfReplenishment = this.valueOfReplenishment > 0
      }
    },

    mixins: [paymentsHistoryMixin]
  }
</script>

<style scoped>
  @import "../../css/variables.css";
  @import "../../css/components/button.css";
  @import "../../css/components/input.css";

  .payment {
    padding: 0 7.8%;

    @media (--tablet) {
      padding-top: 30px;
      height: calc(100% - 30px);
    }

    &__wrap {
      margin-bottom: 20px;

      @media (--tablet) {
        margin-bottom: 30px;
      }
    }

    &__select-wrap {
      position: relative;

      @media (--tablet) {
        width: 45%;
      }

      @media (--desktop) {
        width: 46%;
      }
    }

    &__select-button {
      width: 100%;
      height: 100%;

      @media (--tablet) {
        font-size: 12px;
        padding: 10px 20px;
      }

      @media (--desktop) {
        padding: 10px 38px;
        font-size: 14px;
      }
    }

    &__row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      @media (--desktop) {
        margin-bottom: 30px;
      }
    }

    &__list {
      margin-bottom: 20px;
      padding-left: 0;

      &--border {
        padding-top: 20px;
        padding-bottom: 10px;
        border-top: 1px solid #dfd1c4;
        border-bottom: 1px solid #dfd1c4;
      }
    }

    &__item {
      margin-bottom: 10px;
      line-height: 20px;
      list-style: none;

      &--switcher {
        position: relative;
        padding-left: 30px;

        @media (--tablet) {
          position: static;
          padding-left: 0;
        }

        & .payment__list {
          display: none;
          padding-left: 20px;

          @media (--tablet) {
            display: block;
          }
        }
      }

      &--row {
        display: flex;
        justify-content: space-between;
      }

      &--open {
        & .payment__list {
          display: block;
          margin-bottom: 0;
        }

        & .payment__icon-more {
          background-image: url("img/check.svg");
          background-position: -40px center;
        }
      }
    }

    &__icon-more {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      font: 0/0 a;
      color: transparent;
      background-image: url("img/check.svg");
      background-repeat: no-repeat;
      background-position: -75px center;

      @media (--tablet) {
        display: none;
      }
    }

    &__title {
      font-size: 14px;

      @media (--tablet) {
        font-size: 16px;
      }

      @media (--desktop) {
        font-size: 18px;
        font-family: var(--heading-font-family);
      }
    }

    &__price {
      margin-left: 10px;
      text-align: right;
      color: var(--brand-color-orange);
      white-space: nowrap;

      @media (--tablet) {
        margin-left: 20px;
      }

      &--lg {
        font-weight: 700;

        @media (--tablet) {
          font-size: 16px;
        }

        @media (--desktop) {
          font-size: 18px;
        }
      }
    }

    &__button {
      font-family: var(--base-font-family);
      text-align: center;
      margin-bottom: 20px;
      padding: 10px 38px;

      @media (--tablet) {
        width: 45%;
        margin-bottom: 0;
        padding: 10px;
        font-size: 12px;
        line-height: 1.5em;
      }

      @media (--desktop) {
        width: 46%;
        font-size: 14px;
      }

      &--stroke {
        background-color: transparent;
        color: var(--brand-color-orange);
        border: 1px solid var(--brand-color-orange);

        &:hover {
          color: #ffffff;
        }
      }

      &--full {
        width: 100%;

        @media (--tablet) {
          width: 100%;
        }
        @media (--desktop) {
          width: 100%;
        }

      }
    }

    &__read-more {
      position: fixed;
      bottom: 0;
      left: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      color: var(--text-color);
      background-color: #fff;
      transform: translateX(-50%);
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      @media (--tablet) {
        position: absolute;
        background-color: transparent;
      }

      & svg {
        margin-top: 10px;
      }
    }

    &__tools {
      display: flex;
      flex-direction: column-reverse;

      @media (--tablet) {
        margin-top: 20px;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    &__carousel {
      margin: 20px 0;

      @media (--tablet) {
        margin-top: 0;
        margin-bottom: 40px;
      }
    }

    &__modal {
      padding: 20px;

      @media (--tablet) {
        padding: 40px;
      }
    }

    &__modal-title {
      margin-bottom: 30px;
      font-size: 18px;
      color: #000;
      line-height: 1.3em;
      text-align: center;
    }

    &__modal-input {
      text-align: center;
      margin-bottom: 20px;
    }

    &__modal-button {
      width: 100%;
    }

    &__modal-error {
      text-align: center;
      margin-bottom: 10px;
      color: var(--color-red);
    }
  }
</style>
