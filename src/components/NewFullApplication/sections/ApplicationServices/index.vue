<template>
  <div class="application-services">
    <template v-if="!details">
      <application-header @backwards="orderPrevStep">
        Выберите услугу
      </application-header>

      <div class="application-services__list">
        <button class="application-services__btn application-services__btn--prev" type="button"></button>
        <swiper class="carousel" :options="options">
          <swiper-slide v-for="(item, index) in services" :key="index" class="application-services__carousel-item carousel__item" >
            <application-services-item :service="config[town][item]" @showDetails="showDetails(item)" @select="set(item)" />
          </swiper-slide>
        </swiper>
        <button class="application-services__btn  application-services__btn--next" type="button"></button>
      </div>
    </template>

    <application-services-details v-else :config="detailsServiceConfig" @close="closeDetails"/>
  </div>
</template>

<script>
  import analytic from '@/store/common/analytic'
  import ApplicationServicesItem from './ApplicationServicesItem'
  import ApplicationServicesDetails from './ApplicationServicesDetails'
  import ApplicationHeader from "../../ApplicationHeader"
  import { mapMutations, mapState, mapActions } from 'vuex'
  import types from '@/store/types'
  import config from './serviceDetails'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {

    name: 'ApplicationServices',

    components: {
      ApplicationServicesItem,
      ApplicationServicesDetails,
      ApplicationHeader,
      swiper,
      swiperSlide
    },

    data: () => ({
      config: config,
      details: false,
      detailsService: null
    }),

    computed: {
      ...mapState({
        town: state => state.order.town,
        listServices: state => state.services.listServicesWorks
      }),

      options() {
        return {
          direction: 'horizontal',
          slidesPerView: "auto",
          clickable: true,
          spaceBetween: 30,
          navigation: {
            nextEl: '.application-services__btn--next',
            prevEl: '.application-services__btn--prev',
          },
        }
      },

      detailsServiceConfig() {
        if (this.detailsService) {
          return this.listServices[this.detailsService]
        }

        return null
      },

      services() {
        return this.$store.state.services.servicesByTown[this.town][0].services.map((item) => {
          return item.value
        })
      },
    },

    methods: {
      ...mapMutations({
        setServiceId: types.ORDER_SET_SERVICE_ID,
        setView: types.ORDER_SET_CURRENT_VIEW
      }),

      ...mapActions(['orderNextStep', 'checkOrderRoute', 'orderPrevStep']),

      showDetails(key) {
        if (this.listServices[key]) {
          this.details = true
          this.detailsService = key
        }
      },

      closeDetails() {
        this.details = false
        this.detailsService = null
      },

      set(key) {
        this.setServiceId(key)

        this.orderNextStep()
      }
    },


    mounted() {
      this.setView('services')
      analytic.sendEvent({name: "form", value: "order_new_services", ga_action: "open"}, ['ga', 'af', 'fb'])
    }
  }
</script>

<style>
  @import "../../../../css/variables.css";

  .application-services {

    &__list {
      position: relative;
      padding-left: 20px;

      @media (--tablet) {
        padding-left: 0;
      }

      @media (--desktop) {
        display: flex;
        align-items: center;
        padding: 0 25px;
      }
    }

    &__btn {
      display: none;
      outline: none;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      @media (--desktop) {
        position: absolute;
        top: 50%;
        display: block;
        width: 15px;
        height: 24px;
        padding: 7px;
        background: url("img/arrow.svg") no-repeat 0 0;
        background-size: contain;
      }

      &--prev {
        @media (--desktop) {
          left: -5px;
          transform: translateY(-50%);
        }
      }

      &--next {
        @media (--desktop) {
          right: -5px;
          transform: translateY(-50%) rotate(180deg);
        }
      }

      &:hover {
        @media (--desktop) {
          opacity: 0.7;
        }
      }

      &:focus {
        @media (--desktop) {
          opacity: 0.7;
        }
      }

      &:active {
        @media (--desktop) {
          opacity: 1;
        }
      }
    }

    &__carousel-item {
      width: 245px;
    }
  }

  .swiper-button-disabled {
    opacity: 0.7;
  }

</style>
