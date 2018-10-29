<template>
  <button class="custom-button" :class="buttonClass" @click="click">
    <slot></slot>
  </button>
</template>

<script>
	export default {
		name: 'CustomButton',

    props: {
		  color: {
		    type: String,
        default: ''
      }
    },

    computed: {
      buttonClass() {
        return {
          'custom-button--grey': this.color === 'grey'
        }
      }
    },

		methods: {
		  click(e) {
		    this.$emit('click', e)
      }
    }
	}
</script>
<style>
  @import "../../../css/variables.css";

  .custom-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    font-family: var(--base-font-family);
    font-size: 14px;
    line-height: 22px;
    color: #ffffff;
    background-color: #ff5a19;
    outline: none;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

    @media (--tablet) {
      font-size: 16px;
      padding: 12px 30px;
      border-radius: 3px;
      margin: auto;
      width: auto;
    }

    &:hover {
      @media (--tablet) {
        background-color: #ff7623;
      }
    }

    &:focus {
      @media (--tablet) {
        background-color: #ff7623;
      }
    }

    &:disabled {
      background-color: #ededed;
    }

    &:disabled:hover {
      background-color: #ededed;
    }

    &:active {
      @media (--tablet) {
        background-color: #ff5a19;
      }
    }

    &--grey {
      background-color: #dadada;

      &:hover {
        @media (--tablet) {
          background-color: #e5e5e5;
        }
      }

      &:focus {
        @media (--tablet) {
          background-color: #e5e5e5;
        }
      }

      &:active {
        @media (--tablet) {
          background-color: #dadada;
        }
      }
    }
  }
</style>
