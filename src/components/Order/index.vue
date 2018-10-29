<template>
  <loader v-if="loading" />

  <div class="wrap" v-else-if="loaded">
    <order-details :order="details" />
  </div>

  <error-fetch v-else-if="error" />
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import types from '@/store/types'
  import 'lodash'
  import PerfectScrollbar from 'perfect-scrollbar';

  import Loader from '@/components/common/Loader'
  import ErrorFetch from '@/components/common/Error/ErrorFetch'
  import OrderDetails from '@/components/Order/OrderDetails'

  import transform from '@/utils/transform'

  export default {
    name: 'Order',

    components: {
      Loader,
      ErrorFetch,
      OrderDetails
    },

    props: {
      orderId: {
        type: String,
        required: true
      }
    },

    data: () => ({
      statusCode: 1,
      rating: 3
    }),

    computed: {
      ..._.mapValues(mapGetters({
        loading: 'orderDetailsLoading',
        loaded: 'orderDetailsLoaded',
        error: 'orderDetailsError',
        details: 'orderDetails'
      }), item => function (...rest) {
        return item.call(this, rest)(transform(this.orderId))
      })
    },

    methods: {
      ...mapMutations({
        setOrdId: types.SET_CURRENT_ORDER
      }),

      ...mapActions(['getOrderDetails']),

      checkAndLoad() {
        if (!this.loading) {
          this.getOrderDetails(transform(this.orderId))
        }
      },

      prevLink() {
        const currentPath = this.$route.path

        this.$router.push(currentPath.split('/').slice(null, -1).join('/'))
      }
    },

    created() {
      this.checkAndLoad()

      let orderId = transform(this.orderId)
      this.setOrdId({ orderId })
    },

    watch: {
      orderId() {
        this.checkAndLoad()

        let orderId = transform(this.orderId)
        this.setOrdId({ orderId })
      }
    }
  }
</script>

<style>
  @import "./../../css/components/v-bar.css";

  .wrap {
    height: 100%;
  }
</style>

