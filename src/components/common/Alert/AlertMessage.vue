<template>
  <transition name="slide-fade">
    <div v-if="show" class="alert-message">
      {{ text }}
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'AlertMessage',

    props: {
      text: {
        type: String
      },

      timer: {
        type: Number
      }
    },

    data: () => ({
      show: false
    }),

    created() {

    },

    mounted() {
      this.show = true

      if (this.timer) {
        setTimeout(() => {
          this.show = false

          setTimeout(() => {
            this.$emit('close')
          }, 500)

        }, this.timer)
      }
    }
  }
</script>

<style scoped>
  @import "../../../css/variables.css";

  .alert-message {
    height: 100%;
    display: flex;
    align-items: center;
    text-align: left;
    font-size: 12px;
    color: var(--color-white);
    margin-top: 0;
    padding-left: 10px;
    padding-right: 30px;
    box-sizing: border-box;

    @media (--tablet) {
      justify-content: center;
      text-align: center;
      font-size: 14px;
      padding-left: 20px;
    }
  }

  .slide-fade-enter-active {
    transition: all 0.7s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.7s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    margin-top: -30px;
  }
</style>
