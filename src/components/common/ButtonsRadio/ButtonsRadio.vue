<template>
  <div class="buttons-radio">
    <div class="buttons-radio__inner">
      <button class="buttons-radio__item" v-for="item in list" :class="{'buttons-radio__item--active': item.value === value}" @click="change(item.value)">
        {{ item.title }}
      </button>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'ButtonsRadio',

    props: {
		  list: {
		    type: Array,
        required: true
      },

      value: {
		    type: String
      }
    },

		methods: {
      change(item) {
        this.$emit('input', item)
      }
    }
	}
</script>

<style>
  @import "../../../css/variables.css";

  .buttons-radio {
    &__inner {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: -15px;
    }

    &__item {
      display: block;
      padding: 12px 25px;
      margin-right: 12px;
      margin-bottom: 15px;
      background-color: #dadada;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 16px;
      color: #353535;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        margin-right: 15px;
        font-size: 16px;
        line-height: 22px;
      }

      &:focus {
        background-color: #ff5a19;
        outline: none;
        opacity: 1;
        color: #ffffff;
      }

      &:hover {
        @media (--tablet) {
          opacity: 1;
          background-color: #ff5a19;
          color: #ffffff;
        }
      }

      &--active {
        opacity: 1;
        background-color: #ff5a19;
        color: #ffffff;
      }

      &:disabled {
        opacity: 0.5;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
