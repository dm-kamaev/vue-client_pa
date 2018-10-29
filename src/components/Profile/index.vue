<template>
  <div class="profile">
    <div class="profile__wrap">
        <template v-if="info">
          <h2 class="profile__title">Профиль</h2>

          <div class="profile__section">
            <profile-personal-section />
          </div>

          <div class="profile__section" v-if="newPaymentMethod">
            <h3 class="profile__heading">Оплата</h3>

            <profile-payment-section />
          </div>

          <!--<div class="profile__section">-->
            <!--<profile-notification-section />-->
          <!--</div>-->

          <!--<div class="profile__section">-->
            <!--<h3 class="profile__heading">Управление графиком уборок</h3>-->

            <!--<profile-schedule-section />-->
          <!--</div>-->
        </template>

        <profile-personal-edit  v-else-if="personalEdit" @backward="backward"/>

        <profile-schedule-edit v-else-if="scheduleEdit" @backward="backward"/>

      </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
  import types from '@/store/types'
  import ProfileScheduleEdit from '@/components/Profile/ProfileScheduleEdit'
  import ProfilePersonalEdit from '@/components/Profile/ProfilePersonalEdit'
  import ProfilePaymentSection from '@/components/Profile/ProfilePaymentSection'
  import ProfilePersonalSection from '@/components/Profile/ProfilePersonalSection'
  import ProfileScheduleSection from '@/components/Profile/ProfileScheduleSection'
  import ProfileNotificationSection from '@/components/Profile/ProfileNotificationSection'

  export default {
    name: 'Profile',

    components: {
      ProfileScheduleEdit,
      ProfilePersonalEdit,
      ProfilePaymentSection,
      ProfilePersonalSection,
      ProfileScheduleSection,
      ProfileNotificationSection
    },

    data: () => ({
      info: true,
      personalEdit: false,
      scheduleEdit: false
    }),

    computed: {
      newPaymentMethod() {
        return this.$store.state.client.addCards
      },
    },

    methods: {
      ...mapMutations({
        showMenu: types.SHOW_MENU
      }),

      ...mapActions(['setPageOldView']),

      backward() {
        this.info = true
        this.personalEdit = false
        this.scheduleEdit = false
      }
    },

    created() {
      this.showMenu()
      this.setPageOldView(false)
    }
  }
</script>

<style>
  @import "../../css/variables.css";

  .profile {
    height: 100%;

    @media (--tablet) {
      height: calc(100% - 60px);
      max-width: 830px;
      padding: 30px;
      margin: auto;
    }

    @media (--desktop) {
      padding-left: 0;
      padding-right: 0;
    }

    &__wrap {
      width: auto;
      height: 100%;
      background-color: #ffffff;

      @media (--tablet) {
        height: auto;
        padding: 30px 50px;
      }
    }

    &__title {
      display: none;

      @media (--tablet) {
        display: block;
        text-align: center;
        font-size: 30px;
        line-height: 41px;
        font-weight: 400;
        color: #353535;
      }
    }

    &__section {
      padding: 20px 20px;
      border-bottom: 1px solid rgba(38, 50, 57, 0.12);

      @media (--tablet) {
        padding: 30px 20px;
      }

      &:last-child {
        padding-bottom: 0;
        border-bottom: none;
      }
    }

    &__heading {
      margin-bottom: 15px;
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 22px;
      font-weight: 400;
      color: #263239;

      @media (--tablet) {
        font-size: 18px;
        line-height: 25px;
      }
    }

    &--form {
      margin-bottom: 25px;
    }

    &__checkbox-wrapper {
      &:nth-of-type(2n+2) {
        margin-top: 10px;
      }
    }

    &__checkbox-label {
      position: relative;
      box-sizing: border-box;
      display: block;
      width: 100%;
      padding-right: 40px;
      font-size: 16px;
      line-height: 20px;
      color: #263239;

      @media (--tablet) {
        font-size: 18px;
        line-height: 25px;
      }

      &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        box-sizing: border-box;
        width: 38px;
        height: 20px;
        border-radius: 10px;
        border: 1px solid #263239;
        background-color: #263239;
        opacity: 0.12;
      }

      &::after {
        content: '';
        position: absolute;
        top: 4px;
        right: 20px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #b5b9bb;
      }
    }

    &__checkbox {
      display: none;

      &:checked ~ .profile__checkbox-label::before {
        border: 1px solid #ff5722;
        background-color: #ff5a19;
        opacity: 0.5;
      }

      &:checked ~ .profile__checkbox-label::after {
        right: 5px;
        background-color: #ff5722;
      }
    }

    &__schedule-wrapper {
      display: flex;
      justify-content: space-between;
    }

    &__schedule {
      padding: 22px 14px 25px 14px;
      border-radius: var(--border-radius);
      border: 1px solid #dadada;

      @media (--tablet) {
        box-sizing: border-box;
        width: 295px;
        padding: 25px 20px;
      }
    }

    &__schedule-title {
      display: none;

      @media (--tablet) {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 19px;
        font-weight: 400;
        color: #263239;
        opacity: 0.6;
      }
    }

    &__form-group {
      margin-bottom: 25px;

      @media (--tablet) {
        margin-bottom: 40px;
      }

      &--row {
        display: flex;
        flex-direction: row;
      }

      &--tablet-row {
        @media (--tablet) {
          display: flex;
          flex-direction: row;
        }
      }
    }

    &__upload {
      display: none;
    }

    &__upload-label {
      display: block;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: #e6e6e6 url("img/user-photo.svg") no-repeat center;
      background-size: 48px;

      @media (--tablet) {
        margin-right: auto;
        margin-left: auto;
      }
    }

    &__label {
      display: block;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 16px;
      color: #263239;
      opacity: 0.5;

      @media (--tablet) {
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 19px;
      }
    }

    &__input-wrapper {
      &--row {
        width: 45%;

        &:nth-of-type(2n+2) {
          margin-left: 10%;
        }
      }

      &--tablet-row {

        &:first-of-type {
          margin-bottom: 25px;

          @media (--tablet) {
            margin-bottom: 0;
          }
        }

        @media (--tablet) {
          width: 45%;

          &:nth-of-type(2n+2) {
            margin-left: 10%;
          }
        }
      }
    }

    &__input {
      box-sizing: border-box;
      width: 100%;
      outline: none;
      border: none;
      border-bottom: 1px solid rgba(38, 50, 57, 0.1);
      font-size: 14px;
      line-height: 23px;
      color: #263239;

      @media (--tablet) {
        font-size: 16px;
        line-height: 30px;
      }

      &::placeholder {
        color: #263239;
      }

      &:focus {
        border-bottom-color: #ff5722;
      }
    }

    &__textarea {
      outline: none;
      resize: none;
      box-sizing: border-box;
      width: 100%;
      min-height: 140px;
      padding: 15px;
      border-radius: 3px;
      border: 1px solid rgba(38, 50, 57, 0.12);
      font-size: 14px;
      line-height: 19px;
      color: #263239;
    }

    &__form-btn {
      align-self: center;
    }
  }

</style>
