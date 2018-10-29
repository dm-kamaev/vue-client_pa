<template>
  <form @submit.prevent="submit" class="order-review-form">
    <h2 class="order-review-form__title title">Оценка за заказ {{ orderDate }}</h2>
    <section class="order-review-form__section">
      <p class="order-review-form__text text">Оценкой Вы можете выразить благодарность Домовенку или подсказать нам, что можно сделать лучше? Спасибо!</p>
    </section>

    <section class="order-review-form__section">
      <stars-input v-model="rating"/>
    </section>

    <section class="order-review-form__section">
      <textarea ref="textarea" class="order-review-form__textarea  textarea" placeholder="Напишите ваши пожелания..."></textarea>
    </section>

    <section class="order-review-form__section">
      <label class="custom-checkbox" :class="{'custom-checkbox--checked': publish}">
        <input type="checkbox" class="custom-checkbox__input" name="publish" v-model="publish">
        <span class="custom-checkbox__text">Публиковать отзыв</span>
        <span class="custom-checkbox__check"></span>
        <span class="custom-checkbox__indicator"></span>
      </label>
    </section>

    <p v-if="reviewOrderError" class="order-review-form__error">Ошибка, повторите попытку позднее</p>

    <button class="order-review-form__button button" type="submit" :disabled="buttonDisabled">
      <template v-if="reviewOrderLoading">Отправка...</template>
      <template v-else>Оценить</template>
    </button>
  </form>
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'
  import api from 'vue_components/src/api/index'
  import types from '@/store/types'
  import moment from 'moment'
  import analytic from '@/store/common/analytic'
  import _ from 'lodash'

  import StarsInput from '@/components/common/Stars/StarsInput'

  export default {
    name: 'OrderReviewForm',

    components: {
      StarsInput
    },

    props: {
      order: {
        type: Object,
        required: true
      },

      value: {
        type: Boolean,
        required: true
      }
    },

    data: () => ({
      rating: 0,
      reviewOrderLoading: false,
      reviewOrderError: false,
      buttonDisabled: true,
      publish: false
    }),

    computed: {
      orderDate() {
        return moment.parseZone(moment.utc(this.order.date).utcOffset(this.order.timeZone)).format('D MMMM')
      }
    },

    methods: {
      ...mapMutations({
        setOrderReview: types.SET_ORDER_REVIEW
      }),

      ...mapActions(['defineError']),

      async setReview() {
        const params = {
          "departureId": this.order.departureId,
          "note": this.$refs.textarea.value,
          "scores": [
            {
              "param": "quality",
              "value": this.rating
            }
          ],
          "submitObject": 'input'
        }

        try {
          await api.client.setOrderReview(params)

          this.setOrderReview({ orderId: this.order.departureId, value: this.rating})
        } catch (error) {
          this.defineError({
            error: error,
            name: 'setOrderReview',
            params: params
          })
        }
      },

      setReviewThrottle: _.throttle(function() {
        this.setReview()
      }, 300),

      async submit() {
        if (this.rating !== 0) {
          this.reviewOrderLoading = true

          const params = {
            "departureId": this.order.departureId,
            "note": this.$refs.textarea.value,
            "scores": [
              {
                "param": "quality",
                "value": this.rating
              }
            ],
            "submitObject": 'form',
            "publish": this.publish
          }

          try {
            await api.client.setOrderReview(params)

            this.setOrderReview({ orderId: this.order.departureId, value: this.rating})

            analytic.sendEvent({name: "form", value: "review_submit", ga_action: "open"}, ['ga', 'af', 'fb']);

            this.$emit('input', true)
          } catch(error) {
            this.reviewOrderLoading = false
            this.reviewOrderError = true

            this.defineError({
              error: error,
              name: 'setOrderReview',
              params: params
            })
          }
        }
      }
    },

    watch: {
      rating: function () {
        this.buttonDisabled = false
        this.setReviewThrottle()
      }
    }
  }
</script>

<style scoped>
  @import "../../../css/variables.css";
  @import "../../../css/components/title.css";
  @import "../../../css/components/text.css";
  @import "../../../css/components/textarea.css";
  @import "../../../css/components/button.css";

  .order-review-form {
    width: 280px;
    margin-left: auto;
    margin-right: auto;
    @media (--tablet) {
      width: 400px;
    }

    &__title {
      text-align: center;
      color: #000000;
      margin-bottom: 15px;
    }

    &__error {
      margin-bottom: 10px;
      text-align: center;
      color: var(--color-red);
    }

    &__text {
      color: #000000;
      line-height: 20px;
      text-align: center;
    }

    &__section {
      margin-bottom: 20px;
    }

    &__textarea {
      color: #000000;
      width: 280px;
      display: block;
      padding: 10px;
      margin: auto;
      height: 80px;

      @media (--tablet) {
        width: 350px;
      }
    }

    &__button {
      margin: auto;
    }
  }

</style>

<style>
  @import "../../../css/variables.css";

  .custom-checkbox {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;
    color: #000;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

    @media (--tablet) {
      margin-left: 25px;
      font-size: 16px;
    }

    &:hover {
      & .custom-checkbox__indicator {
        border-color: #ff5a19;
      }
    }

    &--checked {
      & .custom-checkbox__indicator {
        border-color: #ff5a19;
      }

      & .custom-checkbox__check {
        background-image: url("./img/check.svg");
      }
    }

    &__text {
      width: calc(100% - 40px);
      font-size: 14px;
      line-height: 17px;

      @media (--tablet) {
        font-size: 16px;
      }
    }

    &__indicator {
      position: relative;
      display: block;
      -webkit-align-self: center;
      -ms-grid-row-align: center;
      align-self: center;
      width: 20px;
      height: 20px;
      background-color: #ffff;
      border: 1px solid #cbc9c9;
      border-radius: 3px;
    }

    &__check {
      position: absolute;
      top: 5px;
      left: 5px;
      z-index: 1;
      width: 12px;
      height: 12px;
      background-repeat: no-repeat;
      background-position: center;
    }

    &__input {
      opacity: 0;
      position: absolute;
      left: 0;
      width: 22px;
      height: 22px;
      padding: 0;
    }
  }
</style>
