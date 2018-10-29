<template>
  <div>
    <template v-if="!newPaymentMethod">
      <button @click="payOrder" class="button">
        <template v-if="paymentLoading">Отправка...</template>
        <template v-else>Оплатить</template>
      </button>
    </template>

    <template v-else>
      <div class="order-payment__row" v-if="!order.payment.multiple && order.paymentTypeIsChangeable">
        <p>{{ order.payment.details[0].title }}</p>

        <div class="order-payment__select-wrap">
          <button v-if="paymentCards.length" class="order-payment__select-text" @click="openPaymentSelect">
            Изменить
          </button>

          <button class="order-payment__select-button" v-else  @click="payOrder">
            Привязать карту
          </button>

          <popup v-if="showPaymentSelect" :length="paymentMethods.length + 1" :coordinate="coordinate" @close="showPaymentSelect = false">
            <payment-select :list="paymentMethods" @select="changePaymentMethod" @close="closePaymentSelect" @add="payOrder" />
          </popup>

        </div>
      </div>

      <template v-else>
        <ul class="order-payment__list">
          <li class="order-payment__item" v-for="item in order.payment.details">
            <span>{{ item.title }}</span>  <span class="order-payment__item-price">{{ item.amount | currency }} руб</span>
          </li>
        </ul>
        <p class="order-payment__note">Изменить способ оплаты можно только по звонку в наш коллцентр.</p>
      </template>
    </template>

    <popup v-if="showModal" :coordinate="coordinate" @close="closeModal">
      <div class="order-payment__popup">
        <p class="order-payment__popup-text">Поменять способ оплаты во всех будущих заказах?</p>
        <button class="order-payment__popup-btn button" type="button" @click="setMethodCard(true)">Да</button>
        <button class="order-payment__popup-btn button" type="button" @click="setMethodCard(false)">Нет</button>
      </div>
    </popup>

    <div v-if="loading" class="order-payment__loading">
      <loader />
    </div>
  </div>
</template>

<script>
  import api from  'vue_components/src/api'
  import moment from 'moment'
  import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
  import types from '@/store/types'
  import analytic from '@/store/common/analytic'
  import Modal from '@/components/common/Modal'
  import Loader from '@/components/common/Loader'

  import Popup from '@/components/common/Popup'
  import PaymentSelect from "@/components/Payment/PaymentSelect"

  export default {
    name: 'OrderPayment',

    components: {
      PaymentSelect,
      Popup,
      Modal,
      Loader
    },

    props: {
      order: {
        type: Object,
        required: true
      }
    },

    data: () => ({
      loading: false,
      paymentLoading: false,
      paymentError: false,
      showPaymentSelect: false,
      coordinate: null,
      showModal: false,
      paymentItem: null
    }),

    computed: {
      ...mapGetters(['paymentCards']),

      newPaymentMethod() {
        return this.$store.state.client.addCards
      },

      paymentMethods() {
        const choosenMethod = this.order.payment.details[0]

        const methods = this.paymentCards.filter((item) => {
          if (choosenMethod.cardId !== item.cardId) {
            item.type = 1
            return item
          }
        })

        if (choosenMethod.type !== 0) {
          methods.unshift({title: 'Наличные', date: '', type: 0, cardId: ''})
        }

        return methods
      },

      amount() {
        return (this.order.amountWithDiscount - this.order.paidAmount > 0) ? this.order.amountWithDiscount - this.order.paidAmount : 0;
      }
    },

    methods: {
      ...mapActions(['addCard', 'addPayment', 'defineError']),

      ...mapMutations({
        changeOrderPaymentType: types.CHANGE_ORDER_PAYMENT_TYPE,
        showAlert: types.SHOW_ALERT
      }),

      async sendPaymentMethod(item, change) {
        this.loading = true

        const params = {
          departureId: this.order.departureId,
          payment: {
            type: item.type,
            cardId: item.cardId,
            constantChoice: change
          }
        }

        try {
          const { result, payment } = await api.client.changeOrderPayment(params)

          if (result) {
            this.changeOrderPaymentType({orderId: this.order.departureId, details: [ payment ]})
            this.showPaymentSelect = false

            this.showAlert({ view: 'message', text: 'Способ оплаты был изменен', timer: 3000, type: 'success' })

            if (change) {
              setTimeout(() => {
                if (item.type === 1) {
                  this.showAlert({ view: 'message', text: 'Все будущие заказы оплачиваются по-умолчанию картой, вы можете поменять это в любой момент', timer: 5000, type: 'success' })
                } else {
                  this.showAlert({ view: 'message', text: 'Все будущие заказы оплачиваются по-умолчанию наличными, вы можете поменять это в любой момент', timer: 5000, type: 'success' })
                }
              }, 3000)
            }

          } else {
            this.showAlert({ view: 'message', text: 'Произошла ошибка, способ оплаты не был изменен', timer: 3000, type: 'error' })
          }

          this.loading = false
        } catch (error) {
          this.loading = false
          this.showAlert({ view: 'message', text: 'Произошла ошибка, способ оплаты не был изменен', timer: 3000, type: 'error' })

          this.defineError({
            error: error,
            name: 'changeOrderPayment',
            params: params
          })
        }
      },

      changePaymentMethod(item) {
        if (item.type === 0) {
          this.showPaymentSelect = false
          this.showModal = true
          this.paymentItem = item
        }

        if (item.type === 1) {
          if (this.order.payment.details[0].type === 1) {
            this.showPaymentSelect = false
            this.showModal = true
            this.paymentItem = item
          } else {
            this.sendPaymentMethod(item, true)
          }
        }
      },

      setMethodCard(value) {
        this.showModal = false

        this.sendPaymentMethod(this.paymentItem, value)
      },

      closePaymentSelect() {
        this.showPaymentSelect = false
      },

      openPaymentSelect(e) {
        this.coordinate = e.currentTarget.getBoundingClientRect()
        this.showPaymentSelect = true
      },

      payOrder() {
        if (this.newPaymentMethod) {
          this.addCard(this.order.departureId)
        } else {
          this.addPayment({orderId: this.order.departureId})
        }
      },

      closeModal() {
        this.showModal = false

        this.sendPaymentMethod({
          type: 0,
          cardId: ''
        }, false)
      }
    }
  }
