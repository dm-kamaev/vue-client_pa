<template>
  <div>
    <application-header @backwards="prev">
      <template v-if="codeSent">
        Введите SMS-код
      </template>

      <template v-else>
        Введите номер телефона
      </template>
    </application-header>

    <form class="application-contacts__form" @submit.prevent="getCode">

      <calculator-item class="application-contacts__section" v-if="!codeSent">
        <label class="application-contacts__label">
          <input-mask
            ref="input"
            v-model="phone"
            class="application-contacts__input input"
          />
        </label>
      </calculator-item>

      <calculator-item class="application-contacts__section" v-else>

        <p class="application-contacts__text">Мы отправили код на номер <br> {{ phone }} </p>

        <a class="application-contacts__link" @click="prev">Изменить номер</a>

        <label class="application-contacts__label" for="password" >
          <input
            ref="input"
            type="number"
            class="application-contacts__input input"
            id="password"
            name="code"
            autocomplete="off"
            placeholder="____"
            autofocus
            v-model="code"
            :disabled="code.length === 4 && !errorCode"
          >

          <span v-if="errorCode" class="application-contacts__error">Вы ввели неверный проверочный код.</span>
          <span v-if="isEmployee" class="application-contacts__error">Вы являетсь сотрудником, для оставления заявки свяжитесь с нашими менеджерами.</span>
        </label>
      </calculator-item>

      <div class="application-contacts__btns-wrapper">
        <custom-button class="application-contacts__button" :disabled="phone === ''" type="submit" v-if="!codeSent">
          <template v-if="codeLoading">Отправка...</template>
          <template v-else>Получить код</template>
        </custom-button>

        <custom-button
          v-else
          class="application-contacts__button"
          :disabled="timer > 0"
          type="submit">
          <template v-if="!codeLoading">Запросить код повторно
            <template v-if="timer">
              {{ formatTimer }}
            </template>
          </template>

          <template v-else>Отправка...</template>
        </custom-button>
      </div>

    </form>

  </div>
</template>

<script>
  import analytic from '@/store/common/analytic'
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  import api from  'vue_components/src/api'
  import types from '@/store/types'
  import moment from 'moment'
  import _ from 'lodash'

  import ApplicationHeader from '../../ApplicationHeader'
  import CustomButton from '@/components/common/CustomButton'
  import CalculatorItem from '../../../calculator/CalculatorItem'
  import InputMask from '@/components/common/InputMask'

  export default {
    name: 'ApplicationContacts',

    components:{
      ApplicationHeader,
      CustomButton,
      CalculatorItem,
      InputMask
    },

    data: () => ({
      phone: '',
      code: '',
      codeSent: false,
      codeLoading: false,
      timer: 0,
      loading: false,
      errorCode: false,
      isEmployee: false
    }),

    computed: {
      ...mapState({
        mobile: state => state.common.isMobile
      }),

      formatTimer() {
        return moment().minutes(Math.floor(this.timer / 60)).seconds(this.timer % 60).format('mm:ss');
      }
    },

    methods: {
      ...mapMutations({
        setEmployeeId: types.SET_EMPLOYEE_ID,
        setClientId: types.SET_CLIENT_ID
      }),

      ...mapActions([ 'defineError', 'signIn', 'setCookies', 'orderNextStep' ]),

      focus() {
        if (this.mobile) {
          document.querySelector('.application-sidebar').style.display = 'none'
          document.querySelector('.application-contacts__btns-wrapper').style.display = 'none'
        }
      },

      blur() {
        if (this.mobile) {
          document.querySelector('.application-sidebar').style.display = 'block'
          document.querySelector('.application-contacts__btns-wrapper').style.display = 'flex'
        }
      },

      async getCode() {
        if (this.codeLoading) {
          return
        }

        this.codeLoading = true

        const params = {
          phone: this.phone
        }

        try {
          const data = await api.auth.getCode(params)

          if (data['x-dom-auth'] && this.$store.state.common.isApp) {
            localStorage.setItem('x-dom-auth', data['x-dom-auth'])
          }

          localStorage.setItem('auth-phone', this.phone);

          this.codeLoading = false

          if (data.result) {
            this.codeSent = true
            this.timer = data.timeout

            this.setTimer()
          } else {
            if (data.timeout) {
              this.codeSent = true
              this.timer = data.timeout

              this.setTimer()
            } else {
              this.codeErrorCode = true
            }
          }
        } catch (error) {
          this.codeLoading = false
          this.codeErrorCode = true

          this.defineError({
            error: error,
            name: 'getCode',
            params: params
          })
        }
      },

      async loginHandler() {
        if (this.loading) {
          return
        }

        this.loading = true
        this.showButton = false

        try {
          const params = {
            phone: this.phone,
            code: this.code
          }

          const { clientId, employeeId, cookies } = await api.auth.login(params)

          if (clientId) {
            this.setClientId({ clientId })
          }


          if (clientId) {
            if (cookies) {
              this.setCookies(cookies)
            }

            await this.signIn()

            this.orderNextStep()
          }

          if (employeeId && !clientId) {
            this.isEmployee = true
          }

          this.loading = false
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
      },

      prev() {
        if (this.codeSent) {
          this.codeSent = false
          this.errorCode = false
          this.code = ''
        } else {
          this.$router.go(-1)
        }
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

      loginHandlerThrottle: _.throttle(function() {
        this.loginHandler()
      }, 300),
    },

    watch: {
      code() {
        if (this.code.length > 4) {
          this.code = this.code.slice(0, 4)
        }

        if (this.code.length === 4) {
          this.errorCode = false
          this.loginHandlerThrottle()
        }
      },

      beforeRouteEnter (to, from, next) {
        next(vm => {
          vm.checkOrderRoute(to, from)
        })
      },
    },

    mounted() {
      analytic.sendEvent({name: "form", value: "order_new_contacts", ga_action: "open"}, ['ga', 'af', 'fb'])
    }
  }
</script>

<style scoped>
  @import "../../../../css/variables.css";
  @import "../../../../css/components/input.css";

  .application-contacts {
    display: flex;
    flex-direction: column;

    @media (--desktop) {
      flex-direction: row;
      justify-content: space-between;
    }

    &__form {
      @media (--tablet) {
        width: 370px;
        margin: auto;
      }
    }

    &__button {
      width: 100%;
    }

    &__btns-wrapper {
      position: fixed;
      bottom: 0;
      z-index: 10;
      display: flex;
      width: 100%;

      @media (--tablet) {
        position: static;
      }
    }

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
