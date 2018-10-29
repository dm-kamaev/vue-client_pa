<template>
   <div class="calc-counter">
     <div class="calc-counter__img-wrapper"
             v-bind:class="{'calc-counter__img-wrapper--active': number !== 0}">
       <img class="calc-counter__img"
            :src="img"
            alt=""
            width="100">
     </div>
     <p class="calc-counter__title">{{title}}</p>
     <counter :value="number"
              :max="maxNumber"
              :min="minNumber"
              @set="set">
     </counter>
   </div>
</template>
<script>
	import Counter from "vue_components/src/components/Counter";

  export default {

    name: 'CalcCounter',

    components: {
      Counter
    },

    props: [
      'img',
      'id',
      'title',
      'number',
      'maxNumber',
      'minNumber'
    ],

		methods: {
      set(value) {
        this.$emit('set', this.id, value);
      },
		}
	}
</script>
<style scoped>
  @import "../../css/variables.css";

  .calc-counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 110px;
    margin-top: 35px;
    margin-right: 25px;

    @media (--tablet) {
      margin-right: 35px;
    }

    @media (--desktop) {
      margin-right: 35px;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &__img-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 110px;
      height: 110px;
      margin-bottom: 30px;
      border: 1px solid #cdcdcd;
      border-radius: 7px;
      text-align: center;

      &--active {
        border-color: #ff5a19;
      }
    }

    &__title {
      min-height: 40px;
      margin-bottom: 30px;
      text-align: center;
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 20px;
      font-weight: 400;
      color: #353535;
    }
  }
</style>
