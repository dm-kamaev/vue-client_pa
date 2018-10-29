<template>
  <div class="service-card-counter">
    <p class="service-card-counter__text">{{ config.title }}</p>
    <div class="service-card-counter__control">
      <button
        class="service-card-counter__btn service-card-counter__btn--minus"
        :disabled="value === config.min"
        @click="reduce"></button>

      <label class="service-card-counter__label">
        <input class="service-card-counter__output"
               min="0"
               :max="config.max"
               :value="value"
               @input="input"
               type="number">
      </label>

      <button
        class="service-card-counter__btn service-card-counter__btn--plus"
        :disabled="value === config.max"
        @click="add">

      </button>
    </div>
    <p class="service-card-counter__text"><span v-html="config.unit"></span></p>
  </div>
</template>

<script>
	export default {
		name: 'ServiceCardCounter',

    props: {
		  config: {
		    type: Object,
        required: true
      },

      value: {
		    type: Number,
        default: 0
      }
    },

		computed: {
      increase() {
        return this.value + 1
      },

      decrease() {
        return this.value - 1
      }
    },

		methods: {
      add() {
        this.set(this.increase)
      },

      reduce() {
        this.set(this.decrease)
      },

      input(e) {
        if (e.target.value > this.config.max) {
          e.target.value = this.config.max
        }

        if (e.target.value < this.config.min) {
          e.target.value = this.config.min
        }

        this.set(Number(e.target.value))
      },

      set(value) {
        this.$emit('input', value)
      }
    }
	}
</script>
<style>
  @import "../../../css/variables.css";

  .service-card-counter {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 3px;
    text-align: center;
    background-color: var(--color-white);
    opacity: 1;
    border-radius: 3px;

    @media (--tablet) {
      padding: 6px;
    }

    &__control {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    &__text {
      line-height: 12px;
      font-size: 12px;
      color: #888888;
      user-select: none;
    }

    &__btn {
      position: relative;
      display: block;
      width: 40px;
      height: 40px;
      outline: none;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      &:hover {
        @media (--tablet) {
          opacity: 0.7;
        }
      }

      &:focus {
        @media (--tablet) {
          opacity: 0.7;
        }
      }

      &:active {
        @media (--tablet) {
          opacity: 1;
        }
      }

      &:before {
        background-color: var(--bg-white);
      }

      &--plus {
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 2px;
          height: 18px;
          background-color: #ff5a19;
          border-radius: 3px;
        }

        &:before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 18px;
          height: 2px;
          background-color: #ff5a19;
          border-radius: 3px;
        }
      }

      &--minus {
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 18px;
          height: 2px;
          background-color: #ff5a19;
          border-radius: 3px;
        }
      }
    }

    &__output {
      display: block;
      box-sizing: border-box;
      width: 40px;
      height: 40px;
      outline: none;
      font-size: 18px;
      text-align: center;
      color: #353535;
      background-color: transparent;
      border: none;

      @media (--tablet) {
        width: 25px;
        font-size: 21px;
      }
    }

    &__label {
      position: relative;
      display: flex;
      justify-content: center;
      font-size: 16px;
    }

    &__unit {
      margin-left: 3px;
      line-height: 34px;
    }
  }
</style>
