<template>
  <div class="application-container" :class="{'application-container--sidebar': showSideBar}">
    <div class="application-container__content" :class="{'application-container__content--sidebar' :showSideBar}">
      <slot name="content"></slot>
    </div>

    <div v-if="showSideBar" class="application-container__sidebar">
      <slot name="sidebar"></slot>
    </div>
    <slot name="popup"></slot>
  </div>
</template>

<script>
	export default {
		name: 'ApplicationContainer',

    props: {
		  showSideBar: {
		    type: Boolean,
        required: true
      }
    },

		data: () => ({}),
		computed: {},
		methods: {}
	}
</script>

<style>
  @import "../../../css/variables.css";

  .application-container {
    padding-top: 82px;
    padding-bottom: 30px;

    @media (--tablet) {
      box-sizing: border-box;
      max-width: 1065px;
      height: calc(100% - 60px);
      margin: auto;
      padding: 30px;
    }

    @media (--desktop) {
      padding-left: 0;
      padding-right: 0;
    }

    &--popup {
      display: none;
    }

    &--sidebar {
      padding-bottom: 145px;

      @media (--tablet) {
        height: 100%;
        display: flex;
        align-items: flex-start;
        padding-bottom: 30px;
      }

      @media (--desktop) {
        width: 1065px;
      }
    }

    &__content {
      width: 100%;
      background-color: #ffffff;

      @media (--tablet) {
        min-height: 400px;
        width: auto;
        height: auto;
        padding: 30px;
      }

      &--sidebar {

        @media (--tablet) {
          width: calc(100% - 265px);
          margin-right: 15px;
          box-sizing: border-box;
        }
      }
    }

    &__sidebar {
      position: fixed;
      bottom: 45px;
      width: 100%;
      background-color: #ffffff;
      z-index: 9;
      background-color: rgba(53, 53, 53, 0.2);

      @media (--tablet) {
        margin: 0;
        position: static;
        width: 250px;
        box-shadow: none;
      }
    }
  }
</style>
