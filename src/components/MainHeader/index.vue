<template>
  <header class="main-header" :class="{'main-header--bg': open}">

    <div class="main-header__top">
      <button @click="toggle" class="main-header__btn  main-header__btn--open">
        <svg class="main-header__image" width="31" height="23.9" viewBox="0 0 31 23.9">
          <rect width="31" height="1.64" rx="0.82" ry="0.82" fill="#fff"/>
          <rect y="22.26" width="31" height="1.64" rx="0.82" ry="0.82" fill="#fff"/>
          <rect y="11.13" width="31" height="1.64" rx="0.82" ry="0.82" fill="#fff"/>
        </svg>
      </button>

      <a class="main-header__logo" href="https://www.domovenok.su">
        <img height="38" width="80" src="/static/pancake/img/logo-new.svg" alt="Логотип">
      </a>
      <div class="main-header__messenger-wrapper" v-if="!app">
        <p class="main-header__text">Свяжитесь с нами:</p>
        <a class="main-header__messenger" href="http://t.me/DomovenokChatBot" rel="nofollow" target="_blank">
          <svg class="main-header__messenger-img" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><rect width="21" height="21" fill="none"></rect><path d="M7.67,15.47c.07-.62.14-1.25.22-1.86A2.75,2.75,0,0,1,8.32,13a6.75,6.75,0,0,1,.5-.57L11,10.46l.7-.64.71-.64L15.9,6l-.38.24L5.59,12.58l1.84,5.1c0-.17,0-.34,0-.5C7.54,16.61,7.61,16,7.67,15.47Z"></path><path d="M21,2a.65.65,0,0,0-.55-.58,1.48,1.48,0,0,0-.37,0,8.86,8.86,0,0,0-1.38.43c-.13,0-.48.2-.54.22L14.37,3.51c-.52.21-1.05.41-1.59.6-.26.09-9.15,3.65-9.23,3.68L.6,9.07A.83.83,0,0,0,0,10l.08.16a.25.25,0,0,0,.06.12,1.44,1.44,0,0,0,.73.44L5,12.07c.1-.09.51-.35.55-.38L15.1,5.61l1.49-.95a1.27,1.27,0,0,1,.34-.15.62.62,0,0,1,.58.15.63.63,0,0,1,.17.6.87.87,0,0,1-.27.46l-4.52,4-.7.64L11.5,11,9.35,13l-.48.45-.21.22L8.6,14c0,.34-.08.67-.12,1-.06.5-.11,1-.17,1.5s-.15,1.27-.24,1.9c0,.13,0,.21-.06.38v.06c.23.19.45.15.73-.12l2.7-2.53a.26.26,0,0,1,.13-.09l.33.25c1.28,1,2.57,2,3.85,3a1.2,1.2,0,0,0,.67.23,1.13,1.13,0,0,0,1-.48c.09-.13.39-1.45.5-1.87.14-.73,1.14-5.36,1.27-6,.08,0,0-.14.06-.2h0c.09-.55,1.31-6.67,1.45-7.45C20.76,3.26,21,2.13,21,2Z"></path></svg>
          <span class="main-header__messenger-text">Telegram</span>
        </a>
        <a class="main-header__messenger" href="http://viber.com/domovenok" target="_blank" rel="nofollow">
          <svg class="main-header__messenger-img" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21"><rect width="21" height="21" fill="none"></rect><path d="M.93,4.09a1.82,1.82,0,0,1,.61-1.32,9.24,9.24,0,0,1,2-1.56,1.49,1.49,0,0,1,1.93.34A14.7,14.7,0,0,1,8.05,5a1.49,1.49,0,0,1-.49,2.23c-1.28,1.07-1.42,1.47-.67,3a8.75,8.75,0,0,0,4.78,4.36,1.23,1.23,0,0,0,1.74-.5l.38-.48A1.61,1.61,0,0,1,16,13.13a18.61,18.61,0,0,1,3.68,2.68,1.28,1.28,0,0,1,.27,1.59A5.63,5.63,0,0,1,17.53,20a2.05,2.05,0,0,1-1.83.12A25,25,0,0,1,1.31,5.72,4.29,4.29,0,0,1,.93,4.09Z"></path><path d="M19.9,9.73c0,.18,0,.37,0,.55,0,.36-.17.64-.55.64a.56.56,0,0,1-.61-.64,10.89,10.89,0,0,0-.35-2.69,7.66,7.66,0,0,0-7-5.69l-.67,0c-.37,0-.61-.2-.6-.58s.27-.59.66-.59a9.67,9.67,0,0,1,3.37.63A8.92,8.92,0,0,1,19.9,9.73Z"></path><path d="M17.64,9.08c0,.09,0,.19,0,.28,0,.39-.19.66-.59.66s-.57-.29-.59-.67a9.93,9.93,0,0,0-.07-1.11,4.79,4.79,0,0,0-4.09-4c-.24,0-.48-.08-.71-.1-.39,0-.64-.21-.61-.63s.31-.53.7-.53A6.09,6.09,0,0,1,17.1,6.6a7.54,7.54,0,0,1,.4,1.27c.09.39.11.81.16,1.21Z"></path><path d="M12.37,5.37a3.1,3.1,0,0,1,3,3.27c0,.35-.17.58-.52.61s-.58-.2-.64-.56-.06-.48-.11-.71a1.7,1.7,0,0,0-1.53-1.4l-.33,0c-.41,0-.67-.25-.62-.69S12,5.35,12.37,5.37Z"></path></svg>
          <span class="main-header__messenger-text">Viber</span>
        </a>
      </div>

    </div>

    <div v-if="open" class="main-header__wrap" v-click-outside="clickOutside">
      <button @click="toggle" class="main-header__icon-close main-header__icon-close">
        <svg class="icon-close__image" width="19" height="19" viewBox="0 0 19 19">
          <line class="icon-close__element" x1="1" y1="18" x2="18" y2="1"
                style="fill: none;stroke: #ff5a19;stroke-linecap: round;stroke-miterlimit: 10;stroke-width: 2px"/>
          <line class="icon-close__element" x1="18" y1="18" x2="1" y2="1"
                style="fill: none;stroke: #ff5a19;stroke-linecap: round;stroke-miterlimit: 10;stroke-width: 2px"/>
        </svg>
      </button>

      <main-header-menu class="main-header__main-menu" @close="toggle" />

      <main-header-contact class="main-header__contact" />
    </div>
  </header>
