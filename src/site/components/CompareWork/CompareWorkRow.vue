<template>
  <div class="compare-work-row">
    <div class="compare-work-row__cell compare-work-row__cell--wide">
      <slot name="first"></slot>
    </div>
    <div class="compare-work-row__cell">
      <slot name="second"></slot>
    </div>
    <div class="compare-work-row__cell">
      <slot name="third"></slot>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'CompareWorkRow',

		data: () => ({}),
		computed: {},
		methods: {}
	}
</script>

<style>
  @import "../../css/variables.css";

  .compare-work-row {
    display: flex;
    flex-wrap: wrap;
    padding: 25px 30px;

    @media (--tablet) {
      min-height: 75px;
      padding: 0;
    }

    @media (--desktop) {
      min-height: 52px;
    }

    &:nth-child(2n+2) {
      background-color: #f6f6f6;
    }

    &__cell {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 50%;
      text-align: center;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 22px;
      color: #353535;

      @media (--tablet) {
        width: 28%;
        font-size: 16px;
      }

      @media (--desktop) {
        width: 27%;
        font-size: 16px;
      }

      &:last-child {
        position: relative;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 22px;
          background-color: #cbc9c9;

          @media (--tablet) {
            display: none;
          }
        }
      }

      &--header {
        width: 135px;

        @media (--tablet) {
          width: 28%;
        }

        @media (--desktop) {
          width: 27%;
        }

        &:last-child {
          &::before {
            display: none;
          }
        }
      }

      &--wide {
        width: 100%;
        margin-bottom: 20px;
        font-size: 16px;
        line-height: 22px;

        @media (--tablet) {
          box-sizing: border-box;
          justify-content: flex-start;
          width: 44%;
          margin-bottom: 0;
          padding-left: 25px;
          text-align: left;
        }

        @media (--desktop) {
          width: 46%;
        }
      }

      &--hidden {
        display: none;

        @media(--tablet) {
          display: flex;
        }
      }
    }
  }

</style>
