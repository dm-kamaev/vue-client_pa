<template>
  <div class="application-town">
    <application-header @backwards="orderPrevStep">
        Выберите город
    </application-header>

    <div class="application-town__content">
      <swiper class="application-town__carousel" :options="options" ref="carouselDate">
        <swiper-slide v-for="(item, index) in list" :key="item.value" class="application-town__carousel-item" >
          <div class="application-town__carousel-card" :class="`application-town__carousel-card--${item.value}`" @click="set(index)">
            <p class="application-town__carousel-text">{{ item.text }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>

  </div>
</template>

<script>
  import analytic from '@/store/common/analytic'
  import { mapActions, mapMutations } from 'vuex'
  import types from '@/store/types'

  import ApplicationHeader from '../../ApplicationHeader'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    name: 'ApplicationTown',

    components: {
      ApplicationHeader,
      swiper,
      swiperSlide
    },

    data: () => ({
      list: [
        {
          text: 'Москва',
          value: 'moscow'
        },
        {
          text: 'Санкт Петербург',
          value: 'spb'
        },
        {
          text: 'Нижний Новгород',
          value: 'nn'
        }
      ]
    }),

    computed: {
      options() {
        return {
          direction: 'horizontal',
          slidesPerView: "auto",
          clickable: true,
          initialSlide: 0
        }
      },
    },

    methods: {
      ...mapMutations({
        setTown: types.ORDER_SET_TOWN,
        setView: types.ORDER_SET_CURRENT_VIEW
      }),

      ...mapActions(['signOut', 'checkOrderRoute', 'orderNextStep', 'orderPrevStep']),

      set(index) {
        this.setTown(this.list[index].value)
        this.orderNextStep()
      },

      goToAuth() {
        analytic.sendEvent({name: "form", value: "order_new_already_client", ga_action: "open"}, ['ga', 'af', 'fb'])
        this.signOut()
      }
    },

    mounted() {
      this.setView('town')
      analytic.sendEvent({name: "form", value: "order_new_town", ga_action: "open"}, ['ga', 'af', 'fb'])
    }
  }
</script>

<style>
  @import "../../../../css/variables.css";

  .application-town {
    &__carousel {
      @media (--tablet) {
        padding: 0;
      }

      & .swiper-wrapper {
        @media (--desktop) {
          justify-content: center;
        }
      }

      &-item {
        width: 245px;
        margin-right: 20px;

        &:first-of-type {
          margin-left: 20px;

          @media (--tablet) {
            margin-left: auto;
          }
        }

        &:last-of-type {
          @media (--tablet) {
            margin-right: auto;
          }
        }
      }

      &-card {
        display: flex;
        align-items: flex-end;
        background-color: #f2f2f2;
        justify-content: center;
        height: 365px;
        cursor: pointer;
        user-select: none;
        -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

        &--moscow {
          background-image: url("./img/moscow-mobile@1x.jpg");
          background-repeat: no-repeat;
          background-size: cover;

          @media (min-width: 320px) and (min-resolution: 144dpi), (min-width: 320px) and (min-resolution: 1.5dppx) {
            background-image: url("./img/moscow-mobile@2x.jpg");
            background-size: cover;
          }
        }

        &--spb {
          background-image: url("./img/spb-mobile@1x.jpg");
          background-repeat: no-repeat;
          background-size: cover;

          @media (min-width: 320px) and (min-resolution: 144dpi), (min-width: 320px) and (min-resolution: 1.5dppx) {
            background-image: url("./img/spb-mobile@2x.jpg");
            background-size: cover;
          }
        }

        &--nn {
          background-image: url("./img/nn-mobile@1x.jpg");
          background-repeat: no-repeat;
          background-size: cover;

          @media (min-width: 320px) and (min-resolution: 144dpi), (min-width: 320px) and (min-resolution: 1.5dppx) {
            background-image: url("./img/nn-mobile@2x.jpg");
            background-size: cover;
          }
        }
      }

      &-text {
        margin-bottom: 25px;
        font-size: 18px;
        font-weight: 600;
        color: #ffffff;
        user-select: none;
        -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
      }
    }
  }
</style>
