<template>
  <div class="calculator-item">
    <p v-if="showTitle" class="calculator-item__title">
      <slot name="title"/>
    </p>

    <slot />
  </div>
</template>

<script>
	export default {
		name: 'CalculatorItem',

    props: {
		  showTitle: {
		    type: Boolean,
        default: false
      }
    },

    mounted() {
      this.$emit('mounted')
    }
	}
</script>
<style>
  @import "../../../css/variables.css";

  .calculator-item {
    margin: 0 7.5% 25px 7.5%;

    @media (--tablet) {
      margin-bottom: 30px;
      margin-left: 0;
      margin-right: 0;
    }

    &__title {
      margin-bottom: 20px;
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 1.3em;
      font-weight: 400;
      color: #353535;
      user-select: none;

      @media (--tablet) {
        font-size: 18px;
      }
    }

    &__text {
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 1.3em;
      font-weight: 400;
      color: #353535;
      user-select: none;

      @media (--tablet) {
        font-size: 16px;
      }
    }

    &__buttons-radio {
      margin-bottom: 25px;
    }
  }
</style>
