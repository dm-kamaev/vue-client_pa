<template>
  <div v-if="isMonthCorrect" class="payment-details">
    <button-close @closeHandler="prevLink"/>
    <p class="payment-details__title title">Детализация за {{ month | date('MMMM YYYY') }}</p>
    <loader v-if="loading"/>
    <error-fetch v-else-if="error"/>
    <payment-details-list v-else-if="loaded" :details="history"/>
  </div>

  <error v-else>
    Неверный месяц
  </error>
</template>

<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
  import moment from 'moment'
  import { paymentsHistoryMixin } from '@/components/Payment/mixin'
  import Loader from '@/components/common/Loader'
  import ErrorComponent from '@/components/common/Error'
  import ErrorFetch from '@/components/common/Error/ErrorFetch'
  import PaymentDetailsList from "@/components/Payment/PaymentDetails/PaymentDetailsList"
  import ButtonClose from "@/components/common/ButtonClose"

  export default {
    name: 'PaymentDetails',

    props: [
      'monthAsStringProp'
    ],

    computed: {
      monthAsString() {
        return this.monthAsStringProp.replace('.', '')
      },
    },

    methods: {
      prevLink() {
        const currentPath = this.$route.path

        this.$router.push(currentPath.split('/').slice(null, -1).join('/'))
      }
    },

    components: {
      PaymentDetailsList,
      ButtonClose,
      Loader,
      Error: ErrorComponent,
      ErrorFetch
    },

    mixins: [paymentsHistoryMixin]
  }
</script>

<style scoped>
  @import "../../../css/variables.css";
  @import "../../../css/components/title.css";

  .payment-details {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    padding-bottom: 0;
    height: calc(100% - 30px);

    &__title {
      margin-bottom: 20px;
      margin-left: 7.8%;

      @media (--tablet) {
        margin-bottom: 30px;
      }
    }

    &__item {
      display: flex;
      justify-content: space-between;
      padding: 25px 30px;
      padding-right: 7.8%;
      padding-left: 7.8%;
      border-bottom: 1px solid #dfd1c4;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      &:first-child {
        border-top: 1px solid #dfd1c4;
      }

      &--active {
        @media (--tablet) {
          background-color: var(--bg-dark);
        }

        &:hover {
          @media (--desktop) {
            background-color: var(--bg-dark);
          }
        }
      }
    }

    &__col-right {
      display: flex;
    }

    &__text {
      margin-bottom: 5px;
      font-size: var(--font-size-sm);
      color: var(--text-color);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
