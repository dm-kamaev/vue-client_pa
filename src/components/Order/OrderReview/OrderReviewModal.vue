<template>
  <div class="order-review-modal">
    <order-review-form v-if="!review" :order="order" v-model="review"/>

    <template v-else>
      <order-review-improvement v-if="order.rating < 5" @close="close" :order="order"/>

      <template v-else>
        <order-review-invite-friends v-if="!showInviteFriend"/>

        <order-review-client-rating v-else/>
      </template>
    </template>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  import types from '@/store/types'
  import 'lodash'


  import OrderReviewForm from '@/components/Order/OrderReview/OrderReviewForm'
  import OrderReviewClientRating from "@/components/Order/OrderReview/OrderReviewClientRating.vue";
  import OrderReviewInviteFriends from "@/components/Order/OrderReview/OrderReviewInviteFriends.vue";
  import OrderReviewImprovement from "@/components/Order/OrderReview/OrderReviewImprovement.vue";

  export default {
    name: 'OrderReviewModal',

    components: {
      OrderReviewImprovement,
      OrderReviewInviteFriends,
      OrderReviewClientRating,
      OrderReviewForm
    },

    props: {
      order: {
        type: Object,
        required: true
      }
    },

    data: () => ({
      review: false
    }),

    computed: {
      ...mapState({
        numberOfReviews: state => state.client.numberOfReviews,
        reviewsRating: state => state.client.reviewsRating
      }),

      showInviteFriend() {
        if (Number(this.numberOfReviews) % 2 === 0 && this.numberOfReviews) {
          return false
        }
      }
    },

    methods: {
      close() {
        this.$emit('close')
      }
    },

    watch: {
      review() {
        if (this.review) {
          this.$emit('reviewed')
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../../css/variables.css";
  @import "../../../css/components/title.css";
  @import "../../../css/components/text.css";
  @import "../../../css/components/button.css";
  @import "../../../css/components/checkbox.css";
  @import "../../../css/components/input.css";

  .order-review-modal {
    padding: 30px 20px;

    @media (--tablet) {
      padding: 40px;
    }

    @media (--desktop) {
      padding: 50px;
    }

    &__title {
      margin-bottom: 20px;
    }

    &__text {
      line-height: 20px;
    }

    &__row {
      margin-bottom: 15px;
    }

    &__label {
      display: block;
      margin-bottom: 10px;
    }

    &__button {
      margin: 30px auto 0;
    }
  }
</style>
