<template>
  <div class="compare-work-header">
    <div class="compare-work-header__inner">
      <div class="compare-work-header__row">
        <div class="compare-work-header__cell">
          <custom-select class="compare-work-header__select" :options="servicesFilter" label="title" :value="firstService" @input="changeFirstService"></custom-select>
          <a :href="getHref(firstService.href)" class="compare-work-header__btn button">Заказать</a>
        </div>
        <div class="compare-work-header__cell">
          <custom-select class="compare-work-header__select" :options="servicesFilter" label="title" :value="secondService" @input="changeSecondService"></custom-select>
          <a :href="getHref(secondService.href)" class="compare-work-header__btn button">Заказать</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CompareWorkRow from './CompareWorkRow'
  import CustomSelect from "../../components/CustomSelect"

	export default {
		name: 'CompareWorkHeader',

    components: {
      CustomSelect,
      CompareWorkRow
    },

    props: {
		  services: {
		    type: Array,
        required: true
      },

      firstService: {
		    type: Object,
        required: true
      },

      secondService: {
        type: Object,
        required: true
      }
    },

		data: () => ({
      tableHeaderHidden: undefined,
    }),

		computed: {
      heightHeader() {
        return this.$refs.header.getBoundingClientRect().height;
      },

      servicesFilter() {
        const arr = []

        this.services.forEach((item) => {
          if (item.value !== 'window_cleaning') {
            arr.push(item)
          }
        })

        return arr
      }
     },

		methods: {
      changeFirstService(item) {
        this.$emit('changeFirstService', item)
      },

      changeSecondService(item) {
        this.$emit('changeSecondService', item)
      },

      getHref(item) {
        return `${window.location.origin}${item}`
      }
    }
	}
</script>
<style>
  @import "../../css/variables.css";
  @import "../../css/components/button.css";

  .compare-work-header {
    position: fixed;
    left: 0;
    z-index: 9;
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #263239;

    &__inner {
      width: 100%;
      padding: 25px 20px;

      @media (--tablet) {
        margin: auto;
        width: 650px;
        padding: 20px 0;
      }

      @media (--desktop) {
        box-sizing: border-box;
        width: 840px;
        padding-left: 20px;
        padding-right: 20px;
      }
    }

    &__select {
      margin-bottom: 25px;

      @media (--tablet) {
        margin-bottom: 15px;
      }
    }

    &__btn {
      text-align: center;
      cursor: pointer;
      user-select: none;
      text-decoration: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);
      outline: none;
      box-sizing: border-box;
      width: 135px;
      padding: 8px 37px;
      border-radius: 3px;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 19px;
      color: #ffffff;
      background-color: #ff5a19;

      @media (--tablet) {
        width: 160px;
        padding-left: 50px;
        padding-right: 50px;
      }
    }

    &__row {
      display: flex;
      justify-content: flex-end;
      width: 100%;

      @media (--tablet) {
        min-height: 75px;
        padding: 0;
      }

      @media (--desktop) {
        min-height: 52px;
      }
    }

    &__cell {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50%;

      @media (--tablet) {
        width: 28%;
      }

      @media (--desktop) {
        width: 27%;
      }
    }
  }
</style>
