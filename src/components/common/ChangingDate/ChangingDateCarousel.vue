<template>
  <div class="carousel-container">
    <template>
      <loader v-if="load.date.loading"/>

      <custom-swiper v-else-if="load.date.loaded && dateArray.length" :list="filterDateArray" :options="dateOptions" @init='initDate' @slideChange="slideChangeDate"/>

      <error-fetch v-else="load.date.error"/>
    </template>

    <template>
      <loader v-if="load.date.loading || load.time.loading"/>

      <custom-swiper v-else-if="load.time.loaded && timesArray.length" :list="filterTimesArray" :options="timeOptions" @init='initTime' @slideChange="slideChangeTime"/>

      <p v-else-if="!timesArray.length" class="carousel__text text" v-else>Нет доступного времени</p>

      <error-fetch v-else-if="load.time.error"/>
    </template>
  </div>
</template>

<script>
  import Loader from '@/components/common/Loader'
  import ErrorFetch from '@/components/common/Error/ErrorFetch'
  import CustomSwiper from "./CustomSwiper";

  export default {
    name: 'ChangingDateCarousel',

    components: {
      CustomSwiper,
      Loader,
      ErrorFetch
    },

    props: {
      timesArray: {
        type: Array,
        required: true
      },

      dateArray: {
        type: Array,
        required: true
      },

      dateIndex: {
        type: Number,
        required: true
      },

      timeIndex: {
        type: Number,
        required: true
      },

      load: {
        type: Object,
        required: true
      },

      slidesPerView: {
        type: Number | String
      }
    },

    data: () => ({
      dateActive: false,
      timeActive: false,
      dateActiveIndex: 0,
      timeActiveIndex: 0,
      dateTitle: 'title',
      timeTitle: 'text'
    }),

    computed: {
      timeOptions() {
        return {
          slidesPerView: 5,
          centeredSlides: true,
          slideToClickedSlide: true,
          initialSlide: this.timeIndex
        }
      },

      dateOptions() {
        return {
          slidesPerView: 5,
          centeredSlides: true,
          slideToClickedSlide: true,
          initialSlide: this.dateIndex
        }
      },

      filterDateArray() {
        const arr = []

        this.dateArray.forEach((item) => {
          arr.push(item.text)
        })

        return arr
      },

      filterTimesArray() {
        const arr = []

        this.timesArray.forEach((item) => {
          arr.push(item.title)
        })

        return arr
      },

      activeDate() {
        const obj = {
          date: '',
          time: ''
        }

        if (this.dateArray.length) {
          obj.date = this.dateArray[this.dateActiveIndex].value
        }

        if (this.timesArray.length) {
          obj.time = this.timesArray[this.timeActiveIndex].title
        }

        return obj
      },
    },

    methods: {
      slideChangeDate(value) {
        this.dateActiveIndex = value
        this.$emit('setDate', this.activeDate)
      },

      slideChangeTime(value) {
        this.timeActiveIndex = value
        this.$emit('setDate', this.activeDate)
      },

      initDate() {
        this.dateActive = true
      },

      initTime() {
        this.timeActive = true
      }
    },

    mounted() {
      if (this.slidesPerView) {
        this.dateOptions.slidesPerView = this.slidesPerView
        this.timeOptions.slidesPerView = this.slidesPerView
      }
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
