<template>
  <div
    class="alert-payment-debt"
    :class="{'alert-payment-debt--success': paymentSuccess}">

    <div class="alert-payment-debt__text">
      <template v-if="paymentError">Произошла ошибка, попробуйте другую карту</template>
      <template v-else>Нам не удалось списать {{ cardDebt }} руб.</template>
    </div>
    <div class="alert-payment-debt__wrap">
      <template>
        <button v-if="paymentCards.length" class="alert-payment-debt__button" type="button" @click='chooseCard'>Оплатить</button>
        <button v-else class="alert-payment-debt__button" type="button" @click='addPaymentCard'>Привязать карту</button>
      </template>

      <popup v-if="showPaymentSelect" :length="paymentCards.length + 1" :coordinate="coordinate" @close="showPaymentSelect = false">
        <payment-select :list="paymentCards" @select="selectPaymentCard" @close="closePaymentSelect" @add="addPaymentCard" />
      </popup>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
  import api from  'vue_components/src/api';
  import types from '@/store/types'
  import moment from 'moment'

  import Popup from '@/components/common/Popup'
  import PaymentSelect from "@/components/Payment/PaymentSelect"
  import Modal from '@/components/common/Modal'
  import ProfileModalEmail from "@/components/Profile/ProfileModalEmail"

  export default {
    name: 'AlertPaymentDebt',

    components: {
      PaymentSelect,
      Popup
    },

    data: () => ({
      paymentSuccess: false,
      paymentError: false,
      showPaymentSelect: false,
      coordinate: null,
      showForm: false
    }),

    computed: {
      ...mapState({
        cardDebt: state => state.client.payments.cardDebt
      }),

      ...mapGetters(['paymentCards']),

      selectedCard() {
        return ''
      }
    },

    methods: {
      ...mapActions(['addCard', 'fetchBalance', 'defineError']),

      ...mapMutations({
        showAlert: types.SHOW_ALERT,
        closeAlert: types.CLOSE_ALERT
      }),

      async repeatPayment(item) {
        try {
          const { result } = await api.client.changeDebtPaymentType({ cardId: item.cardId, notDeducted: true })

          if (result) {
            this.showAlert({ view: 'message', text: `Долг погашен в размере ${this.cardDebt} руб.`, timer: 3000, type: 'success' })
            this.$emit('close')
            this.fetchBalance()
          } else {
            this.paymentError = true
          }
        } catch(error) {
          this.paymentError = true

          this.defineError({
            error: error,
            name: 'changeDebtPaymentType',
            params: { cardId: item.cardId, notDeducted: true }
          })
        }
      },

      chooseCard(e) {
        this.coordinate = e.currentTarget.getBoundingClientRect()

        this.showPaymentSelect = true
      },

      closePaymentSelect() {
        this.showPaymentSelect = false
      },

      selectPaymentCard(item) {
        this.closePaymentSelect()
        this.repeatPayment(item)
      },

      addPaymentCard() {
        this.addCard()
      }
    }
  }
</script>

<style>
  @import "../../../css/variables.css";

  .alert-payment-debt {
    display: flex;
    align-items: center;
    text-align: left;
    width: 100%;
    height: 100%;
    padding-left: 10px;
    padding-right: 30px;
    box-sizing: border-box;

    @media (--tablet) {
      justify-content: center;
      text-align: center;
      font-size: 14px;
      padding-left: 20px;
    }

    &--success {
      background-color: var(--color-green);
    }

    &__text {
      font-family: var(--base-font-family);
      font-size: 12px;
      color: #ffffff;

      @media (--tablet) {
        font-size: 14px;
      }
    }

    &__button {
      position: relative;
      margin-left: 10px;
      text-decoration: underline;
      font-size: 12px;
      color: #ffffff;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      &:focus {
        outline: none;
      }

      @media (--tablet) {
        font-size: 14px;
      }
    }

    &__wrap {
      position: relative;
    }

    &__select {
      position: absolute;
      top: 10px;
      right: 0;
    }

    &__modal {
      padding: 80px 20px;
    }
  }
</style>
