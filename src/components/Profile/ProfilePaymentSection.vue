<template>
  <div>
    <loader v-if="loading" />

    <template v-else-if="loaded">
      <button v-if="!paymentCards.length" class="profile-cards__button button" type="button" @click="addPaymentCard">Привязать карту</button>

      <template v-else>
        <div class="profile-cards">
          <div v-for="item in paymentCards" key="item.id" class="profile-cards__item">
            <p class="profile-cards__text  profile-cards__text--left">{{ item.title }}</p>
            <p class="profile-cards__text">{{ item.date | date('DD/MM') }}</p>

            <button class="profile-cards__remove-btn" type="button" @click="removeCard(item.cardId)"></button>
          </div>
        </div>

        <a class="profile-cards__add-btn" href="#" @click.prevent="addPaymentCard">Добавить карту</a>
      </template>

    </template>

    <error-fetch v-else-if="error"/>

    <modal v-if="showForm" :show="showForm" @close="closeForm">
      <profile-modal-email @result="emailResult"/>
    </modal>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
  import types from '@/store/types'

  import Loader from '@/components/common/Loader'
  import ErrorFetch from '@/components/common/Error/ErrorFetch'
  import Modal from '@/components/common/Modal'
  import ProfileModalEmail from "@/components/Profile/ProfileModalEmail";

	export default {
		name: 'ProfilePaymentSection',

    components: {
      Loader,
      ErrorFetch,
      Modal,
      ProfileModalEmail
    },


    data: () => ({
      showForm: false
    }),

		computed: {
      ...mapState({
        loaded: state => state.client.payments.cards.loaded,
        loading: state => state.client.payments.cards.loading,
        error: state => state.client.payments.cards.error
      }),

      ...mapGetters(['paymentCards'])
    },

		methods: {
      ...mapActions(['removeCard', 'getCardList', 'addCard']),

      ...mapMutations({
        showAlert: types.SHOW_ALERT
      }),

      addPaymentCard() {
        this.addCard()
      }
    },

    created() {
		  this.getCardList()
    }
	}
</script>

<style>
  @import "../../css/variables.css";

  .profile-cards {
    margin-bottom: 10px;

    &__item {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid rgba(38, 50, 57, 0.12);

      &:last-of-type {
        border-bottom: none;
      }
    }

    &__text {
      font-family: var(--base-font-family);
      font-size: var(--font-size-sm);
      line-height: 20px;
      color: #263239;

      @media (--tablet) {
        font-size: 16px;
      }

      &--left {
        margin-right: auto;
      }
    }

    &__remove-btn {
      cursor: pointer;
      outline: none;
      width: 14px;
      height: 20px;
      margin-left: 20px;
      background: url("img/basket.svg") no-repeat center center;
      background-size: 14px 20px;
    }

    &__add-btn {
      cursor: pointer;
      outline: none;
      text-align: left;
      font-size: 12px;
      line-height: 16px;
      font-weight: 400;
      text-decoration: underline;
      color: #263239;

      @media (--tablet) {
        font-size: 14px;
        line-height: 19px;
      }
    }

    &__button {
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
