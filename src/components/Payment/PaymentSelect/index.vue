<template>
  <ul class="payment-select">
    <li v-for="item in list" class="payment-select__item" @click="select(item)">
      {{ item.title }}
    </li>
    <li class="payment-select__item" @click="add">Добавить карту</li>
  </ul>
</template>

<script>
	export default {
		name: 'PaymentSelect',

    props: {
      list: {
        type: Array,
        required: false
      }
    },

		methods: {
		  close() {
		    this.$emit('close')
      },

      select(item) {
		    this.$emit('select', item)
      },

      add() {
		    this.$emit('add')
      }
    }
	}
</script>
<style>
  @import "../../../css/variables.css";

  .payment-select {
    list-style: none;
    margin: 0;
    padding: 0;

    &__item {
      padding: 10px 20px;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 22px;
      color: #000000;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
  }
</style>
