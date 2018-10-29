<template>
  <div class="square-inputs">
    <custom-input class="square-inputs__item" type="number" v-model="width" placeholder="Ширина" />
    <custom-input class="square-inputs__item" type="number" v-model="height" placeholder="Высота" />
  </div>
</template>

<script>
	import CustomInput from "../CustomInput"

  export default {
    components: { CustomInput },
    name: 'SquareInputs',

    props: {
		  value: {
		    type: Number
      }
    },

		data: () => ({
      width: null,
      height: null
    }),

		computed: {
      square() {
        return this.width * this.height
      }
    },

    watch: {
      square() {
        this.set()
      }
    },

		methods: {
      set() {
        this.$emit('input', this.square)
      }
    }
	}
</script>

<style>
  .square-inputs {
    display: flex;

    &__item {
      width: 280px;
      margin-right: 20px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
