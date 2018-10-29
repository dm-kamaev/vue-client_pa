<template>
  <div class="app-container-wrap">
    <template v-if="showCompare || showOrder || showSurvey">
      <loader v-if="settingsLoading" />

      <template v-else-if="settingsLoaded || settingsError">
        <router-view />
      </template>
    </template>

    <modal v-if="showAuth" :show="showAuth" @close="closeModal">
      <div class="auth-form">
        <h3 class="auth-form__title">Войти</h3>
        <authorization-form @authFinish="authFinish"/>
      </div>
    </modal>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import Modal from '@/components/common/Modal'
  import Loader from '@/components/common/Loader'
  import ErrorFetch from '@/components/common/Error/ErrorFetch'
  import AuthorizationForm from "@/site/components/Authorization/AuthorizationForm";

  export default {
    name: 'App',

    components: {
      AuthorizationForm,
      Loader,
      ErrorFetch,
      Modal
    },

    data: () => ({
      showCompare: false,
      showOrder: false,
      showAuth: false,
      showSurvey: false,
    }),

    computed: {
      ...mapState({
        settingsLoading: state => state.settings.loading,
        settingsLoaded: state => state.settings.loaded,
        settingsError: state => state.settings.error,
        clientInit: state => state.client.isInitialized,
        clientId: state => state.client.clientId
      }),

      mobile() {
        return window.innerWidth < 768
      },

      mainHeight() {
        if (this.mobile && this.showOrder) {
          return '100%'
        }

        return 'calc(100% - 60px)'
      },

      mainTopOffset() {
        if (this.mobile && this.showOrder) {
          return 0
        }

        return '60px'
      }
    },

    methods: {
      authFinish() {
        this.showAuth = false
        window.location = 'https://www.domovenok.su/order'
      },

      closeModal() {
        this.showAuth = false
      }
    },

    mounted() {
      window.addEventListener('showCompare', () => {
        this.showCompare = true
      })

      window.addEventListener('showAuthForm', () => {
        this.showAuth = true
      })

      window.addEventListener('showSurvey', () => {
        this.showSurvey = true
      })

      window.addEventListener('showOrder', () => {
        this.showOrder = true
      })
    }
  }
</script>

<style>
  @import "../css/reset.css";
  @import "../css/variables.css";
  @import "../css/components/ps.css";

  .page {
    font-family: var(--base-font-family);

    @media (--tablet) {
      background-color: #f6f6f6;
    }
  }

  .app-container-wrap {
    height: 100%;
  }

  .auth-form {
    padding-top: 50px;
    padding-left: 25px;
    padding-right: 25px;
    padding-bottom: 50px;

    &__title {
      margin-bottom: 20px;
      font-size: 21px;
      font-family: var(--base-font-family);
      color: #353535;
      text-align: center;
    }
  }

</style>

