<template>
  <div class="order-services">
    <order-service v-for="(service, index) in services" :key="index" :service='service'/>
  </div>
</template>

<script>
  import OrderService from '@/components/Order/OrderService'

  export default {
    name: 'OrderServices',

    components: {
      OrderService
    },

    props: {
      services: {
        type: Array,
        required: true
      }
    }
  }
</script>

