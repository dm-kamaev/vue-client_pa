<template>
   <div class="calc-radio-btns">
     <button
       class="calc-radio-btns__item"
       type="button"
       v-for="item in sofaRadioBtns"
       :class="{'calc-radio-btns__item--active': selected === item.id }"
       @click="radioBtnClickHandler(item)">
       {{ item.text }}
     </button>
   </div>
</template>

<script>
	export default {

		name: 'CalcRadioBtns',

    props: [
      'sofaRadioBtns'
    ],

    data: () => ({
      selected: 1
		}),

    methods: {
      radioBtnClickHandler: function (target) {
        this.selected = target.id;
      }
		}
	}
</script>

<style scoped>
  @import "../../css/variables.css";

  .calc-radio-btns {
    display: flex;

    &__item {
      margin-right: 20px;
      margin-bottom: 40px;
      padding: 10px 40px;
      border-radius: 3px;
      opacity: 0.3;
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 20px;
      font-weight: 400;
      color: #353535;
      background-color: #dadada;
      outline: none;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        padding-right: 45px;
        padding-left: 45px;
      }

      &:last-child {
        margin-right: 0;
      }

      &--active {
        opacity: 1;
        color: var(--color-white);
        background-color: #ff5a19;
      }
    }
  }
</style>
