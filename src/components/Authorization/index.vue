<template>
  <div class="authorization">
    <div v-if="!isWorker" class="authorization__wrap">

        <authorization-get-phone
          class="authorization__form"
          v-if="!codeSent"
          v-model="phone"
          @submit="formGetPhoneSubmit"
        />

        <authorization-get-code
          v-else
          class="authorization__form"
          :phone="phone"
          :timer="timer"
          :code="code"
          @back="back"
          @submit="formGetPhoneSubmit"
        />
    </div>

    <worker-application v-else />

    <a v-if="!isWorker"
      @click="isWorker = true"
       class="authorization__link">
      Я хочу работать
    </a>

  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  import api from  'vue_components/src/api'
  import { types } from '@/store'


  import Loader from '@/components/common/Loader'
  import WorkerApplication from '@/components/WorkerApplication'
  import AuthorizationGetPhone from './AuthorizationGetPhone'
  import AuthorizationGetCode from './AuthorizationGetCode'

  export default {
    name: 'Authorization',

    components: {
      Loader,
      WorkerApplication,
      AuthorizationGetPhone,
      AuthorizationGetCode
    },

    data: () => ({
      codeSent: false,
      timer: 0,
      phone: process.env.NODE_ENV === 'development' ? '+7 (915) 493-49-99' : '',
      code: process.env.NODE_ENV === 'development' ? '' : '',
      isWorker: false
    }),

    methods: {
      ...mapActions(['signIn', 'setCookies', 'defineError']),

      formGetPhoneSubmit(timeout) {
        this.codeSent = true
        this.timer = timeout

        this.setTimer()
      },

      setTimer() {
        const timer = setInterval(() => {
          if (this.timer) {
            this.timer--
          } else {
            clearInterval(timer);
          }
        }, 1000);
      },

      back() {
        this.codeSent = false
        this.code = ''
      }
    },

    mounted() {
      if (localStorage['auth-phone']) {
        this.phone = localStorage['auth-phone']
      }
    }
  }
</script>

<style>
  @import "../../css/variables.css";
  @import "../../css/components/button.css";
  @import "../../css/components/input.css";

  .authorization {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh);

    &__wrap {
      min-height: 300px;
      margin: auto;
    }

    &__form {
      box-sizing: border-box;
      width: 100%;
      max-width: 375px;
      margin: auto;
      padding: 20px;

      @media (--tablet) {
        width: 370px;
      }
    }

    &__link {
      text-align: center;
      margin-bottom: 30px;
      font-size: 14px;
      line-height: 19px;
      text-decoration: underline;
      color: #353535;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      @media (--tablet) {
        margin-top: 40px;
      }
    }
  }
</style>
