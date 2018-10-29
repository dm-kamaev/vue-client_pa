<template>
  <transition name="modal">
    <div v-show="show" class="modal" @click="close">
      <div class="modal__container" ref="modal" @click.stop>
        <button-close v-if="!buttonHide" class="modal__close" @closeHandler="close" />
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  import ButtonClose from '@/components/common/ButtonClose'
  import PerfectScrollbar from 'perfect-scrollbar';

  export default {
    name: 'Modal',

    components: {
      ButtonClose
    },

    props: {
      show: {
        type: Boolean,
        required: true
      },

      buttonHide: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      close() {
        this.$emit('close')
      }
    },

    mounted() {
      new PerfectScrollbar(this.$refs.modal)
    }
  }
</script>

<style>
  @import "../../../css/variables.css";
  @import "./../../../css/components/v-bar.css";
  @import "../../../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css";

  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;
    display: flex;
    margin-top: 0;
    transition: opacity 0.3s ease;

    @media (--tablet) {
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &__container {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      box-sizing: border-box;

      @media (--tablet) {
        width: auto;
        height: auto;
        max-height: 70%;
        background-color: #ffffff;
      }
    }
  }

</style>
