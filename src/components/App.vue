<template>
  <div class="page__wrap">
    <transition name="loader" v-if="loading">
      <div v-if="!app" class="page__loader">
        <div class="page__loader-wrap">
          <svg class="page__loader-img"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224 224">
            <polygon points="54.49 10.7 55.07 61.01 134.35 140.52 133.76 90.21 54.49 10.7" style="fill:#ff5722;stroke:#fff;stroke-width:0.5px"/>
            <polygon points="83.72 22.42 83.14 72.73 3.86 152.23 4.44 101.93 83.72 22.42" style="fill:#263239;stroke:#fff;stroke-width:0.699999988079071px"/>
            <path d="M144.59,114.21c4.17.74,6.23,2.44,6.23,5.1v22.22q-6.21.42-6.23-5.11Z" style="fill:#263239"/>
            <path d="M31.4,155.28v50.66s0,7.81-7.66,7.81H18.62c-2.08,0-2.55-1.42-2.55-3.32V149.89c0-2.09,1.42-2.56,3.31-2.56h4.36C31.4,147.41,31.4,155.28,31.4,155.28Zm-5.67,50.66V155.28c0-1.52-.86-2.26-1.81-2.26H22.63c-.47,0-.85.17-.85.56v53.79c0,.46.19.84.58.84h1.32a2,2,0,0,0,2.07-1.83A2.16,2.16,0,0,0,25.73,205.94Zm20.54-58.59c6.45,0,7.67,4.45,7.67,7.81v50.66c0,2.09-.56,8-7.57,8-6.43,0-7.79-4.45-7.79-7.81v-50.6c0-2.19.7-8,7.69-8Zm1.95,58.43.1-50.46a1.95,1.95,0,0,0-3.9,0v50.46c0,3.29,3.84,3.19,3.84.06Zm30.34-58.37a8.58,8.58,0,0,0-4.83,1.33,8.62,8.62,0,0,0-4.91-1.33c-7,0-7.67,5.41-7.67,8v55.11c0,1.95.49,3.32,2.57,3.32h3.21V155.38a2,2,0,0,1,3.9-.2v55.31c0,1.95.47,3.32,2.55,3.32h3.19V155.38c0-3.13,3.9-3.22,3.9,0v55.21c0,1.95.56,3.32,2.55,3.32h3.23V155.32C86.23,151.86,85,147.41,78.56,147.41Zm23.21,0c6.43,0,7.65,4.45,7.65,7.81v50.66c0,2.09-.56,8-7.55,8-6.45,0-7.79-4.45-7.79-7.81V155.38C94.1,153.19,94.68,147.41,101.77,147.41Zm2,58.43.1-50.46a1.95,1.95,0,0,0-3.9,0v50.46c0,3.23,3.84,3.13,3.84,0Zm28.35-25.13v25.23s0,7.81-7.79,7.81H119.2c-2.08,0-2.55-1.42-2.55-3.32V149.89c0-2.09,1.42-2.56,3.31-2.56h4.34c7.67,0,7.79,7.81,7.79,7.81v10.45c0,4.16,0,6.72-4.07,7.58C132,174.17,132.07,177,132.07,180.71ZM124.5,153h-1.23c-.47,0-.86,0-.86.56v15.74c0,.57.2.86.57.86h1.15a2.12,2.12,0,0,0,2.17-2.07c0-.11,0-.21,0-.31V155.28C126.29,153.76,125.45,153,124.5,153Zm1.79,52.92V178.42a2.13,2.13,0,0,0-1.88-2.35h-1.14c-.47,0-.86.2-.86.57v30.74c0,.46.2.84.57.84h1.32C125.35,208.21,126.29,207.54,126.29,205.94Zm20.37,2.27c-1.13,0-1.7-.94-1.7-2.37V176.06l5.84-6H145v-14.7c0-1.43.76-2.36,1.7-2.36h4.07c3.5,0,3.6-3.15,3.6-5.61h-7.79c-7.28,0-7.28,8-7.28,8v50.46c0,1.8,0,8,7.28,8h7.79c0-2.85,0-5.6-3.6-5.6ZM166,147.41h-3.15c-2.08,0-2.57,1.43-2.57,3.32v60.33a2.4,2.4,0,0,0,2,2.73,2.09,2.09,0,0,0,.56,0h3.21V176.06l3.68-6H166Zm6.14,0c-1.95,0-2.46,1.52-2.46,3.42v60.23a2.43,2.43,0,0,0,2.06,2.73,2.68,2.68,0,0,0,.4,0h3.31v-66.4Zm18.3,0c6.43,0,7.66,4.45,7.66,7.81v50.66c0,2.09-.57,8-7.58,8-6.43,0-7.79-4.45-7.79-7.81V155.38C182.76,153.19,183.42,147.41,190.43,147.41Zm1.95,58.43V155.38a1.95,1.95,0,1,0-3.89,0v50.46c0,3.23,3.93,3.13,3.93,0Zm22.53-38a2.2,2.2,0,0,1-2,2.37H211.6c-.37,0-.57-.49-.57-1V147.41h-2.74c-1.95,0-3,.37-3,2.46v60.54c0,2,.47,3.42,2.55,3.42H211V176.72c0-.37.37-.56.86-.56h.84a2,2,0,0,1,2.19,1.89,2.26,2.26,0,0,1,0,.37l-.1,32.07c0,1.95.57,3.42,2.55,3.42h3.14v-33.2c0-3.69.1-6.54-3.9-7.5,4.07-.94,3.9-3.79,3.9-8.07V147.57H218c-1.95,0-3.12.37-3.12,2.46Z" style="fill:#263239;fill-opacity:0.871688187122345"/>
          </svg>
          <p class="page__loader-text">чтобы помогать</p>
        </div>
      </div>
    </transition>

    <template v-else>
      <template v-if="loggedIn">


        <loader v-if="settingsLoading" />

        <template v-else-if="settingsLoaded && clientId">

          <template v-if="clientInit">

            <div class="page__header">
              <main-header
                v-if="showMenu"/>

              <alert
                v-if="alertShow"
                class="page__alert" />
            </div>



          </template>

          <div
            class="page__content"
            :style="{'padding-top': `${contentPaddingTop}px`, 'height': `calc(100% - ${contentOffset}px)`, 'min-height': `calc(100% - ${contentOffset}px)`}">

            <router-view />
          </div>

          <!--<template v-if="!clientInit && !employeeId">-->
            <!--&lt;!&ndash;//<new-full-application />&ndash;&gt;-->
            <!--<router-view />-->
          <!--</template>-->

        </template>

        <error-fetch v-else="settingsError"/>

      </template>

      <authorization v-else />
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import api from  'vue_components/src/api'

  import Authorization from '@/components/Authorization'
  import Loader from '@/components/common/Loader'
  import MainHeader from '@/components/MainHeader'
  import ErrorFetch from '@/components/common/Error/ErrorFetch'
  import analytic from '@/store/common/analytic'
  import NewFullApplication from '@/components/NewFullApplication'
  import Alert from '@/components/common/Alert'

  export default {
    name: 'App',

    components: {
      Authorization,
      NewFullApplication,
      Loader,
      MainHeader,
      ErrorFetch,
      Alert
    },

    data: () => ({
      firstLoader: true
    }),

    computed: {
      ...mapState({
        settingsLoading: state => state.settings.loading,
        settingsLoaded: state => state.settings.loaded,
        settingsError: state => state.settings.error,
        clientInit: state => state.client.isInitialized,
        clientId: state => state.client.clientId,
        employeeId: state => state.employee.employeeId,
        loggedIn: state => state.auth.loggedIn,
        alertShow: state => state.client.alert.show,
        showMenu: state => state.common.showMenu,
        alertStable: state => state.client.alert.stable,
        mobile: state => state.common.isMobile,
        app: state => state.common.isApp,
        loading: state => state.common.loading,
      }),

      contentPaddingTop() {
        if (this.alertShow && this.alertStable && !this.showMenu) {
          if (this.mobile) {
            return 50
          }

          return 30
        }

        if (this.alertShow && this.alertStable && this.showMenu) {
          if (this.mobile) {
            return 102
          }

          return 90
        }

        if (this.showMenu) {
          if (this.mobile) {
            return 52
          }

          return 60
        }

        return 0
      },

      contentOffset() {
        if (this.alertShow && this.alertStable && !this.showMenu) {
          if (this.mobile) {
            return 50
          }

          return 30
        }

        if (this.alertShow && this.alertStable && this.showMenu) {
          if (this.mobile) {
            return 102
          }

          return 90
        }

        if (this.showMenu) {
          if (this.mobile) {
            return 52
          }

          return 60
        }

        return 0
      }
    },

    mounted() {
      analytic.init()
    }
  }
