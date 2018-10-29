<template>
  <form
    class="authorization-get-phone"
    @submit.prevent="getCode" >

    <h3 class="authorization-get-phone__title">Вход в личный кабинет</h3>

    <label class="authorization-get-phone__label">
      Введите номер телефона
      <input-mask
        ref="input"
        :value="value"
        @input="input"
        class="authorization-get-phone__input input"
      />
    </label>

    <p v-if="codeErrorCode">Ошибка</p>

    <button
      ref="button"
      class="authorization-get-phone__button button"
      type="submit"
      :disabled="value === ''"
    >
      <template v-if="codeLoading">Отправка...</template>
      <template v-else>Получить код</template>
    </button>
  </form>
</template>

<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  import api from  'vue_components/src/api'
  import { types } from '@/store'
  import InputMask from '@/components/common/InputMask'

	export default {
		name: 'AuthorizationGetPhone',

    components: {
      InputMask
    },

    props: {
		  value: {
		    type: String
      }
    },

		data: () => ({
      codeErrorCode: null,
      codeLoading: false
    }),

		methods: {
      ...mapActions([ 'defineError' ]),

      input(value) {
        this.$emit('input', value)
      },

      async getCode() {
        if (this.codeLoading) {
          return
        }

        this.codeLoading = true

        const params = {
          phone: this.value
        }

        try {
          const data = await api.auth.getCode(params)

          if (data['x-dom-auth'] && this.$store.state.common.isApp) {
            localStorage.setItem('x-dom-auth', data['x-dom-auth'])
          }

          localStorage.setItem('auth-phone', this.value);

          this.codeLoading = false

          if (data.result) {
            this.$emit('submit', data.timeout)
          } else {
            if (data.timeout) {
              this.$emit('submit', data.timeout)
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
    },

    mounted() {
		  this.$refs.input.$el.focus()
    }
	}
</script>

<style scoped>
  @import "../../css/variables.css";
  @import "../../css/components/button.css";
  @import "../../css/components/input.css";

  .authorization-get-phone {

    &__input {
      margin-top: 15px;
      padding-top: 15px;
      padding-bottom: 15px;
      text-align: center;
    }

    &__button {
      width: 100%;
      margin-top: 10px;
      padding: 15px 0;

      @media (--tablet) {
        font-size: 16px;
      }
    }

    &__label {
      display: block;
      margin-bottom: 30px;
      text-align: center;
      color: #cbc9c9;

      &--hide {
        display: none;
      }
    }

    &__title {
      font-family: var(--base-font-family);
      margin-bottom: 30px;
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
  }
</style>
