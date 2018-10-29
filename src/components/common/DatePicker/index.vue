<template>
  <div class="date-picker">
    <div class="date-picker__inner">

      <div
        class="date-picker__fix-column"
        style=""
      >

        <div class="date-picker__cell  date-picker__cell--month">
          {{ month }}
        </div>

        <swiper v-if="!desktop" ref="swiper" class="date-picker__swiper date-picker__swiper--fixed" :options="options">
          <swiper-slide v-for="item in dates"
                        :key="item.format('D.MM dd')"
                        class="date-picker__slide">

            <div class="date-picker__cell date-picker__cell--header">
              <span>{{ item.format('D') }}<br>
                    {{ item.format('dd') }}</span>
            </div>

          </swiper-slide>
        </swiper>

        <div v-else v-for="item in dates"
                      :key="item.format('D.MM dd')"
                      class="date-picker__slide">

          <div class="date-picker__cell date-picker__cell--header">
            <span>{{ item.format('D') }} <br>
                  {{ item.format('dd') }} </span>
          </div>

        </div>
      </div>

      <div ref="list" class="date-picker__column">
        <div class="date-picker__column-wrap">
          <div class="date-picker__left">
            <div v-for="(time, index) in timesRow"
                 :key="time"
                 class="date-picker__cell  date-picker__cell--time">
              {{ index }}
            </div>
          </div>


          <swiper v-if="!desktop" ref="swiper2" class="date-picker__swiper" :options="options2">
            <swiper-slide v-for="item in dates"
                          :key="item.format('D.MM dd')"
                          class="date-picker__slide">

              <div v-for="(time, index) in timesRow"
                   :key="`${item.format('YYYY-MM-DD')}T${time}:00Z`"
                   class="date-picker__cell"
                   :class="{'date-picker__cell--active' : `${item.format('YYYY-MM-DD')}T${time}:00Z` === selected,
                       'date-picker__cell--disabled': !datesObject[`${item.format('YYYY-MM-DD')}T${time}:00Z`]}"
                   @click="setDate(`${item.format('YYYY-MM-DD')}T${time}:00Z`, $event)">

                <template v-if="datesObject[`${item.format('YYYY-MM-DD')}T${time}:00Z`]">
                  <span v-if="datesObject[`${item.format('YYYY-MM-DD')}T${time}:00Z`].rate !== 0" >
                    <template v-if="Math.sign(datesObject[`${item.format('YYYY-MM-DD')}T${time}:00Z`].rate) !== -1">+</template>
                    {{ Math.floor(datesObject[`${item.format('YYYY-MM-DD')}T${time}:00Z`].rate) }}%
                  </span>
                </template>

                <span v-else></span>
              </div>
            </swiper-slide>
          </swiper>

          <swiper-slide v-else v-for="item in dates"
                        :key="item.format('D.MM dd')"
                        class="date-picker__slide">

            <div v-for="(time, index) in timesRow"
                 :key="`${item.format('YYYY-MM-DD')}T${time}:00Z`"
                 class="date-picker__cell"
                 :class="{'date-picker__cell--active' : `${item.format('YYYY-MM-DD')}T${time}:00Z` === selected,
                       'date-picker__cell--disabled': !datesObject[`${item.format('YYYY-MM-DD')}T${time}:00Z`]}"
                 @click="setDate(`${item.format('YYYY-MM-DD')}T${time}:00Z`, $event)">

              <template v-if="datesObject[`${item.format('YYYY-MM-DD')}T${time}:00Z`]">
                  <span v-if="datesObject[`${item.format('YYYY-MM-DD')}T${time}:00Z`].rate !== 0" >
                    <template v-if="Math.sign(datesObject[`${item.format('YYYY-MM-DD')}T${time}:00Z`].rate) !== -1">+</template>
                    <template v-else>-</template>
                    {{ datesObject[`${item.format('YYYY-MM-DD')}T${time}:00Z`].rate }}%
                  </span>
              </template>

              <span v-else></span>

            </div>
          </swiper-slide>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import PerfectScrollbar from 'perfect-scrollbar'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { timesObject } from './timesObject'

  export default {
    name: 'DatePicker',

    components: {
      swiper,
      swiperSlide
    },

    props: {
      dates: {
        type: Array,
        required: true
      },

      datesObject: {
        type: Object,
        required: true
      },

      selected: {
        type: String,
        default: null
      }
    },
    data: () => ({
      timesRow: timesObject,
      firstSwiperActive: false,
      ps: null
    }),

    computed: {
      options() {
        const option ={
          direction: 'horizontal',
          slidesPerView: "auto",
          clickable: true,
          initialSlide: this.initialSlide,
          navigation: {
            nextEl: '.date-picker__btn--next',
            prevEl: '.date-picker__btn--prev',
          },
          on: {}
        }

        option.on.slideChange = this.closePopup
        option.on.setTranslate = () => {
          if (this.$refs.swiper2.swiper && this.$refs.swiper.swiper) {
            if (this.firstSwiperActive) {
              this.$refs.swiper2.swiper.setTranslate(this.$refs.swiper.swiper.translate);
            }
          }
        }

        option.on.setTransition = (e) => {
          if (this.$refs.swiper2.swiper && this.$refs.swiper.swiper) {
            if (this.firstSwiperActive) {
              this.$refs.swiper2.swiper.setTransition(e)
            }
          }
        }

        option.on.touchStart = (e) => {
          this.firstSwiperActive = true
        }

        return option
      },

      options2() {
        const option ={
          direction: 'horizontal',
          slidesPerView: "auto",
          clickable: true,
          initialSlide: this.initialSlide,
          navigation: {
            nextEl: '.date-picker__btn--next',
            prevEl: '.date-picker__btn--prev',
          },
          on: {}
        }

        option.on.slideChange = this.closePopup

        option.on.setTranslate = () => {
          if (this.$refs.swiper2.swiper && this.$refs.swiper.swiper) {
            if (!this.firstSwiperActive) {
              this.$refs.swiper.swiper.setTranslate(this.$refs.swiper2.swiper.translate);
            }
          }
        }

        option.on.setTransition = (e) => {
          if (this.$refs.swiper2.swiper && this.$refs.swiper.swiper) {
            if (!this.firstSwiperActive) {
              this.$refs.swiper.swiper.setTransition(e)
            }
          }
        }

        option.on.touchStart = (e) => {
          this.firstSwiperActive = false
        }

        return option
      },

      initialSlide() {
        if (this.selected) {
          let i = 0

          for (let key in this.timesRow) {
            if (key === moment(this.selected).format('HH:mm')) {
              if (i > 2) {
                i = i - 2
              } else {
                i = 0
              }

              return i
            }

            i++
          }
        }

        return 0
      },

      mobile() {
        return window.innerWidth < 768
      },

      desktop() {
        return window.innerWidth > 1280
      },

      month() {
        return moment().format('MMM')
      }
    },

    methods: {
      setDate(date, event) {
        if (this.datesObject[date]) {
          this.$emit('select', date, event)
        }
      },

      closePopup() {
        this.$emit('closePopup')
      }
    },

    updated: function () {
      this.$nextTick(function () {
        if (this.desktop) {
          this.ps.update()
        }
      })
    },

    mounted() {
      if (this.desktop) {
        this.ps = new PerfectScrollbar(this.$refs.list)
      }

      this.$nextTick(function () {
        window.addEventListener('scroll', () => {
          const fixColumn = document.querySelector('.date-picker__fix-column')
          const container = document.querySelector('.date-picker')

          if (fixColumn && container) {
            const containerBottom = container.getBoundingClientRect().top

            if (containerBottom > 52) {
              fixColumn.style.top = '0'
              fixColumn.style.position = 'absolute'
            } else {
              fixColumn.style.top = '52px'
              fixColumn.style.position = 'fixed'
            }
          }
        })
      })
    }
  }