</script>

<style>
  @import "../css/reset.css";
  @import "../css/variables.css";
  @import "../css/components/ps.css";

  html {
    height: 100%;
  }

  .page {
    width: 100%;
    height: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-family: var(--base-font-family);
    color: #692f17;

    @media (--tablet) {
      background-color: #f6f6f6;
    }

    &--old-view {

      @media (--tablet) {
        background-color: #ffffff;
      }

      & .page__wrap {
        min-height: 100%;
        flex-direction: row;
        min-width: 320px;

        @media (--desktop) {
          width: 1280px;
          margin: 0 auto;
          box-shadow: 0 1px 2px 1px rgba(0, 0, 0, .11);
        }

        &--order {
          box-shadow: none;
          height: 100%;

          @media (--tablet) {
            width: auto;
            margin: auto;
            min-height: 100%;
          }

          @media (--desktop) {
            width: auto;
          }
        }
      }
    }

    &__wrap {
      height: 100%;
      min-height: 100%;
      min-width: 320px;
    }

    &__header {
      position: fixed;
      width: 100%;
      left: 0;
      z-index: 102;
    }

    &__alert {
      z-index: 1;
      height: 50px;
      width: 100%;

      @media (--tablet){
        height: 30px;
      }
    }

    &__content {
      width: 100%;
    }

    &__loader {
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      opacity: 1;

      @media (--tablet) {
        background-color: #f6f6f6;
      }

      &-text {
        font-size: 18px;
        font-family: var(--base-font-family);
        line-height: 35px;
        margin-left: 20px;
        color: #353535;
      }

      &-img {
        height: auto;
        width: 170px;
        display: block;
        margin: auto;
      }

      &-wrap {
        margin: auto
      }
    }
  }

  .loader-enter-active, .loader-leave-active {
    transition: all 0.2s ease-in;
  }

  .loader-enter, .loader-leave-to {
    opacity: 0;
  }
</style>
