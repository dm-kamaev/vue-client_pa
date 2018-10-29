<template>
  <form class="worker-application" @submit.prevent>

    <template v-if="!showSuccessWindow">
      <h3 class="worker-application__title  title">Заполните заявку</h3>

      <input
        class="worker-application__input  input"
        :class="{'worker-application__input--invalid': !name.valid}"
        type="text"
        name="name"
        placeholder="ФИО"
        v-model="name.value"
        @input="change(name)"
      >
      <input-mask
        placeholder="Телефон"
        ref="input"
        v-model="phone.value"
        class="worker-application__input  input"
        :class="{'worker-application__input--invalid': !phone.valid}"
        @input="change(phone)"
      />
      <input
        class="worker-application__input  worker-application__input--small  input"
        :class="{'worker-application__input--invalid': !citizenship.valid}"
        type="text"
        name="citizenship"
        placeholder="Граждаство"
        v-model="citizenship.value"
        @input="change(citizenship)"
      >
      <input
        class="worker-application__input  worker-application__input--small  input"
        :class="{'worker-application__input--invalid': !birthdate.valid}"
        type="number"
        name="birthdate"
        placeholder="Год рождения"
        v-model="birthdate.value"
        @input="change(birthdate)"
      >
      <custom-select
        class="worker-application__select  custom-select--big"
        :options="options"
        label="label"
        v-model="chosenCity"
      />

      <p v-if="sendFormError" class="worker-application__error">Ошибка, повторите попытку позднее</p>

      <button ref="button" class="worker-application__button  button" type="button" @click="submit">
        <template v-if="sendFormLoading">Отправка...</template>
        <template v-else>Оставить заявку</template>
      </button>
    </template>

    <p v-else class="worker-application__success">Спасибо за завку. Мы свяжемся с вами в ближайшее время.</p>
  </form>
</template>

<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  import api from 'vue_components/src/api'
  import analytic from '@/store/common/analytic'

  import InputMask from '@/components/common/InputMask'
  import CustomSelect from '@/components/NewFullApplication/CustomSelect/index'

	export default {
		name: 'WorkerApplication',

    components: {
      CustomSelect,
      InputMask
    },

		data: () => ({
      name: {
        valid: true,
        value: ''
      },
      birthdate: {
        valid: true,
        value: ''
      },
      citizenship: {
        valid: true,
        value: ''
      },
      phone: {
        valid: true,
        value: ''
      },
      options: [
        {
          label: 'Москва',
          value: 'moscow'
        },
        {
          label: 'Санкт-Петербург',
          value: 'spb'
        },
        {
          label: 'Нижний-Новгород',
          value: 'nn'
        }
      ],
      chosenCity: null,
      sendFormLoading: false,
      sendFormError: false,
      showSuccessWindow: false
    }),

		methods: {
      ...mapActions(['defineError']),

      validate() {
        let valid = true;

        if (this.name.value === '') {
          this.name.valid = false
          valid = false;
        }

        if (this.birthdate.value === '' || this.birthdate.value.length !== 4 || !(Number(this.birthdate.value) < 1995)) {
          this.birthdate.valid = false
          valid = false;
        }

        if (this.citizenship.value === '') {
          this.citizenship.valid = false
          valid = false;
        }

        if (this.phone.value === '' || this.phone.value.search('_') !== -1) {
          this.phone.valid = false
          valid = false;
        }

        return valid;
      },

		  async submit() {
        if (this.validate()) {
          this.sendFormLoading = true

          const params = {
            contact: this.phone.value,
            name: this.name.value,
            citizenship: this.citizenship.value,
            birthdate: this.birthdate.value,
            city: this.chosenCity.value
          }

          try {
            await api.common.sendApplicationWorker(params)

            this.showSuccessWindow = true
            analytic.sendEvent({name: "form", value: "applicant_cleaner", ga_action: "send"}, ['ga', 'af', 'fb']);
          } catch (error) {
            this.sendFormLoading = false
            this.sendFormError = true

            this.defineError({
              error: error,
              name: 'sendApplicationWorker',
              params: params
            })
          }
        } else {
          this.$refs.button.disabled = true
        }
      },

      change(item) {
        item.valid = true
        this.$refs.button.disabled = false
      }
    },

    mounted() {
		  this.chosenCity = this.options[0]
    }
	}
</script>
<style scoped>
  @import "../../css/variables.css";
  @import "../../css/components/button.css";
  @import "../../css/components/input.css";

  .worker-application {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 700px;
    margin-top: 30px;

    @media (--tablet) {
      width: auto;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 580px;
      margin: auto;
    }

    &__title {
      margin-bottom: 30px;
      font-size: 18px;
      line-height: 25px;
      font-weight: 400;
      color: #000000;

      @media (--tablet) {
        width: 100%;
        margin-bottom: 40px;
        text-align: center;
        font-size: 24px;
      }
    }

    &__input {
      box-sizing: border-box;
      width: 280px;
      margin-bottom: 20px;
      padding-top: 12px;
      padding-bottom: 12px;
      line-height: 20px;

      @media (--tablet) {
        font-size: 16px;
      }

      &::placeholder {
        color: #888888;

        @media (--tablet) {
          font-size: 16px;
        }
      }

      &:nth-of-type(2n+2) {
        @media (--tablet) {
          margin-left: 20px;
        }
      }

      &--small {
        @media (--tablet) {
          width: 180px;
        }
      }

      &--invalid {
        border-color: var(--color-red);
      }
    }

    &__select {
      width: 280px;
      margin-bottom: 20px;

      @media (--tablet) {
        width: 180px;
        margin-left: 20px;
      }
    }

    &__button {
      width: 280px;
      margin-top: auto;
      padding-top: 15px;
      padding-bottom: 15px;

      @media (--tablet) {
        width: 260px;
        margin-top: 20px;
        font-size: 16px;
      }
    }

    &__error {
      text-align: center;
      color: var(--color-red);

      @media (--tablet) {
        width: 100%;
      }
    }

    &__success {
      padding: 0 30px;
      text-align: center;
      color: #000;
      font-size: 18px;
    }
  }

  .worker-application__select .custom-select__tag {
    padding-top: 14px;
    padding-bottom: 13px;
  }
</style>
