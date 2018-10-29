<template>
  <div class="square-switch">
    <div v-for="item in list" class="square-switch__item" :class="{ 'square-switch__item--active': item === activeItem }" @click="setActive(item)">
      <button v-if="item.type === 'button'" type="button" class="square-switch__radio">{{ item.value }}</button>

      <template v-if="item.type === 'input'">
        <input type="number" class="square-switch__input  square-switch__input--round  input" :min='min' :max="max" @input="validate(item)" @change="setActive(item)" v-model="item.value">
        <span class="square-switch__unit  square-switch__unit--for-oval">м<sup><small>2</small></sup></span>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SquareSwitch',

    props: {
      active: {
        type: Number
      }
    },

    data: () => ({
      list: [
        {
          type: 'button',
          value: 40
        },
        {
          type: 'button',
          value: 50
        },
        {
          type: 'button',
          value: 60
        },
        {
          type: 'button',
          value: 70
        },
        {
          type: 'input',
          value: ''
        },
      ],

      max: 999,

      min: 0,

      activeItem: null
    }),

    methods: {
      setActive(item) {
        this.activeItem = item
        this.$emit('setValue', item.value)
      },

      validate(item) {
        if (item.value > this.max) {
          item.value = this.max
        }

        if (item.value < this.min) {
          item.value = this.min
        }
      }
    },

    mounted() {
      let exist = false
      let value = this.active

      if (!value) {
        value = 40
      }

      this.list.forEach((item) => {
        if (item.value === value && !exist) {
          exist = true
          this.activeItem = item
        } else if (item.type === 'input' && !exist) {
          exist = true
          this.activeItem = item
          item.value = value
        }
      })

      this.$emit('setValue', value)
      this.$emit('mounted')
    }
  }
</script>

<style scoped>
  @import "../../css/variables.css";

  .square-switch {
    display: flex;
    justify-content: space-between;
    border-radius: 3px;

    @media (--tablet) {
      max-width: 350px;
    }

    &__item {
      position: relative;

      &:hover {
        background-color: transparent;

        .switch__radio {
          color: var(--text-color-white);
          background-color: var(--brand-color-orange);
          border-color: var(--brand-color-orange);
        }

        .switch__input {
          color: var(--text-color-white);
          background-color: var(--brand-color-orange);
          border-color: var(--brand-color-orange);
        }

        .switch__unit {
          color: var(--text-color-white);
        }

        .switch__input + .switch__unit::after {
          background-color: #ffffff;
        }
      }

      &--active {
        background-color: transparent;

        &:first-child {
          border-color: var(--brand-color-orange);
        }

        .square-switch__radio {
          color: var(--text-color-white);
          background-color: var(--brand-color-orange);
          border-color: var(--brand-color-orange);
        }

        .square-switch__input {
          color: var(--text-color-white);
          background-color: var(--brand-color-orange);
          border-color: var(--brand-color-orange);
        }

        .square-switch__unit {
          color: var(--text-color-white);
        }

        .square-switch__input + .square-switch__unit::after {
          background-color: #ffffff;
        }
      }
    }

    &__radio {
      display: block;
      line-height: 17px;
      text-align: center;
      color: #000000;
      outline: none;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
      width: 38px;
      margin-right: 5px;
      padding-top: 10px;
      padding-bottom: 10px;
      font-weight: 200;
      font-size: 14px;
      border: 1px solid #d5cec2;
      border-radius: 50%;

      @media (--tablet) {
        line-height: 20px;
        width: 42px;
        font-size: 14px;
      }
    }

    &__unit {
      position: absolute;
      top: 50%;
      right: 12px;
      font-size: 14px;
      color: #000000;
      transform: translateY(-60%);
    }

    &__input {
      position: relative;
      width: 75px;
      padding: 10px 18px 10px 10px;
      border: 1px solid #d5cec2;
      border-radius: 50px;
      outline: none;
      text-align: center;
      font-size: 14px;
      line-height: 17px;
      font-weight: 200;

      @media (--tablet) {
        width: 100px;
        font-size: 14px;
        line-height: 20px;
      }

      &:hover {
        @media (--tablet) {
          border-color: var(--border-color-orange);
        }
      }
    }

    &__input + .switch__unit::after {
      content: "";
      position: absolute;
      right: 24px;
      bottom: -1px;
      width: 36px;
      height: 1px;
      background-color: #8e8d8d;

      &:hover {
        background-color: #ffffff;

        @media (--desktop) {
          background-color: #ffffff;
        }
      }
    }
  }
</style>
