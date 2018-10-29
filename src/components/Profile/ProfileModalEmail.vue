<template>
  <form class="profile-modal-email" @submit.prevent="sendContact">
    <p class="profile-modal-email__text">Пожалуйста введите ваш email.<br> Он нужен, чтобы вы могли получать от нас электронные чеки.</p>

    <label class="profile-modal-email__label">
      <input class="profile-modal-email__input input"
             :class="{'profile-modal-email__input--invalid': !clientEmail.valid}"
             type="email"
             @change="emailChange"
             required
             v-model="clientEmail.value" placeholder="Введите email">

      <p v-if="!clientEmail.valid" class="profile-modal-email__error">Email был введен неправильно</p>
    </label>
    <button class="profile-modal-email__button button" :disabled="disableButton">
      <template v-if="sendEmailLoading">
        Отправляется...
      </template>
      <template v-else>
        Отправить
      </template>
    </button>
  </form>
</template>

<script>
  import api from  'vue_components/src/api'
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

	export default {
		name: 'ProfileModalEmail',

		data: () => ({
      clientEmail: {
        valid: true,
        value: ''
      },
      sendEmailLoading: false,
      disableButton: false
    }),

		methods: {
      ...mapActions(['defineError', 'getContactInfo']),

      async sendContact() {
        if (!this.sendEmailLoading) {
          this.sendEmailLoading = true

          if (this.emailValid(this.clientEmail.value)) {
            const params = {
              contacts: [
                {
                  'type': 'mail',
                  'title': this.clientEmail.value
                }
              ]
            }

            try {
              await api.client.editContactInfo(params)

              this.getContactInfo()

              this.$emit('result', true)
            } catch(error) {
              this.sendEmailLoading = false

              this.$emit('result', false)

              this.defineError({
                error: error,
                name: 'editContactInfo',
                params: params
              })
            }
          } else {
            this.sendEmailLoading = false
            this.clientEmail.valid = false
          }

          this.sendEmailLoading = false
        }
      },

      emailChange() {
        this.clientEmail.valid = true
      },

      emailValid(value) {
        let valid = true
        const regexp = /^[^а-я]{0,30}$/

        if (!regexp.test(value) || value === '') {
          valid = false
        }

        return valid
      },
    }
	}
</script>

<style>
  @import "../../css/variables.css";
  @import "../../css/components/button.css";
  @import "../../css/components/input.css";

  .profile-modal-email {
    width: auto;
    padding: 30px 20px;

    @media (--tablet) {
      width: 400px;
      padding: 30px 20px;
    }

    &__text {
      font-family: var(--base-font-family);
      margin-bottom: 30px;
      font-size: 14px;
      color: #000;
      line-height: 1.3em;
      text-align: center;

      @media (--tablet) {
        font-size: 16px;
      }
    }

    &__input {
      margin-bottom: 20px;

      @media (--tablet) {
        margin-bottom: 30px;
      }

      &--invalid {
        border-color: var(--color-red);
      }
    }

    &__label {
      position: relative;
    }

    &__error {
      font-family: var(--base-font-family);
      font-size: 12px;
      position: absolute;
      bottom: -33px;
      color: var(--color-red);
    }

    &__button {
      width: 100%;
      margin: auto;
      background-color: #ff5a19;

      @media (--tablet) {
        width: auto;
      }
    }
  }
</style>
