<template>
  <div class="profile-personal">
    <div class="profile-personal__wrap">
      <div class="profile-personal__wrap-text">
        <p class="profile-personal__line profile-personal__line--orange">{{ name }}</p>

        <template v-if="contacts.length">
          <p v-for="item in contacts" class="profile-personal__line">{{ item.title }}</p>
        </template>

        <!--<button v-if="showButton" class="profile-personal__add-email" @click="addEmail">Добавить email</button>-->
      </div>

      <!--<div class="profile-personal__image"></div>-->
    </div>

    <!--<button class="profile-personal__button button" @click="editPersonal">Редактировать</button>-->
    <modal v-if="showForm" :show="showForm" @close="closeForm">
      <profile-modal-email @result="emailResult"/>
    </modal>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
  import types from '@/store/types'
  import Modal from '@/components/common/Modal'
  import Popup from '@/components/common/Popup'
  import ProfileModalEmail from "@/components/Profile/ProfileModalEmail"

	export default {
		name: 'ProfilePersonalSection',

    components: {
      Modal,
      ProfileModalEmail,
      Popup
    },

		data: () => ({
      showForm: false
    }),

    computed: {
      ...mapState({
        name: state => state.client.fullTitle,
        contacts: state => state.client.profile.contacts
      }),

      mobile() {
        return window.innerWidth < 768
      },

      showButton() {
        let exist = false

        if (this.$store.state.client.profile.contacts.length) {
          exist = this.$store.state.client.profile.contacts.some((item) => {
            return item.type === 'mail'
          })
        }

        return !exist
      }
    },

		methods: {
      ...mapMutations({
        showAlert: types.SHOW_ALERT
      }),

      editPersonal() {
        this.info = false
        this.personalEdit = true
      },

      addEmail() {
        this.showForm = true
      },

      emailResult(value) {
        this.showForm = false

        if (value) {
          this.showAlert({ view: 'message', text: 'Email был успешно добавлен', timer: 3000, type: 'success' })
        } else {
          this.showAlert({ view: 'message', text: 'Произошла ошибка, свяжитесь с нашими менеджерами', timer: 3000, type: 'error' })
        }
      },

      closeForm() {
        this.showForm = false

        this.showAlert({ view: 'message', text: 'Для того чтобы привязать карту нужно добавить email', timer: 3000, type: 'error' })
      }
    }
	}
</script>
<style>
  @import "../../css/variables.css";
  @import "../../css/components/button.css";

  .profile-personal {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media (--tablet) {
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: flex-start;
    }

    &__wrap {
      display: flex;
    }

    &__button {
      border: 1px solid rgba(38, 50, 57, 0.12);
      color: #353535;
      background-color: #ffffff;

      @media (--tablet) {
        width: 180px;
        margin-left: auto;
      }
    }

    &__image {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: #e6e6e6 url("img/user-photo.svg") no-repeat center;
      background-size: 48px;

      @media (--tablet) {
        order: -1;
        width: 100px;
        height: 100px;
        margin-right: 50px;
      }
    }

    &__line {
      margin-bottom: 15px;
      font-family: var(--base-font-family);
      font-size: var(--font-size-sm);
      line-height: 19px;
      color: #263239;
      text-overflow: ellipsis;
      white-space: pre;
      overflow: hidden;

      @media (--tablet) {
        font-size: 16px;
        line-height: 22px;
      }

      &:last-child {
        margin-bottom: 0;
      }

      &--orange {
        color: #ff5a19;
        font-size: 18px;

        @media (--tablet) {
          margin-bottom: 15px;
          font-size: 18px;
        }
      }
    }

    &__add-email {
      display: block;
      width: 100%;
      padding: 10px 0;
      font-size: 14px;
      color: #fff;
      border: none;
      outline: none;
      background-color: #ff5a19;
      border-radius: 3px;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        width: auto;
        padding: 10px 38px;
      }

      &:focus {
        @media (--tablet) {
          background-color: var(--button-hover);
        }
      }

      &:hover {
        @media (--tablet) {
          background-color: var(--button-hover);
        }
      }

      &:active {
        @media (--tablet) {
          background-color: #ff5a19;
        }
      }

      &:disabled {
        opacity: 0.5;
      }
    }
  }
</style>
