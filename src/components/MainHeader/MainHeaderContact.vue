<template>
  <div>
    <div class="main-header-contact">
      <span class="main-header-contact__callback" @click="callback">Свяжитесь со мной</span>
    </div>
    <div v-if="show" :class="{'main-header-contact__wrap-note--two-line' : twoLine}" class="main-header-contact__wrap-note">
      <p class="main-header-contact__note">{{ message }}</p>
    </div>
  </div>
</template>

<script>
  import api from  'vue_components/src/api'
  import analytic from '@/store/common/analytic'
  import { mapActions, mapMutations } from 'vuex'

  export default {
    name: 'MainHeaderContact',

    data: () => ({
      show: false,
      message: "Спасибо, мы свяжемся с Вами через 10 минут",
      twoLine: false
    }),

    methods: {
      ...mapActions(['defineError']),

      async callback() {
        try {
          const result = await api.client.postCallBack()

          analytic.sendEvent({name: "button", value: "callback", ga_action: "click"}, ['ga', 'af', 'fb']);

          let time = 4000;

          if (!result.workTime) {
            this.message = "Спасибо, мы свяжемся с Вами в начале рабочего дня"
            this.twoLine = true
            time = 6000;
          }

          this.show = true

          setTimeout(() => {
            this.show = false
          }, time);

        } catch (error) {
          this.defineError({
            error: error,
            name: 'postCallBack',
            params: {}
          })
        }
      }
    }
  }
</script>

<style>
  @import "../../css/variables.css";

  .main-header-contact {
    position: relative;
    padding-bottom: 15px;
    padding-left: 8%;
    border-bottom: 1px solid #f0ece4;
    user-select: none;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

    @media (--tablet) {
      padding-left: 60px;
    }

    &--note {
      margin-bottom: 10px;
    }

    &--open {
      position: static;
      display: flex;
      flex-direction: column;
      margin-bottom: 0;
    }

    &--open .main-header-contact__wrap {
      display: flex;
    }

    &--open .main-header-contact__form {
      display: block;
    }

    &--open .main-header-contact__btn--close {
      display: none;
    }

    &__wrap {
      position: relative;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      margin-top: auto;
      padding: 30px 50px;
      border-top: 1px solid var(--new-border-color);

      @media (--tablet) {
        width: 350px;
      }

      @media (--desktop) {
        align-self: center;
        width: 100%;
        margin-top: 0;
        padding: 0;
        border-top: none;
      }
    }

    &__wrap-note {
      order: 2;
      height: 0;
      overflow: hidden;
      animation-name: note--wrap-shows;
      animation-duration: 3s;
      animation-timing-function: linear;

      &--two-line {
        animation-name: note--wrap-shows-two-line;
        animation-duration: 5s;
        animation-timing-function: linear;

        & .main-header-contact__note {
          padding-left: 20px;
          padding-right: 20px;
          animation-name: none;
        }
      }
    }

    &__note {
      z-index: 7;
      box-sizing: border-box;
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      text-align: center;
      background-color: beige;
      animation-name: none;
      animation-duration: 3s;
    }

    &__tel {
      position: relative;
      margin-bottom: 20px;
      padding-left: 35px;
      font-size: 16px;
      line-height: 30px;
      color: var(--new-text-color-orange);

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        background-image: url('img/tel.svg');
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    &__callback {
      position: relative;
      padding-top: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      padding-left: 45px;
      font-size: var(--font-size-sm);
      line-height: 30px;
      color: var(--new-text-color-orange);
      letter-spacing: 0.2px;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--desktop) {
        padding-top: 0;
        padding-bottom: 0;
        padding-left: 40px;
      }

      &::before {
        content: "";
        position: absolute;
        top: 5px;
        left: 0;
        width: 30px;
        height: 30px;
        background-image: url('img/callback.svg');
        background-repeat: no-repeat;
        background-position: center;

        @media (--desktop) {
          top: -5px;
          left: 0;
        }
      }
    }

    &__form {
      z-index: 6;
      display: none;
      flex-grow: 1;
      box-sizing: border-box;
      padding: 20px;
      background-color: var(--bg-white);

      @media (--desktop) {
        position: relative;
        right: auto;
        bottom: auto;
        z-index: 10000;
        order: 1;
        width: 350px;
        margin-top: 25px;
        padding-top: 20px;
        background-color: var(--bg-white);
        border: 1px solid #a77d5a;
        border-right: none;
        border-left: none;
      }

      &::after {
        @media (--desktop) {
          content: "";
          position: absolute;
          top: -16px;
          left: 87px;
          width: 30px;
          height: 30px;
          background-color: var(--bg-white);
          border-top: 1px solid var(--new-border-color);
          border-right: 1px solid var(--new-border-color);
          transform: rotate(315deg);
        }
      }
    }

    &__title {
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
    }

    &__text {
      margin-bottom: 20px;
      font-size: var(--font-size-md);
      font-family: var(--heading-font-family);
      text-align: center;

      @media (--tablet) {
        font-size: var(--font-size-sm);
        text-align: left;
      }
    }

    &__input {
      margin-bottom: 10px;
    }

    &__label {
      margin-bottom: 10px;
    }

    &__button {
      width: 100%;
    }

    &__btn--close {
      display: none;
    }
  }

  @keyframes note-show {
    0% {
      bottom: 40px;
    }

    15%, 85% {
      bottom: 90px;
    }

    100% {
      bottom: 40px;
    }
  }

  @keyframes note-shows {
    0% {
      transform: translateY(46px);
    }

    15%, 85% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(46px);
    }
  }

  @keyframes note--wrap-shows {
    0% {
      height: 0;
    }

    15%, 85% {
      height: 36px;
    }

    100% {
      height: 0;
    }
  }

  @keyframes note-show--two-line {
    0% {
      bottom: 20px;
    }

    15%, 85% {
      bottom: 90px;
    }

    100% {
      bottom: 20px;
    }
  }

  @keyframes note-shows--two-line {
    0% {
      transform: translateY(62px);
    }

    15%, 85% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(62px);
    }
  }

  @keyframes note--wrap-shows-two-line {
    0% {
      height: 0;
    }

    15%, 85% {
      height: 52px;
    }

    100% {
      height: 0;
    }
  }

</style>
