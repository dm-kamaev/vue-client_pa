<template>
  <swiper class="carousel" :options="options">
    <swiper-slide  v-for="slide in services" key="" class="carousel__item">
      <service-card :service="slide" @change="change"/>
    </swiper-slide>
  </swiper>
</template>

<script>
  import ServiceCard from '@/components/calculator/ServiceCard'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    name: 'ServicesCardCarousel',

    components: {
      ServiceCard,
      swiper,
      swiperSlide
    },

    props: {
      services: {
        type: Array,
        required: true
      }
    },

    data: () => ({
      options: {
        spaceBetween: 10,
        width: 216
      }
    }),

    methods: {
      change(value) {
        this.$emit('change', value)
      }
    }
  }
</script>
