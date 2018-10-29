<template>
  <div class="alert" :style="{ position: alertPosition }">
    <component class="alert__item" v-for="item in components" :key="item.key" :theKey="item.key"  :is="item.view" :text="item.text" :timer="item.timer" :html="item.html" :actions="item.actions" @close="close(item.key)" :style="{'background-color': color(item.type), 'z-index': zIndex(item.timer)}"/>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
  import types from '@/store/types'

  import AlertPaymentDebt from './AlertPaymentDebt'
  import AlertMessage from './AlertMessage'
  import AlertNotification from './AlertNotification'

  export default {
    name: 'Alert',

    components: {
      paymentDebt: AlertPaymentDebt,
      message: AlertMessage,
      notification: AlertNotification
    },

    computed: {
      ...mapState({
        stable: state => state.client.alert.stable,
        show: state => state.client.alert.show,
        components: state => state.client.alert.components,
      }),

      alertPosition() {
        if (this.stable) {
          return 'relative'
        }

        return 'absolute'
      }
    },

    methods: {
      ...mapMutations({
        close: types.CLOSE_ALERT
      }),

      color(type) {
        if (type === 'error') return '#ed2828'
        if (type === 'success') return '#58b874'
        if (type === 'message') return '#263239'
      },

      zIndex(timer) {
        return timer ? 1 : 0
      }
    }
  }
</script>

<style>
  .alert {
    position: relative;

    &__item {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    &__text {
      padding-right: 15px;
      font-size: 12px;
      line-height: 27px;
      color: var(--color-white);

      @media (--tablet) {
        font-size: 16px;
        line-height: 37px;
      }
    }

    &__btn {
      font-size: 12px;
      line-height: 27px;
      text-decoration: underline;
      color: var(--color-white);

      @media (--tablet) {
        font-size: 16px;
        line-height: 37px;
      }
    }
  }
</style>
