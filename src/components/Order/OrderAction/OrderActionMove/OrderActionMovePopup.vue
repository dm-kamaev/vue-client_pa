<template>
  <div class="order-action-move-popup">
    <h3 class="order-action-move-popup__title">
      <template v-if="disabled">
        Дата вашего заказа
      </template>
      <template v-else>
        Подтвердить перенос
      </template>
    </h3>
    <div class="order-action-move-popup__wrap">
      <button class="order-action-move-popup__btn  order-action-move-popup__btn--grey" type="button" @click="close">Отмена</button>
      <button v-if="!disabled" class="order-action-move-popup__btn" type="button" @click="submit">
        <template v-if="isSubmit">Отправка...</template>
        <template v-else>Перенести</template>
      </button>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'OrderActionMovePopup',

    props: {
		  disabled: {
		    type: Boolean
      }
    },

		data: () => ({
      isSubmit: false
    }),

		methods: {
      close() {
        if (!this.isSubmit) {
          this.$emit('close')
        }
      },

      submit() {
        this.isSubmit = true
        this.$emit('submit')
      }
    }
	}
</script>
<style scoped>

  @import "../../../../css/variables.css";

  .order-action-move-popup {
    padding: 20px;

    &__title {
      margin-bottom: 20px;
      text-align: center;
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 22px;
      font-weight: 400;
      color: #353535;
    }

    &__wrap {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    &__btn {
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
      width: 130px;
      margin-right: 20px;
      padding-top: 8px;
      padding-bottom: 8px;
      outline: none;
      border-radius: 3px;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 19px;
      color: var(--color-white);
      background-color: #ff5a19;

      @media (--tablet) {
        width: auto;
        padding-left: 20px;
        padding-right: 20px;
        margin-right: 15px;
      }

      &:hover {
        @media (--tablet) {
          background-color: #fd8204;
        }
      }

      &:focus {
        @media (--tablet) {
          background-color: #fd8204;
        }
      }

      &:active {
        @media (--tablet) {
          background-color: #ff5a19;
        }
      }

      &:last-child {
        margin-right: 0;

        @media (--tablet) {
          margin-right: 0;
        }
      }

      &--grey {
        background-color: #cbc9c9;

        &:hover {
          @media (--tablet) {
            background-color: #ededed;
          }
        }

        &:focus {
          @media (--tablet) {
            background-color: #ededed;
          }
        }

        &:active {
          @media (--tablet) {
            background-color: #cbc9c9;
          }
        }
      }
    }
  }
</style>
