<template>
  <div class="application-sidebar" :class="{'application-sidebar--background': isMovePartShown}">
    <transition name="popup-bg">
      <div v-if="isMovePartShown" class="application-sidebar__background">
      </div>


    </transition>
    <div class="application-sidebar__container">

      <transition name="popup">
        <div v-if="isMovePartShown || !mobile" class="application-sidebar__move-part">
          <button class="application-sidebar__btn-close"
                  type="button"
                  @click="btnHideHandler">Закрыть</button>
          <div class="application-sidebar__group" v-if="services">
            <p class="application-sidebar__title">Ваш заказ</p>
            <ul class="application-sidebar__list">
              <li v-for="item in services" class="application-sidebar__list-item">{{ item }}</li>
            </ul>
          </div>
          <div class="application-sidebar__group" v-if="schedule">
            <div class="application-sidebar__row">
              <p class="application-sidebar__text">Частота</p>
              <p class="application-sidebar__text">{{ scheduleTitles[schedule] }}</p>
            </div>
          </div>
          <div class="application-sidebar__group" v-if="date">
            <div class="application-sidebar__row">
              <p class="application-sidebar__text">Дата</p>
              <p class="application-sidebar__text">{{ datePart }}</p>
            </div>
            <div class="application-sidebar__row">
              <p class="application-sidebar__text">Время</p>
              <p class="application-sidebar__text">{{ timePart }}</p>
            </div>
          </div>

          <div class="application-sidebar__group" v-if="mobile && price !== discount && priceLoaded">
            <div class="application-sidebar__row">
              <p class="application-sidebar__text">Стоимость</p>
              <p class="application-sidebar__text application-sidebar__text--strikeout">{{ price }}</p>
            </div>
            <div class="application-sidebar__row">
              <p class="application-sidebar__text">Скидка</p>
              <p class="application-sidebar__text application-sidebar__text--red">{{ price - discount }}</p>
            </div>
          </div>
        </div>
      </transition>

      <div
        class="application-sidebar__fixed-part"
        :class="{ 'application-sidebar__fixed-part--shadow': !isMovePartShown}">

        <div class="application-sidebar__btn-show"
             @click="btnShowHandler">
          <i class="application-sidebar__icon"
             :class="{'application-sidebar__icon--hidden' : isMovePartShown}">
            <svg width="21" height="10" viewBox="0 0 21 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 19L2.94571e-08 9.5L8 0" transform="translate(20 1) rotate(90)" stroke="#CBC9C9" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
            </svg>
          </i>

          <div class="application-sidebar__row" v-if="price">

            <template v-if="mobile">
                <template v-if="!priceError">
                  <p v-if="mobile" class="application-sidebar__price">
                    Стоимость
                    <template v-if="isMovePartShown && price !== discount"> со скидкой</template>
                  </p>

                  <p class="application-sidebar__price">
                    <template v-if="priceLoaded">
                      <template v-if="!date">
                        ~ {{ discount }}&#8381;
                      </template>

                      <template v-else>
                        {{ discount }}&#8381;
                      </template>

                      <span v-if="!date" class="application-sidebar__hint-btn" @click.stop @click="showNotification">?</span>
                    </template>

                    <svg v-if="priceLoading" class="application-sidebar__spinner" width="55px" height="55px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background-image: none; background-position: initial initial; background-repeat: initial initial;">
                      <g transform="translate(25 50)">
                        <circle cx="0" cy="0" r="6" fill="#ff5a19">
                          <animateTransform attributeName="transform" type="scale" begin="-0.3333333333333333s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
                        </circle>
                      </g>
                      <g transform="translate(50 50)">
                        <circle cx="0" cy="0" r="6" fill="#263239">
                          <animateTransform attributeName="transform" type="scale" begin="-0.16666666666666666s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
                        </circle>
                      </g>
                      <g transform="translate(75 50)">
                        <circle cx="0" cy="0" r="6" fill="#dadada">
                          <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
                        </circle>
                      </g>
                    </svg>
                  </p>

                </template>

                <template v-else>
                  <p class="application-sidebar__error">ошибка при расчете стоимости</p>
                </template>
              </template>

            <div class="application-sidebar__price-wrap" :class="{ 'application-sidebar__price-wrap--discount': price !== discount}" v-else>
              <template v-if="!priceError">
                <p v-if="price !== discount && priceLoaded" class="application-sidebar__discount">{{ price }}&#8381;</p>

                <p class="application-sidebar__price" v-if="priceLoaded">
                  <template v-if="!date">
                    ~ {{ discount }}&#8381;
                  </template>

                  <template v-else>
                    {{ discount }}&#8381;
                  </template>

                  <span v-if="!date" class="application-sidebar__hint-btn" @click.stop @click="showNotification">?</span>
                </p>

                <svg v-if="priceLoading" class="application-sidebar__spinner" width="55px" height="55px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background-image: none; background-position: initial initial; background-repeat: initial initial;">
                  <g transform="translate(25 50)">
                    <circle cx="0" cy="0" r="6" fill="#ff5a19">
                      <animateTransform attributeName="transform" type="scale" begin="-0.3333333333333333s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
                    </circle>
                  </g>
                  <g transform="translate(50 50)">
                    <circle cx="0" cy="0" r="6" fill="#263239">
                      <animateTransform attributeName="transform" type="scale" begin="-0.16666666666666666s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
                    </circle>
                  </g>
                  <g transform="translate(75 50)">
                    <circle cx="0" cy="0" r="6" fill="#dadada">
                      <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
                    </circle>
                  </g>
                </svg>
              </template>

              <template v-else>
                <p class="application-sidebar__error">ошибка при расчете стоимости</p>
              </template>
            </div>
          </div>



          <button v-if="!mobile" class="application-sidebar__button" @click="sendContacts">Быстрый заказ</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  import { mapMutations, mapState, mapActions } from 'vuex'

  export default {

    name: 'ApplicationSidebar',

    props: {
      params: {
        type: Object,
        required: true
      }
    },

    data: () => ({
      movePartClass: '',
      isMovePartShown: false,
      scheduleTitles: {
        '0x_week': 'Разовая',
        '1x_week': 'Раз в неделю',
        '2x_week': 'Раз в 2 недели',
      }
    }),

    computed: {
      ...mapState({
        date: state => state.order.date,
        price: state => state.order.price.value,
        discount: state => state.order.price.discount,
        priceLoaded: state => state.order.price.loaded,
        priceLoading: state => state.order.price.loading,
        priceError: state => state.order.price.error,
        services: state => state.order.services,
        schedule: state => state.order.mainService.schedule,
        mobile: state => state.common.isMobile
      }),

      config() {
        return this.params.service.sidebar
      },

      datePart() {
        return moment(this.date).format('D MMMM')
      },

      timePart() {
        return moment(this.date).format('HH:mm')
      }
    },

    methods: {
      ...mapActions([ 'sendContacts' ]),

      btnShowHandler() {
        if (this.mobile){
          this.isMovePartShown = true
          this.movePartClass = 'application-sidebar__move-part--show'
        }
      },

      btnHideHandler() {
        if (this.mobile) {
          this.isMovePartShown = false
          this.movePartClass = 'application-sidebar__move-part--hide'
        }
      },

      showNotification() {
        this.$emit('showNotification')
      }
    }
  }

