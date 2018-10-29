<template>
  <input ref="input" type="tel" name="phone" :value="value" @input="change" @focus="$emit('focus')" @blur="$emit('blur')" required>
</template>

<script>
  import Inputmask from 'inputmask'

  export default {
    name: 'InputMask',

    props: {
      value: {
        type: String,
        required: true
      }
    },

    data: () => ({
      inputMask: null,
      mask: "+7 (999) 999-99-99"
    }),

    methods: {
      initInputMask() {
        this.inputMask = new Inputmask(this.mask);
        this.inputMask.mask(this.$refs.input);
      },

      change(e) {
        this.$emit('input', e.target.value);
      }
    },

    mounted() {
      this.initInputMask();
    },

    beforeDestroy () {
      this.$refs.input.inputmask.remove();
    }

  }
</script>
