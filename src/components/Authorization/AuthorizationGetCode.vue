<template>
  <form
    class="authorization-get-code"
    @submit.prevent="getCode" >

    <p class="authorization-get-code__text">Мы отправили код на номер <br> {{ phone }} </p>

    <a class="authorization-get-code__link" @click="backward">Изменить номер</a>

    <label class="authorization-get-code__label" for="password">
      Введите SMS-код
      <input
        ref="input"
        type="number"
        class="authorization-get-code__input input"
        id="password"
        name="code"
        autocomplete="off"
        placeholder="____"
        autofocus
        v-model="value"
        :disabled="value.length === 4 && !errorCode"
      >

      <span v-if="errorCode" class="authorization-get-code__error">Вы ввели неверный проверочный код.</span>
    </label>

    <p v-if="authEmployee">Вы являетесь сотрудником, перейдите в веб. версию Личного кабинета www.domovenok.su/private</p>

    <button
      v-if="showButton"
      class="authorization-get-code__button  button"
      :disabled="timer > 0"
      type="submit">
      <template v-if="!loading">Запросить код повторно
        <template v-if="timer">
          {{ formatTimer }}
        </template>
      </template>

      <template v-else>Отправка...</template>
    </button>
  </form>
</template>

<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  import api from  'vue_components/src/api'
  import { types } from '@/store'
  import moment from 'moment'
  import _ from 'lodash'

	export default {
		name: 'AuthorizationGetCode',

    props: {
		  code: {
		    type: String
      },

      phone: {
		    type: String,
        required: true
      },

      timer: {
		    type: Number
      }
    },

		data: () => ({
      loading: false,
      errorCode: '',
      authEmployee: false,
      showButton: true,
      value: ''
    }),

    computed: {
		  formatTimer() {
		    return moment().minutes(Math.floor(this.timer / 60)).seconds(this.timer % 60).format('mm:ss');
      }
    },

		methods: {
      ...mapMutations({
        setEmployeeId: types.SET_EMPLOYEE_ID,
        setClientId: types.SET_CLIENT_ID
      }),

      ...mapActions(['signIn', 'setCookies', 'defineError']),

      async loginHandler() {
        if (!this.loading) {
          this.loading = true
          this.showButton = false

          const params = {
            phone: this.phone,
            code: this.value
          }

          try {
            const { clientId, employeeId, cookies } = await api.auth.login(params)

            if (clientId) {
              this.setClientId({ clientId })
            }

            if (employeeId) {
              this.setEmployeeId({ employeeId })
            }

            this.loading = false

            if (!this.$store.state.common.isApp) {
              if (employeeId) {
                window.location = '/staff'
              } else {

                if (cookies) {
                  this.setCookies(cookies)
                }

                this.signIn()
              }
            } else {
              if (employeeId && !clientId) {
                this.authEmployee = true
              } else {
                if (cookies) {
                  this.setCookies(cookies)
                }

                this.signIn()
              }
            }
          } catch (error) {
            this.loading = false
            this.errorCode = true
            this.showButton = true

            this.defineError({
              error: error,
              name: 'login',
              params: params
            })
          }
        }
      },

      async getCode() {
        if (this.loading) {
          return
        }

        this.loading = true

        const params = {
          phone: this.phone
        }

        try {
          const data = await api.auth.getCode(params)

          this.loading = false

          if (data.timeout) {
            this.$emit('submit', data.timeout)
          }
        } catch (error) {
          this.defineError({
            error: error,
            name: 'getCode',
            params: params
          })
        }
      },

      loginHandlerThrottle: _.throttle(function() {
        this.loginHandler()
      }, 300),

      backward() {
        this.$emit('back')
      },

      input(e) {
        if (e.target.value.length <= 4) {
          this.$emit('input', e.target.value)
        }
      }
    },

    watch: {
      value() {
        if (this.value.length > 4) {
          this.value = this.value.slice(0, 4)
        }

        if (this.value.length === 4) {
          this.errorCode = false
          this.loginHandlerThrottle()
        }
      }
    },

    mounted() {
		  this.value = this.code

      if (this.value.length === 4) {
        this.loginHandlerThrottle()
      }

      this.$refs.input.focus()
    }
	}
</script>

<style scoped>
  @import "../../css/variables.css";
  @import "../../css/components/button.css";
  @import "../../css/components/input.css";

  .authorization-get-code {

    &__input {
      margin-top: 15px;
      padding-top: 15px;
      padding-bottom: 15px;
      text-align: center;

      &::placeholder {
        letter-spacing: 2px;
      }

      &:disabled {
        opacity: 0.7;
      }
    }

    &__button {
      width: 100%;
      margin-top: 10px;
      padding: 15px 0;
      background-color: #dadada;
      color: #353535;

      &:hover {
        @media (--tablet) {
          background-color: #e5e5e5;
          color: #353535;
        }
      }

      &:focus {
        background-color: #e5e5e5;
        color: #353535;
      }

      &:active {
        background-color: #dadada;
        color: #353535;
      }
    }

    &__error {
      position: absolute;
      bottom: -30px;
      left: 0;
      width: 100%;
      font-size: 12px;
      color: var(--color-red);
      text-align: center;
      margin-bottom: 10px;

      @media (--tablet) {
        font-size: 14px;
      }
    }

    &__label {
      position: relative;
      font-size: 14px;
      display: block;
      margin-bottom: 30px;
      text-align: center;
      color: #cbc9c9;

      @media (--tablet) {
        font-size: 16px;
      }
    }

    &__text {
      font-size: 14px;
      color: #353535;
      text-align: center;
      margin-bottom: 10px;

      @media (--tablet) {
        font-size: 16px;
      }
    }

    &__link {
      display: block;
      font-size: 14px;
      color: #353535;
      text-align: center;
      text-decoration: underline;
      margin-bottom: 20px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      @media (--tablet) {
        font-size: 16px;
      }
    }
  }
</style>
