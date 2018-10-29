<template>
  <div>
    <form v-if="!codeSent" @submit.prevent="getCodeHandler" class="authorization__form">
      <input-mask
        ref="input"
        v-model="phone"
        class="authorization__input  authorization__input--tel  input"
        placeholder="Введите номер телефона"
      />
      <p v-if="codeErrorCode">Ошибка</p>

      <button ref="button" class="authorization__button  authorization__button--getpassword  button" type="submit">
        <template v-if="codeLoading">Загрузка...</template>
        <template v-else>Выслать код</template>
      </button>

    </form>

    <form v-else @submit.prevent="loginHandler" class="authorization__form">
      <input type="number"
        class="authorization__input  authorization__input--password  input" id="password"
        name="code"
        autocomplete="off"
        autofocus v-model="code"
        placeholder="Введите SMS-код"
      >
      <p v-if="authErrorCode">Ошибка</p>
      <p v-if="authEmployee">Вы являетесь сотрудником, перейдите в веб. версию Личного кабинета www.domovenok.su/private</p>

      <button class="authorization__button  button" type="submit">
        <template v-if="authLoading">Загрузка...</template>
        <template v-else="">Отправить</template>
      </button>
    </form>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  import api from 'vue_components/src/api'
  import { types } from '@/store'

  import InputMask from '@/components/common/InputMask'
  import Loader from '@/components/common/Loader'
  import WorkerApplication from '@/components/WorkerApplication'

  export default {
    name: 'AuthorzationForm',

    components: {
      Loader,
      InputMask
    },

    data: () => ({
      codeSent: false,
      codeLoading: false,
      codeErrorCode: null,
      phone: process.env.NODE_ENV === 'development' ? '+7 (915) 493-49-99' : '',
      authLoading: false,
      authErrorCode: '',
      authEmployee: false,
      code: process.env.NODE_ENV === 'development' ? '1111' : '',
    }),

    methods: {
      ...mapActions(['signIn', 'setCookies', 'defineError']),

      async getCodeHandler() {
        this.codeLoading = true

        try {
          const params = {
            phone: this.phone
          }

          const { result } = await api.auth.getCode(params)

          if (result) {
            this.codeLoading = false
            this.codeErrorCode = null
            this.codeSent = true
          } else {
            this.codeLoading = false
          }
        } catch (error) {
          this.codeLoading = false

          this.defineError({
            error: error,
            name: 'getCode'
          })
        }
      },

      async loginHandler() {
        this.authLoading = true

        try {
          const params = {
            phone: this.phone,
            code: this.code
          }

          const { clientId, employeeId, cookies } = await api.auth.login(params)

          this.authLoading = false

          if (clientId) {
            this.signIn()
            this.$emit('authFinish')
          }
        } catch(error) {
          this.authLoading = false
          this.authErrorCode = true

          this.defineError({
            error: error,
            name: 'login'
          })
        }
      },
    }
  }
</script>

<style scoped>
  @import "../../css/variables.css";
  @import "../../css/components/button.css";
  @import "../../css/components/input.css";

  .authorization {
    padding-top: 90px;

    @media (--tablet) {
      padding-top: 110px;
    }

    @media (--desktop) {
      padding-top: 150px;
    }

    &--hide {
      display: none;
    }

    &__form {
      box-sizing: border-box;
      width: 100%;
      max-width: 375px;
      margin: auto;

      @media (--tablet) {
        width: 370px;
      }
    }

    &__form {
      display: flex;
      flex-direction: column;
    }

    &__title {
      position: absolute;
      top: 10px;
      right: 0;
      width: 70%;
      font-weight: bold;
      font-size: 18px;

      & span {
        color: var(--new-text-color-orange);
      }
    }

    &__heading {
      margin-bottom: 0;
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      color: #353535;

      @media (--tablet) {
        font-size: 21px;
      }

      @media (--desktop) {
        font-size: 24px;
      }
    }

    &__text {
      position: absolute;
      top: 40px;
      right: 0;
      width: 70%;
      font-weight: bold;
    }

    &__input {
      padding-top: 15px;
      padding-bottom: 15px;
      border-color: #cbc9c9;
      text-align: center;
      color: #353535;

      &:focus {
        border-color: #ff5a19;
      }
    }

    &::placeholder {
      color: #353535;
    }

    &__button {
      width: 100%;
      margin-top: 15px;
      padding-top: 15px;
      padding-bottom: 15px;
      background-color: #ff5a19;

      @media (--tablet) {
        font-size: 16px;
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
          background-color: #ff5a19;
        }
      }
    }

    &__link {
      position: fixed;
      bottom: 30px;
      width: 100%;
      left: 0;
      text-align: center;
      font-size: 14px;
      line-height: 19px;
      text-decoration: underline;
      color: #353535;
      cursor: pointer;

      @media (--tablet) {
        margin-top: 40px;
      }
    }

    &__note {
      margin-top: 10px;
      font-size: var(--font-size-xs);
      text-align: center;
      color: red;
    }
  }
</style>
