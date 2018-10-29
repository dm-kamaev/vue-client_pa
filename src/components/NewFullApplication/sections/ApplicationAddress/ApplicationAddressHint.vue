<template>
   <div class="application-address-hint">
     <p class="application-address-hint__text">Адрес без квартиры?</p>
     <button class="application-address-hint__btn  button" type="button" @click="btnYesClickHandler">Да</button>
     <button class="application-address-hint__btn  button" type="button" @click="btnNoClickHandler">Нет</button>
   </div>
</template>

<script>
	export default {
		name: 'applicationAddressHint',

		methods: {
      btnYesClickHandler () {
        this.$emit('required', true)
      },

      btnNoClickHandler() {
        this.$emit('required', false)
      }
    }
	}
</script>

<style>
  @import "../../../../css/variables.css";
  @import "../../../../css/components/button.css";

  .application-address-hint {
    display: flex;
    flex-wrap: wrap;
    padding-left: 15px;
    padding-right: 15px;

    &__text {
      box-sizing: border-box;
      width: 100%;
      margin-bottom: 20px;
      text-align: center;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 1.3em;
      font-weight: 400;
      color: #353535;
    }

    &__btn {
      width: calc(50% - 10px);
      margin-right: 20px;
      background-color: #ff5a19;

      &--grey {
        background-color: #dadada;

        &:hover {
          background-color: #e5e5e5;
        }

        &:focus {
          background-color: #e5e5e5;
        }

        &:active {
          background-color: #dadada;
        }
      }

      &:last-of-type {
        margin-right: 0;
      }
    }
  }
</style>
