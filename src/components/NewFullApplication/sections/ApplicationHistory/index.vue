<template>
  <div class="application-history">

    <application-header @backwards="orderPrevStep">
      Новый заказ
    </application-header>

    <div class="application-history__header">
      <button class="application-history__link" @click="newOrderAndAddress">Новый заказ с новым адресом</button>
      <div class="application-history__select-wrapper">
        <custom-select class="application-history__select" :options="objects" label="addressTitle" v-model="selectedAddress"></custom-select>
      </div>
      <button class="btn  btn--small" type="button" @click="newOrder">Новый заказ</button>
    </div>

    <template v-if="orders.length && selectedAddress">
      <h2 class="application-history__title">Повторить заказ</h2>

      <div class="application-history__table">
        <application-history-item v-for="item in orders" :key="item.departureId" :order="item" @repeatOrder="repeatOrder" @loaded="orderIsLoaded"/>

        <loader v-if="!checkOrdersLoaded"/>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  import types from '@/store/types'
  import analytic from '@/store/common/analytic'

  import Loader from '@/components/common/Loader'
  import ApplicationHistoryItem from "./ApplicationHistoryItem"
  import ApplicationHeader from "../../ApplicationHeader"
  import CustomSelect from "../../CustomSelect"

  export default {

    name: 'ApplicationHistory',

    components: {
      Loader,
      CustomSelect,
      ApplicationHistoryItem,
      ApplicationHeader
    },

    data: () => ({
      selectedAddress: null,
      ordersIsLoaded: {}
    }),

    computed: {
      ...mapState({
        town: state => state.order.town,
        serviceId: state => state.order.serviceId,
        objectId: state => state.order.objectId,
        orderId: state => state.order.orderId,
      }),

      objects() {
        const list = []

        for (let key in this.$store.state.client.objects) {
          list.push(this.$store.state.client.objects[key])
        }

        return list
      },

      orders() {
        return this.list().splice(0, 10)
      },

      checkOrdersLoaded() {
        return this.orders.every((item) => {
          return item.departureId in this.ordersIsLoaded
        })
      }
    },

    methods: {
      ..._.mapValues(mapGetters({
        loading: 'ordersLoading',
        loaded: 'ordersLoaded',
        list: 'orderList'
      }), item => function (...rest) {
        return item.call(this, rest)(this.selectedAddress.objectId, 'completed')
      }),

      ...mapMutations({
        setObjectId: types.ORDER_SET_OBJECT_ID,
        setOrderId: types.ORDER_SET_ORDER_ID,
        setTown: types.ORDER_SET_TOWN,
        setServices: types.ORDER_SET_SERVICES,
        setView: types.ORDER_SET_CURRENT_VIEW,
        setPrice: types.ORDER_SET_PRICE,
        priceLoaded: types.ORDER_PRICE_LOADED,
        setServiceId: types.ORDER_SET_SERVICE_ID
      }),

      ...mapActions(['getOrders', 'orderNextStep', 'orderPrevStep']),

      repeatOrder(orderId) {
        const arr = []
        const order = this.$store.state.client.orders.entities[orderId]

        order.services.forEach((item) => {
          arr.push(item.serviceTitle)
        })

        this.setObjectId(this.selectedAddress.objectId)
        this.setTown(this.selectedAddress.city)
        this.setOrderId(orderId)
        this.setServices(arr)
        this.setPrice({ discount: order.amountWithDiscount, value: order.totalAmount })
        this.priceLoaded()

        this.orderNextStep()
      },

      newOrder() {
        this.setOrderId(null)
        this.setObjectId(this.selectedAddress.objectId)
        this.setTown(this.selectedAddress.city)

        this.orderNextStep()
      },

      newOrderAndAddress() {
        this.setOrderId(null)
        this.setObjectId(null)

        this.orderNextStep()
      },

      orderIsLoaded(key) {
        this.$set(this.ordersIsLoaded, key, true)
      }
    },

    watch: {
      selectedAddress() {
        this.getOrders({ objectId: this.selectedAddress.objectId, status: 'completed' })
      }
    },

    created() {
      this.setView('history')

      this.setTown(null)
      this.setServiceId(null)

      if (this.objectId) {
        this.objects.forEach((item) => {
          if (item.objectId === this.objectId) {
            this.selectedAddress = item
          }
        })
      } else {
        this.selectedAddress = this.objects[0]
      }
    },

    mounted() {
      analytic.sendEvent({name: "form", value: "order_new_history", ga_action: "open"}, ['ga', 'af', 'fb'])
    }
  }
</script>

<style scoped>
  @import "../../../../css/variables.css";

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    font-family: var(--base-font-family);
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
    background-color: #ff5a19;
    outline: none;
    user-select: none;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

    &--small {
      height: 43px;
      border-radius: 3px;

      @media (--tablet) {
        width: auto;
        cursor: pointer;
        padding-left: 60px;
        padding-right: 60px;
      }
    }

    &:hover {
      @media (--tablet) {
        background-color: #ff7623;
      }
    }

    &:active {
      @media (--desktop) {
        background-color: #ff5a19;
      }
    }
  }

  .application-history {

    &__header {
      padding: 0 20px 30px;

      @media (--tablet) {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        padding-bottom: 40px;
        padding-right: 0;
      }

      @media (--desktop) {
        padding-bottom: 50px;
      }
    }

    &__link {
      display: block;
      width: 100%;
      margin-bottom: 15px;
      text-align: right;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 19px;
      font-weight: 400;
      color: #ff5a19;
      cursor: pointer;
      outline: none;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      @media (--tablet) {
        width: 100%;
        margin-bottom: 20px;
      }

      @media (--desktop) {
        margin-bottom: 25px;
        font-size: 16px;
        line-height: 22px;
      }

      &:hover {
        @media (--tablet) {
          color: #ff7623;
        }
      }

      &:active {
        @media (--desktop) {
          color: #ff5a19;
        }
      }
    }

    &__select-wrapper {
      font-family: var(--base-font-family);
      margin-bottom: 20px;

      @media (--tablet) {
        width: calc(100% - 240px);
        flex-grow: 1;
        margin-bottom: 0;
        margin-right: 20px;
      }
    }

    &__title {
      margin-bottom: 25px;
      text-align: center;
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 22px;
      font-weight: 400;
      color: #353535;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        margin-bottom: 30px;
      }

      @media (--desktop) {
        margin-bottom: 40px;
        font-size: 20px;
        line-height: 27px;
      }
    }

    &__table {
      @media (--tablet) {
        padding-bottom: 20px;
      }

      @media (--desktop) {
        padding-bottom: 30px;
      }
    }
  }

</style>