</template>

<script>
  import MainHeaderMenu from './MainHeaderMenu'
  import MainHeaderContact from './MainHeaderContact'
  import vClickOutside from 'v-click-outside'

  export default {
    name: 'MainHeader',

    components: {
      MainHeaderContact,
      MainHeaderMenu
    },

    directives: {
      clickOutside: vClickOutside.directive
    },

    data: () => ({
      open: false
    }),

    computed: {
      app() {
        return this.$store.state.common.isApp
      }
    },

    methods: {
      toggle() {
        this.open = !this.open
        const body = document.querySelector('body');

        this.open ? body.classList.add('page--main-menu-open') : body.classList.remove('page--main-menu-open')
      },

      clickOutside() {
        if (this.open) {
          this.toggle()
        }
      }
    }
  }
</script>

<style>
  @import "../../css/variables.css";

  .main-header {
    position: relative;
    width: 100%;
    background-color: white;
    z-index: 10;

    @media (--tablet) {
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, .15);
    }

    @media (--desktop) {
      z-index: 10;
    }

    &--bg::before {
      @media (--tablet) {
        content: '';
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 7;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    &__icon-close {
      position: absolute;
      top: 10px;
      right: 7.8%;
      z-index: 10;
      margin-right: -8px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      padding: 0;
      background: 0 0;
      border: 0;
      cursor: pointer;
      outline: none;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
    }

    &__top {
      z-index: 7;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: calc(100% - 7.8% * 2);
      height: 52px;
      padding-right: 7.8%;
      padding-left: 7.8%;
      background-color: var(--new-brand-color-orange);

      @media (--tablet) {
        height: 60px;
        justify-content: space-between;
        width: calc(100% - 6.8%);
        padding-right: 3.4%;
        padding-left: 3.4%;
        background-color: var(--bg-white);
      }
    }

    &__wrap {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 8;
      display: flex;
      flex-direction: column;
      padding-top: 15px;
      background-color: var(--bg-white);
      padding-bottom: 30px;

      @media (--tablet) {
        z-index: 8;
        width: 350px;
      }

      @media (--desktop) {
        right: auto;
        left: auto;
        box-shadow: 1px 0 5px 0 rgba(0, 0, 0, 0.09);
      }
    }

    &__tel {
      position: relative;
      display: block;
      align-self: center;
      font-weight: 200;
      font-family: var(--heading-font-family);
      font-size: var(--font-size-md);
      line-height: 30px;
      color: var(--text-color-white);
      letter-spacing: 1.2px;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      @media (--tablet) {
        color: var(--text-color-orange);
      }

      @media (--desktop) {
        user-select: auto;
      }
    }

    &__logo {
      display: none;
      cursor: pointer;
      outline: none;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        display: block;
        margin-top: -8px;
        margin-right: auto;
      }
    }

    &__logo img {
      width: 80px;
      height: 30px;

      @media (--tablet) {
        width: 80px;
        height: 38px;
      }
    }

    &__tel-brown {
      color: var(--text-color);
    }

    &__main-menu {
      order: 3;
      width: 100%;
      padding: 0;

      @media (--tablet) {
        width: 100%;
        margin-bottom: 0;
        padding: 0;
      }

      &--hide {
        display: none;
      }
    }

    &__messenger-wrapper {
      display: flex;
    }

    &__messenger {
      cursor: pointer;
      display: flex;
      width: 40px;
      height: 40px;
      justify-content: center;
      align-items: center;
      margin-right: 15px;
      outline: none;
      text-decoration: none;

      @media (--tablet) {
        width: auto;
        height: auto;
        margin-right: 20px;
      }

      &:last-child {
        margin-right: 0;

        @media (--tablet) {
          margin-right: 0;
        }
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
    }

    &__messenger-img {
      fill: #ffffff;

      @media (--tablet) {
        margin-right: 10px;
        fill: #263239;
      }
    }

    &__messenger-text {
      display: none;

      @media (--tablet) {
        display: block;
        font-size: 14px;
        line-height: 1.3em;
        color: #353535;
      }

      @media (--desktop) {
        font-size: 16px;
      }
    }

    &__text {
      display: none;
      @media (--tablet) {
        display: block;
        margin-right: 20px;
        font-size: 16px;
        line-height: 30px;
        color: #353535;
      }

      @media (--desktop) {
        font-size: 18px;
      }
    }

    &__btn {
      outline: none;
      z-index: 7;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      padding: 0;
      background: 0 0;
      border: 0;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      @media (--tablet) {
        margin-right: 25px;
        width: 40px;
        height: 40px;
      }

      &--hide {
        display: none;
      }
    }

    &__icon-close {
      position: absolute;
      top: 10px;
      right: var(--wrap-margin);
      z-index: 10;
      margin-right: -8px;

      &--hide {
        display: none;
      }
    }

    &__image {
      margin: auto;

      & rect {
        @media (--tablet) {
          fill: var(--new-brand-color-orange);
        }
      }
    }
  }
</style>