</script>

<style>
  @import "../../../css/variables.css";
  @import '../../../../node_modules/swiper/dist/css/swiper.css';

  .date-picker {
    position: relative;
    margin-left: auto;
    margin-right: auto;

    @media (--tablet) {
      display: block;
      margin-top: 0;
      margin-bottom: 30px;
    }

    &__inner {
      position: relative;
      max-width: 510px;
      margin-left: auto;
      margin-right: auto;
      padding-top: 50px;

      @media (--desktop) {
        max-width: 645px;
      }
    }

    &__fix-column {
      position: absolute;
      /*top: 52px;*/
      top: 0;
      z-index: 3;
      display: flex;
      flex-shrink: 0;
      max-width: 100%;
      background-color: #ffffff;

      @media (--tablet) {
        position: absolute;
        top: -1px;
        overflow-x: hidden;
      }
    }

    &__column {
      position: relative;
      min-height: 384px;
      overflow: hidden;

      @media (--tablet) {
        min-height: 300px;
        max-height: calc(100vh - 400px);
        overflow-y: scroll;
      }
    }

    &__column-wrap {
      display: flex;
    }

    &__swiper {
      display: flex;
      width: calc(100% - 58px);
      overflow: unset;

      @media (--desktop) {
        width: calc(100% - 85px);
      }
    }

    &__slide.swiper-slide {
      width: 45px;

      @media (--desktop) {
        width: 55px;
      }
    }

    &__cell {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 26px;
      margin: 18px 2px;
      padding: 3px;
      outline: none;
      border-radius: 3px;
      font-size: 14px;
      line-height: 19px;
      color: #ffffff;
      background-color: #58b874;
      user-select: none;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--desktop) {
        box-sizing: border-box;
        min-height: 36px;
        font-size: 14px;
      }

      &:hover {
        @media (--tablet) {
          background-color: #ff7623;
        }
      }

      &:focus {
        @media (--tablet) {
          background-color: #ff7623;
        }
      }

      &:active {
        @media (--tablet) {
          background-color: #58b874;
        }
      }

      &:last-of-type {
        margin-bottom: 0;
      }

      &--header {
        box-sizing: border-box;
        width: 45px;
        min-height: 50px;
        margin: 0;
        padding: 0;
        border-radius: 0;
        cursor: default;
        text-align: center;
        color: #353535;
        background-color: #f2f2f2;
        z-index: 100;

        @media (--desktop) {
          width: 55px;
        }

        &:hover {
          @media (--tablet) {
            background-color: #f2f2f2;
          }
        }

        &:focus {
          @media (--tablet) {
            background-color: #f2f2f2;
          }
        }

        &:active {
          @media (--tablet) {
            background-color: #f2f2f2;
          }
        }

        @media (--desktop) {
          min-height: 52px;
        }
      }

      &--month {
        box-sizing: border-box;
        width: 58px;
        min-height: 50px;
        margin: 0;
        border-radius: 0;
        cursor: default;
        text-align: center;
        color: #353535;
        background-color: #f2f2f2;
        z-index: 2;
        text-transform: capitalize;

        @media (--desktop) {
          width: 85px;
        }

        &:hover {
          @media (--tablet) {
            background-color: #f2f2f2;
          }
        }

        &:focus {
          @media (--tablet) {
            background-color: #f2f2f2;
          }
        }

        &:active {
          @media (--tablet) {
            background-color: #f2f2f2;
          }
        }

        @media (--desktop) {
          min-height: 52px;
        }
      }

      &--time {
        color: #353535;
        background-color: transparent;

        &:hover {
          @media (--tablet) {
            background-color: transparent;
          }
        }

        &:focus {
          @media (--tablet) {
            background-color: transparent;
          }
        }

        &:active {
          @media (--tablet) {
            background-color: transparent;
          }
        }
      }

      &--disabled {
        cursor: default;
        background-color: #f2f2f2;

        &:hover {
          @media (--tablet) {
            background-color: #f2f2f2;
          }
        }

        &:focus {
          @media (--tablet) {
            background-color: #f2f2f2;
          }
        }

        &:active {
          @media (--tablet) {
            background-color: #f2f2f2;
          }
        }
      }

      &--hover {
        @media (--tablet) {
          background-color: rgba(255, 255, 255, 0.6);

          &:hover {
            color: #353535;
            background-color: rgba(255, 255, 255, 0.6);
          }
        }
      }

      &--active {
        background-color: #ff7623;
      }
    }

    &__btn {
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
      position: relative;
      width: 50%;
      height: 48px;
      outline: none;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 65%;
        transform: translate(-50%, -50%)
        rotate(-45deg);
        display: block;
        width: 10px;
        height: 10px;
        border-top: 1px solid #353535;
        border-left: 1px solid #353535;
      }

      &--next {
        &::before {
          left: 35%;
          transform: translate(-50%, -50%)
          rotate(135deg);
        }
      }

      &--disabled {
        &::before {
          border-top-color: #cbc9c9;
          border-left-color: #cbc9c9;
        }
      }
    }

    &__left {
      z-index: 2;
      width: 58px;
      margin-left: -2px;
      background-color: #ffffff;

      @media (--desktop) {
        width: 85px;
      }
    }
  }

  .swiper-button-disabled {
    opacity: 0.3;
  }
</style>