</script>

<style scoped>
  @import "../../css/variables.css";
  @import "../../css/components/button.css";

  .order-payment {
    &__list {
      margin: 0 0 10px;
      padding: 0;
    }

    &__item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #dfd1c4;
      font-size: 14px;
      line-height: 19px;
      list-style: none;
      color: var(--brand-color-brown);

      @media (--tablet) {
        padding-top: 15px;
        padding-bottom: 15px;
      }

      @media (--desktop) {
        font-size: 16px;
      }

      &:last-child {
        border-bottom: none;
      }
    }

    &__item-price {
      color: var(--brand-color-orange);
    }

    &__select-wrap {
      position: relative;
    }

    &__select-text {
      font-size: 14px;
      text-decoration: underline;
      color: #692f17;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      &:focus {
        outline: none;
      }
    }

    &__select-button {
      display: block;
      width: 100%;
      padding: 10px;
      font-size: 14px;
      color: #fff;
      border: none;
      background-color: var(--brand-color-orange);
      border-radius: 3px;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        width: auto;
        padding: 10px 20px;
      }

      @media (--desktop) {
        padding: 10px 38px;
      }

      &:focus {
        background-color: var(--brand-color-orange);
        outline: none;
      }

      &:hover {
        @media (--tablet) {
          background-color: var(--button-hover);
        }
      }

      &:disabled {
        opacity: 0.5;
      }
    }

    &__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__note {
      font-size: 14px;
      color: #8e8d8d;
    }

    &__popup {
      display: flex;
      flex-wrap: wrap;
      padding-left: 15px;
      padding-right: 15px;

      &-text {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 20px;
        text-align: center;
        font-family: var(--base-font-family);
        font-size: 14px;
        line-height: 1.3em;
        font-weight: 400;
        color: #353535;
      }

      &-btn {
        width: calc(50% - 10px);
        margin-right: 20px;
        background-color: #ff5a19;

        &:last-of-type {
          margin-right: 0;
        }
      }
    }

    &__loading {
      position: fixed;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.1);
      right: 0;
      bottom: 0;
      z-index: 1000;
      display: flex;
    }
  }

  .order {
    &__payment-row {
      display: flex;
      align-items: center;
    }

    &__payment-icon {
      margin-right: 10px;
    }
  }
</style>
