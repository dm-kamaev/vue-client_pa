<template>
  <div v-if="loaded">
    <calculator-item class="application-dry-cleaning-calculator__item" v-if="controllers.radioButtons.active">
      <buttons-radio
        class="application-dry-cleaning-calculator__radio-wrapper"
        v-model="controllers.radioButtons.value.value"
        :list="controllers.radioButtons.list" />
    </calculator-item>

    <!--<calculator-item class="application-dry-cleaning-calculator__item" v-if="controllers.squareInputs.active">-->
      <!--<square-inputs v-model="controllers.squareInputs.value"/>-->
    <!--</calculator-item>-->

    <calculator-item class="application-dry-cleaning-calculator__item" v-if="controllers.control.active">
      <select-control
        :list="controllers.control.list"
        :title="controllers.control.title"
        v-model="controllers.control.value.value"
      />
    </calculator-item>

    <calculator-item class="application-dry-cleaning-calculator__item" v-if="controllers.switchCounter.active" :showTitle="showTitle">
      <template slot="title">{{ controllers.switchCounter.title }}</template>

      <switch-counter
        class="application-dry-cleaning-calculator__switch-counter"
        :list="controllers.switchCounter.list"
        v-model="controllers.switchCounter.value.value" />
    </calculator-item>

    <!--<div class="application-dry-cleaning-calculator__item  application-dry-cleaning-calculator__item&#45;&#45;flex" v-if="controllers.counter.active">-->
      <!--<p class="application-dry-cleaning-calculator__title">Количество</p>-->
      <!--<div class="application-dry-cleaning-calculator__counter-wrapper">-->

        <!--<counter class="application-dry-cleaning-calculator__counter" v-model="controllers.counter.value" />-->
      <!--</div>-->
      <!--<button class="button  application-dry-cleaning-calculator__button" @click="addService">Добавить</button>-->
    <!--</div>-->
  </div>
</template>

<script>
  import { addService, addClass } from '@/components/calculator/utils/createConfigService'

  import Counter from 'vue_components/src/components/Counter'
  import SwitchCounter from "vue_components/src/components/SwitchCounter";

  import CalculatorItem from "@/components/calculator/CalculatorItem"
  import SquareInputs from "../../../SquareInputs/index"
  import SelectControl from "@/components/common/SelectControl"
  import ButtonsRadio from "@/components/common/ButtonsRadio/ButtonsRadio"

	export default {
		name: 'ApplicationDryCleaningCalculator',

    components: {
      Counter,
      SwitchCounter,
      SelectControl,
      CalculatorItem,
      ButtonsRadio,
      SquareInputs
    },

    props: {
		  classId: {
		    type: String,
        required: true
      }
    },

		data: () => ({
      showTitle: true,
      controllers: {},
      addition: null,
      loaded: false
    }),

    computed: {
      config() {
        return this.$store.state.services.objectClasses
      },
    },

		methods: {
      setAddition() {
        const addition = []

        const service = addService(addition, this.config[this.classId].service)
        const { classes, controllers } = addClass(this.config[this.classId])

        this.controllers = controllers
        service.classes.push(classes);

        this.addition = { ...addition }
        this.loaded = true
      },

      addService() {
        const ob2 = JSON.stringify(this.addition)

        this.services.push({[this.activeClass]: JSON.parse(ob2)})
      }
    },

    watch: {
      classId() {
        this.loaded = false
        this.setAddition()
      }
    },

    mounted() {
		  this.setAddition()
    }
	}
</script>
<style scoped>
  @import "../../../../css/variables.css";
  @import "../../../../css/components/button.css";

  .application-dry-cleaning-calculator {
    &__item {
      margin-bottom: 30px;

      @media (--tablet) {
        margin-bottom: 40px;
      }

      &--flex {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;

        @media (--tablet) {
          flex-direction: row;
          align-items: center;
        }
      }
    }

    &__radio-wrapper {
      flex-wrap: wrap;
      margin-bottom: -15px;
    }

    &__switch-counter {
      justify-content: flex-start;
    }

    &__counter-wrapper {
      display: flex;
      margin-bottom: 30px;
      margin-left: auto;

      @media (--tablet) {
        margin-left: 0;
        margin-bottom: 0;
      }
    }

    &__title {
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 22px;
      font-weight: 400;
      color: #353535;
      user-select: none;

      @media (--tablet) {
        font-size: 18px;
        line-height: 25px;
      }
    }

    &__counter {
      @media (--tablet) {
        margin-left: 40px;
      }
    }

    &__button {
      width: 100%;
      padding-top: 12px;
      padding-bottom: 12px;
      font-size: 16px;
      line-height: 22px;
      background-color: #ff5a19;

      @media (--tablet) {
        width: auto;
        margin-left: auto;
      }
    }
  }

</style>
