<template>
  <div>
    <rating-stars v-if="order.review" :rating="order.rating" />

    <button v-else @click="open" class="button">Оценить заказ</button>

    <modal v-if="show" :show="show" @close="closeModal">
      <order-review-modal @close="closeModal" :order="order" @reviewed="reviewed"/>
    </modal>
  </div>
</template>

<script>
  import RatingStars from '@/components/common/Stars/Stars'
  import Modal from '@/components/common/Modal'
  import OrderReviewModal from '@/components/Order/OrderReview/OrderReviewModal'
  import api from 'vue_components/src/api/index'
  import analytic from '@/store/common/analytic'

  export default {
    name: 'OrderReview',

    components: {
      RatingStars,
      Modal,
      OrderReviewModal
    },

    props: {
      order: {
        type: Object,
        required: true
      }
    },

    data: () => ({
      show: false,
      review: false
    }),

    methods: {

      open(){
        this.show = true

        if (this.$store.state.route.hash !== '#review') {
          location.hash = '#review';
        }

        analytic.sendEvent({name: "button", value: "review_btn_show", ga_action: "open"}, ['ga', 'af', 'fb']);
      },

      closeModal() {
        this.show = false

        if (location.hash === '#review') {
          location.hash = ''
          history.pushState('', document.title, window.location.pathname)
        }

        if (!this.review) {
          this.sendRefuse()
        }
      },

      reviewed() {
        this.review = true
      },

      async sendRefuse() {
        const params = {
          "departureId": this.order.departureId,
          "rejected": true
        }

        try {
          await api.client.setOrderReview(params)
        } catch(error) {
          this.defineError({
            error: error,
            name: 'setOrderReview',
            params: params
          })
        }
      }
    },

    mounted() {
      if (this.$store.state.route.hash === '#review' && !this.order.review) {
        this.show = true
      }
    }
  }
</script>

<style>
  @import "../../../css/components/button.css";

</style>
