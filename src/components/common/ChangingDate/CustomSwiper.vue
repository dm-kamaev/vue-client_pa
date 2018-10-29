<template>
  <swiper class="carousel" :options="options" ref="carousel" @slideChange="slideChange">
    <swiper-slide  v-for="(item, index) in list" key="index" class="carousel__item">{{ item }}</swiper-slide>
  </swiper>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    name: 'CustomSwiper',

    components: {
      swiper,
      swiperSlide
    },

    props: {
      options: {
        type: Object,
        required: true
      },

      list: {
        type: Array,
        required: true
      }
    },

    methods: {
      slideChange() {
        this.$emit('slideChange', this.$refs.carousel.swiper.activeIndex)
      }
    },

    mounted() {
      this.$emit('init')
      this.$emit('slideChange', this.options.initialSlide)
    }
  }
</script>


<style scoped>
  @import "../../../css/variables.css";
  @import "../../../css/components/text.css";

  .carousel {
    margin-bottom: 20px;
    width: 300px;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

    @media (--tablet) {
      width: 100%;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &__text {
      color: #000000;
      text-align: center;
      height: 45px;
      line-height: 45px;
      vertical-align: middle;
    }

    &__item {
      width: 20%;
      box-sizing: border-box;
      height: 45px;
      font-size: 14px;
      line-height: 45px;
      text-align: center;
      color: #000000;
      text-transform: uppercase;
      border: 1px solid #d5cec2;
      border-right: 1px solid transparent;

      &:last-child {
        border-right: 1px solid #d5cec2;
      }
    }
  }

  .carousel-container {
    height: 110px;
    width: 100%;
  }

  .swiper-slide {
    width: 20%;
    text-align: center;
  }

  .swiper-slide-active {
    border: 1px solid var(--brand-color-orange);

    &:last-child {
      border-right: 1px solid var(--brand-color-orange);
    }
  }

  .swiper-slide-next {
    border-left: 1px solid transparent;
  }
</style>
