<template>
  <form class="invite-friend-form" @submit.prevent="submit">
    <h2 class="invite-friend-form__title text">Пригласить друга</h2>
    <input v-model="user.name" type="text" class="invite-friend-form__input input" name="name" placeholder="Имя друга">
    <input v-model="user.contact" type="text" class="invite-friend-form__input input" name="phone" placeholder="Телефон или e-mail">
    <p v-if="sendContactError" class="invite-friend-form__error">Ошибка, повторите попытку позднее</p>
    <p v-if="sendContactExist" class="invite-friend-form__error">Уже является нашим клиентом</p>
    <p v-if="sendContactSuccess" class="invite-friend-form__success">Приглашение отправлено</p>
    <button class="invite-friend-form__button button">
      <template v-if="sendContactLoading">Отправка...</template>
      <template v-else>Пригласить</template>
    </button>
  </form>
</template>

<script>
  import api from 'vue_components/src/api/index'
  import analytic from '@/store/common/analytic'

  export default {
    name: 'InviteFriendForm',

    data: () => ({
      user: {
        name: null,
        contact: null
      },
      sendContactLoading: false,
      sendContactError: false,
      sendContactExist: false,
      sendContactSuccess: false
    }),

    methods: {
      async submit() {
        if (!this.sendContactLoading) {
          this.sendContactLoading = true

          try {
            await api.client.sendInvitation(this.user)

            this.sendContactLoading = false
            this.sendContactError = false
            this.sendContactExist = false
            this.sendContactSuccess = true

            this.user.name = null
            this.user.contact = null

            setTimeout(() => {
              this.sendContactSuccess = false
            }, 3000)

            analytic.sendEvent({name: "button", value: "recommend_direct", ga_action: "click"}, ['ga', 'af', 'fb']);

          } catch(error) {
            this.sendContactLoading = false

            if (error.error) {
              if (error.error.text === "Is already a customer") {
                this.sendContactExist = true
              }else {
                this.sendContactError = true
              }
            } else {
              this.sendContactError = true
            }
          }
        }
      }
    }
  }

</script>

<style>
  @import "../../css/variables.css";
  @import "../../css/mixins.css";
  @import "../../css/components/input.css";
  @import "../../css/components/button.css";
  @import "../../css/components/text.css";

  .invite-friend-form {
    width: 250px;
    margin: 20px auto;
    padding-right: 0;
    padding-left: 0;

    @media (--tablet) {
      width: 280px;
      padding-right: 20px;
      padding-left: 20px;
    }

    &__error {
      text-align: center;
      color: var(--color-red);
    }

    &__success {
      text-align: center;
      color: var(--color-green);
    }

    &__title {
      margin-bottom: 20px;
      font-size: 16px;
      text-align: center;
    }

    &__input {
      margin-bottom: 10px;
    }

    &__button {
      margin-top: 20px;
      width: 100%;
    }
  }
</style>
