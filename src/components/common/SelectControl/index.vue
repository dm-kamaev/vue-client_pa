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
        type: String,
        default: false
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
      this.selected = this.value
    }
  }
</script>

<style>
  @import "../../../css/variables.css";

  .select-control {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
        right: 3px;
        display: block;
        width: 18px;
        height: 18px;
        background: #ffffff;
        border-radius: 50%;
      }

      &:checked ~ .select-control__indicator {
        background: #ff5a19;
      }
    }

    &__text {
      width: calc(100% - 40px);
      font-size: 14px;
      line-height: 17px;
      color: #353535;

      @media (--tablet) {
        font-size: 16px;
      }
    }

    &__indicator {
      position: relative;
      display: block;
      align-self: center;
      width: 38px;
      height: 22px;
      border-radius: 50px;
      background-color: #cbc9c9;

      &--active {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 19px;
        display: block;
        width: 17px;
        height: 17px;
        background: #fff;
        border-radius: 50%;
      }
    }
  }
</style>
