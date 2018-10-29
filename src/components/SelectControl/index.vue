<template>
  <label class="select-control">
    <input type="checkbox" class="select-control__input" v-model="selected" :true-value="list[0]" :false-value="list[1]">
    <span class="select-control__text">{{ title }}</span>
    <span class="select-control__indicator"></span>
    <span class="select-control__indicator--active"></span>
  </label>
</template>

<script>
  export default {
    name: 'SelectControl',

    props: {
      list: {
        type: Array,
        required: true
      },

      title: {
        type: String,
        required: true
      },

      value: {
        type: String
      }
    },

    data: () => ({
      selected: null
    }),

    watch: {
      selected() {
        this.$emit('input', this.selected)
      }
    },

    mounted() {
      this.selected = this.list[this.active]
    }
  }
</script>

<style>
  @import "../../css/variables.css";

  .select-control {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 10px;
    font-size: 14px;
    color: #692f17;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

    @media (--tablet) {
      width: 150px;
    }

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      width: 25px;
      height: 25px;
      cursor: pointer;
      opacity: 0;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      &:checked ~ .select-control__indicator--active {
        position: absolute;
        right: 4px;
        display: block;
        width: 18px;
        height: 18px;
        background: #fd8204;
        border-radius: 50%;
      }

      &:checked ~ .select-control__indicator {
        border-color: #fd8204;
      }
    }

    &__text {
      width: -webkit-calc(100% - 40px);
      width: calc(100% - 40px);
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }

    &__indicator {
      position: relative;
      display: block;
      align-self: center;
      width: 40px;
      height: 25px;
      border: 1px solid #d5cec2;
      border-radius: 50px;

      &--active {
        position: absolute;
        right: 20px;
        display: block;
        width: 18px;
        height: 18px;
        background: #eaeaea;
        border-radius: 50%;
      }
    }
  }
</style>
