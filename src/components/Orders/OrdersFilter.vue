<template>
  <div class="orders-filter">
    <a v-for="item in list"
      @click="setActive(item.key)"
      :class="{'orders-filter__option--active': value === item.key}"
      class="orders-filter__option">{{ item.name }}
    </a>
  </div>
</template>

<script>
  export default {
    name: 'OrdersFilter',

    props: {
      list: {
        type: Array,
        require: true
      },

      value: {
        type: String,
        require: true
      }
    },

    methods: {
      setActive(status) {
        this.$emit('changeStatus', status)
      }
    }
  }
</script>

<style>
  @import "./../../css/variables.css";

  .orders-filter {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 3.1% 10px 3.1%;
    background-color: var(--bg-white);
    user-select: none;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

    @media (--tablet) {
      margin: 0;
      padding: 0;
      padding-top: 20px;
      padding-bottom: 25px;
      background-color: var(--bg-light);
    }

    @media (--desktop) {
      user-select: auto;
    }

    &__option {
      position: relative;
      z-index: 1;
      display: block;
      flex-grow: 1;
      margin-right: 8px;
      padding: 8px 7px;
      font-size: 14px;
      text-align: center;
      color: #000000;
      letter-spacing: 0.4px;
      border: 1px solid rgb(240, 234, 224);
      border-radius: 3px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        color: var(--text-color);
        font-size: var(--font-size-sm);
      }

      @media (--desktop) {
        user-select: auto;
      }

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        @media (--tablet) {
          color: var(--text-color-orange);
        }
      }

      &--active {
        color: var(--text-color-orange);
        border: 1px solid var(--text-color-orange);
      }
    }
  }
</style>
