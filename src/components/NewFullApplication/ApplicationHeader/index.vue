<template>
  <div class="application-header">
    <button class="application-header__backwards" @click="backwards">
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="22" viewBox="0 0 11 22">
        <polyline points="9.28 20.25 1.72 11 9.28 1.75" fill="none" stroke="#263239" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5"/>
        <rect width="11" height="22" fill="none"/>
      </svg>
    </button>
    <p class="application-header__title">
      <slot></slot>
    </p>
  </div>
</template>

<script>

	export default {
		name: 'ApplicationHeader',

		methods: {
      backwards() {
        this.$emit('backwards')
      }
    }
	}
</script>
<style>
  @import "../../../css/variables.css";

  .application-header {
    position: fixed;
    display: flex;
    width: 100%;
    top: 0;
    box-sizing: border-box;
    z-index: 3;
    background-color: #fff;
    padding: 15px 20px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.09);

    @media (--tablet) {
      position: relative;
      padding: 0;
      margin-bottom: 30px;
      box-shadow: none;
    }

    &__title {
      width: calc(100% - 28px);
      text-align: center;
      font-family: var(--base-font-family);
      font-size: 16px;
      color: #353535;
      margin: auto;
      user-select: none;

      @media (--tablet) {
        font-size: 21px;
      }
    }

    &__backwards {
      position: absolute;
      top: 50%;
      left: 25px;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 7px;
      cursor: pointer;
      outline: none;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        left: 0;
      }
    }
  }
</style>
