<template>
  <div ref="orders" class="orders">
    <header class="orders__header">
      <div v-if="!mobile" class="orders__row">
        <p class="orders__title">Заказы</p>

        <router-link
          class="orders__link"
          :to="`/order?path=${currentPath}`">+ Добавить новый</router-link>
      </div>

      <custom-select
        v-if="activeAddress"
        class="orders__select"
        :options="objects"
        label="addressTitle"
        :value="activeAddress"
        @input="changeObject"
      />

      <orders-filter
        v-if="status"
        :list="filter"
        :value="status"
        @changeStatus="changeStatus"
      />
    </header>

    <div v-if="list.length" class="orders__content">
      <orders-list
        :list="list"
        :objectId="objectId"
        @update="getOrderListByDirection"
      />

      <loader v-if="loading"/>
    </div>

    <button v-if="mobile && !showForm" @click="$router.push(`/order?path=${currentPath}`)" class="orders__contact-btn" type="button">
      <svg class="contact-btn__image" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
        <rect width="30" height="30" fill="none"></rect>
        <line x1="15" y1="1.5" x2="15" y2="28.5" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line>
        <line x1="1.5" y1="15" x2="28.5" y2="15" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"></line>
      </svg>
    </button>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  import types from '@/store/types'
  import 'lodash'
  import moment from 'moment'

  import transform from '@/utils/transform'
  import analytic from '@/store/common/analytic'
  import CustomSelect from "@/components/common/CustomSelect"
  import OrdersFilter from '@/components/Orders/OrdersFilter'
  import OrdersList from '@/components/Orders/OrdersList'
  import Loader from '@/components/common/Loader'
  import Modal from '@/components/common/Modal'
  import { statusesTitlesEng } from '@/components/Order/orderStatus'

  export default {
    name: 'Orders',

    components: {
      OrdersFilter,
      OrdersList,
      Modal,
      Loader,
      CustomSelect
    },

    props: {
      objectId: {
        type: String,
        required: true
      }
    },

    data: () => ({
      filter: [
        {
          name: 'Актуальные',
          status: '1',
          key: 'active'
        },
        {
          name: 'Выполненные',
          status: '2',
          key: 'completed'
        }
      ],
      showForm: false,
      activeAddress: null
    }),

    computed: {
      objects() {
        const list = []

        for (let key in this.$store.state.client.objects) {
          list.push(this.$store.state.client.objects[key])
        }

        return list
      },

      active() {
        let index = 0;

        this.objects.forEach((item, i) => {

          if (this.objectId === transform(item.objectId)) {
            index = i
          }
        })

        return this.objects[index];
      },

      mobile() {
        return this.$store.state.common.isMobile
      },

      orderId() {
        return transform(this.$route.params.right.slice(3))
      },

      currentPath() {
        return this.$store.state.route.path
      },

      ..._.mapValues(mapGetters({
        loading: 'ordersLoading',
        loaded: 'ordersLoaded',
        list: 'orderList'
      }), item => function (...rest) {
        return item.call(this, rest)(transform(this.objectId), this.status)
      }),

      ...mapState({
        order: state => state.client.currentOrder,
        status: state => state.client.orders.status
      }),

      currentPath() {
        return this.$store.state.route.path
      },
    },

    methods: {
      getOrderList(orderId, direction) {
        const objectId = transform(this.objectId);

        this.getOrders({ objectId, status: this.status, key: orderId, direction: direction })
      },

      getOrderListByDirection(param) {
        let direction = param.direction
        const objectId = transform(this.objectId);

        if (this.status.active) {
          if (param.direction <= 0 ) {
            direction = 1
          }

          if (param.direction >= 0 ) {
            direction = -1
          }
        }

        this.getOrders({ objectId, status: this.status, key: param.orderId, direction: direction })
      },

      changeObject(item) {
        if (item.departureId && !this.mobile) {
          this.$router.push(`/adr${transform(item.objectId)}/ord${transform(item.departureId)}`)
        } else {
          this.$router.push(`/adr${transform(item.objectId)}`)
        }
      },

      changeStatus(status) {
        if (!this.loading) {
          const objectId = transform(this.objectId);

          this.getOrders({ objectId, status })
        }
      },

      ...mapActions(['getOrders']),
      ...mapMutations({
        setAddressId: types.SET_CURRENT_OBJECT,
        setStatus:  types.SET_ORDERS_STATUS
      })
    },

    watch: {
      objectId() {
        this.setAddressId({ objectId: transform(this.objectId) })
        this.changeStatus(this.filter[0].key)

        this.objects.forEach((item) => {
          if (this.objectId === transform(item.objectId)) {
            this.activeAddress = item
          }
        })
      }
    },

    created() {
      if (transform(this.objectId) in this.$store.state.client.objects) {
        this.setAddressId({ objectId: transform(this.objectId) })

        if (this.$route.params.right) {
          this.getOrderList(this.orderId, 0)
        } else {
          this.changeStatus(this.filter[0].key)
        }
      } else {
        this.$router.push(`/adr${transform(this.objects[0].objectId)}`)
      }

      this.objects.forEach((item) => {
        if (this.objectId === transform(item.objectId)) {
          this.activeAddress = item
        }
      })

      if (!this.activeAddress) {
        this.activeAddress = this.objects[0]
      }
    }
  }
</script>

<style>
  @import "../../css/variables.css";

  .orders {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;

    &__title {
      font-size: 18px;
    }

    &__link {
      display: inline-block;
      color: #fd8204;
      border-bottom: 1px dashed;
      cursor: pointer;
    }

    &__row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
    }

    &__header {
      position: fixed;
      width: 100%;
      z-index: 1;

      @media (--tablet) {
        position: static;
        padding: 0 30px;
        padding-top: 30px;
        width: auto;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      height: 100%;
      margin-top: 102px;

      @media (--tablet) {
        margin-top: 0;
      }
    }

    &__contact-btn {
      position: fixed;
      display: block;
      z-index: 400;
      right: 16px;
      bottom: 16px;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      outline: none;
      background-color: var(--brand-color-orange);
      box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, .5);
      cursor: pointer;

      &:hover {
        @media (--tablet) {
          background-color: #ff9113;
        }
      }

      &:focus {
        @media (--tablet) {
          background-color: #ff9113;
        }
      }

      &:active {
        @media (--tablet) {
          background-color: var(--brand-color-orange);
        }
      }
    }

    &__select {
      & .custom-select__tag {
        border-radius: 0;
      }

      &.custom-select--open .custom-select__tag {
        border-radius: 0;
      }

      & .custom-select__list {
        border-radius: 0;
      }
    }
  }

  .contact-btn__image {
    display: block;
    margin: auto;
  }
</style>
