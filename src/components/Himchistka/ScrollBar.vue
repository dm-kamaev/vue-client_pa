<template>
  <div class="scroll-bar">
    <p class="scroll-bar__text">2 местный</p>
    <div class="scroll-bar__inner">
      <div class="scroll-bar__progress">
        <div class="scroll-bar__scroll"></div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'ScrollBar',
		data: () => ({

		}),

		computed: {

		},

		methods: {

		}
	}
</script>

<style scoped>
  @import "../../css/variables.css";

  .scroll-bar {
    margin-bottom: 50px;

    &__text {
      margin-bottom: 30px;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      color: #353535;
    }

    &__inner {
      position: relative;
      width: 260px;
      height: 3px;
      background-color: #cbc9c9;
    }

    &__progress {
      position: absolute;
      top: 0;
      left: 0;
      width: 20%;
      height: 100%;
      background-color: #ff5a19;
    }

    &__scroll {
      position: absolute;
      top: -9px;
      right: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #ff5a19;
      box-shadow: 0 0 0 10px rgba(255,90,25,.34);
    }
  }
</style>