</script>

<style>
  @import "../../../css/variables.css";

  .application-sidebar {

    @media (--tablet) {
      position: fixed;
      width: 250px;
    }

    &__background {
      content: '';
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 45px;
      z-index: -1;
      width: 100%;
      background-color: rgba(53, 53, 53, 0.2);

    }

    &__container {
      position: relative;
      background-color: #ffffff;
    }

    &__move-part {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      box-sizing: border-box;
      width: 100%;
      padding: 20px 25px 0 25px;
      background-color: #ffffff;
      transform: translateY(-100%);

      @media (--tablet) {
        display: block;
        padding: 20px 20px 0;
        position: static;
        transform: translateY(0);
      }
    }

    &__btn-close {
      display: block;
      width: 100%;
      text-align: right;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 24px;
      font-weight: 400;
      color: #000000;
      outline: none;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      @media (--tablet) {
        display: none;
      }

      &:hover {
        @media (--tablet) {
          opacity: 0.7;
        }
      }

      &:focus {
        @media (--tablet) {
          opacity: 0.7;
        }
      }

      &:active {
        @media (--tablet) {
          opacity: 1;
        }
      }

      &--hidden {
        display: none;
      }
    }

    &__group {
      padding-top: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #cbc9c9;

      &:first-of-type {
        padding-top: 0;
      }
    }

    &__title {
      min-width: 50%;
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 22px;
      font-weight: 400;
      color: #353535;
      user-select: none;
      margin-bottom: 10px;
    }

    &__list {
      list-style: none;
      margin: 10px 0 0 0;
      padding: 0;
    }

    &__list-item {
      position: relative;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 25px;
      font-weight: 400;
      color: #353535;
      user-select: none;
    }

    &__row {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: baseline;

      &:nth-of-type(n+2) {

        @media (--tablet) {
          margin-top: 15px;
        }
      }
    }

    &__tip {
      display: none;

      @media (--tablet) {
        display: block;
        width: 100%;
        margin-top: 5px;
        text-align: right;
        font-family: var(--base-font-family);
        font-size: 12px;
        line-height: 16px;
        font-weight: 400;
        color: #999999;
        user-select: none;
      }
    }

    &__text {
      text-align: right;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 24px;
      font-weight: 400;
      color: #353535;
      user-select: none;

      &--strikeout {
        text-decoration: line-through;
      }

      &--red {
        color: var(--color-red);
      }
    }

    &__fixed-part {
      display: flex;
      flex-direction: column;
      background-color: #ffffff;

      &--shadow {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.14);

        @media (--tablet) {
          box-shadow: none;
        }
      }
    }

    &__btn-show {
      position: relative;
      margin: 0 7.5%;
      padding: 15px 0 15px;
      min-height: 20px;
      outline: none;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      @media (--tablet) {
        min-height: 0;
        margin: 0;
        padding: 20px;
      }
    }

    &__icon {
      position: absolute;
      top: 2px;
      left: 50%;
      transform: translateX(-50%);

      &--hidden {
        display: none;
      }

      @media (--tablet) {
        display: none;
      }
    }

    &__price {
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 1.3em;
      font-weight: 400;
      color: #353535;
      user-select: none;

      @media (--tablet) {
        font-size: 24px;
        min-height: 32px;
      }

      &--hidden {
        @media (--tablet) {
          font-size: 0;
        }

        @media (--desktop) {
          font-size: 0;
        }
      }
    }

    &__price-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      width: 100%;
      text-align: right;
      min-height: 32px;

      &--discount {
        min-height: 52px;
      }
    }

    &__discount {
      color: var(--color-red);
      text-decoration: line-through;
    }

    &__error {
      text-align: center;
      position: absolute;
      width: 100%;
      top: 5px;
      color: var(--color-red);

      @media (--tablet) {
        position: static;
      }
    }

    &__hint-btn {
      display: inline-block;
      text-align: center;
      transform: translateY(-12px)translateX(3px);
      width: 12px;
      height: 12px;
      outline: 0;
      border-radius: 50%;
      border: 1px solid #cbc9c9;
      color: #cbc9c9;
      font-family: var(--base-font-family);
      font-size: 8px;
      line-height: 12px;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      @media (--tablet) {
        display: none;
      }
    }

    &__button {
      width: 100%;
      height: auto;
      margin-top: 15px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 3px;
      outline: none;
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 1.3em;
      color: #ffffff;
      background-color: #dadada;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

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

      &:disabled {
        background-color: #ededed;
      }

      &:active {
        @media (--tablet) {
          background-color: #ff7623;
        }
      }
    }

    &__spinner {
      position: absolute;
      right: 0;
      top: -12px;

      @media (--tablet) {
        width: 60px;
        height: 60px;
        bottom: -22px;
        top: auto;
      }
    }
  }

  .popup-enter-active, .popup-leave-active {
    transition: all 0.2s ease;
  }

  .popup-enter, .popup-leave-to {
    transform: translateY(0);
  }

  .popup-bg-enter-active, .popup-bg-leave-active {
    transition: all 0.2s ease;
  }

  .popup-bg-enter, .popup-bg-leave-to {
    background-color: transparent;
  }

</style>
