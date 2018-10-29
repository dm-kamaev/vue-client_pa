<template>
  <transition name="popup-show">
    <div class="popup" :class="{'popup-animate-close' : beginClose}" @click="close">
      <transition name="popup">
        <div v-if="show" ref="container" class="popup__container" :class="{'popup__container-animate-close' : beginClose}" :style="{'top': top + 'px', 'left': left + 'px' }" @click.stop>
          <span class="popup__corner" :class="{ 'popup__corner--down' : up, 'popup__corner--left' : leftSide < 0 }"></span>
          <p class="popup__close" @click="close">Закрыть</p>
          <slot></slot>
        </div>
     </transition>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Popup',

    props: ['coordinate', 'length'],

    data: () => ({
      width: 260,
      itemHeight: 42,
      heightMenu: 60,
      isSubmit: false,
      show: false,
      beginClose: false
    }),

    computed: {
      up() {
        if (!this.mobile) {
          return (window.innerHeight - this.coordinate.bottom) < this.height
        }
      },

      leftSide() {
        if (!this.mobile) {
          return (this.coordinate.left + this.coordinate.width / 2) - this.width / 2 - 74
        }
      },

      top() {
        if (!this.mobile) {
          if (this.up) {
            return this.coordinate.top - this.height - 15
          }

          return (this.coordinate.bottom + 15)
        }

        return 'auto'
      },

      left() {
        if (!this.mobile) {
          let left = (this.coordinate.left + this.coordinate.width / 2) - this.width / 2 - 74

          if (left < 0 ) {
            left = (this.coordinate.left + this.coordinate.width / 2) - this.width / 2 + 74
          }

          return left
        }

        return 0
      },

      mobile() {
        return window.innerWidth < 768
      },

      height() {
        if (this.length) {
          return this.length * this.itemHeight + 40
        }

        return 160
      }
    },

    methods: {
      close() {
        if (this.mobile) {
          this.beginClose = true

          setTimeout(() => {
            this.$emit('close')
          }, 200)
        } else {
          this.$emit('close')
        }
      },

      submit() {
        this.isSubmit = true
        this.$emit('submit')
      }
    },

    mounted() {
      this.show = true

      window.addEventListener('scroll', function (e) {
        e.preventDefault()
      })
    }
  }
</script>

<style scoped>
  @import "../../../css/variables.css";

  .popup {
    position: fixed;
    background-color: rgba(53, 53, 53, 0.2);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    user-select: none;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

    @media (--tablet) {
      background-color: rgba(53, 53, 53, 0.1);
      animation: none;
    }

    &-animate-close {
      background-color: transparent;
      animation: appearance-background;
      animation-duration: 0.2s;
    }

    &__container {
      position: absolute;
      bottom: 0;
      left: 0;
      box-sizing: border-box;
      width: 100%;
      padding: 40px 0 20px;
      background-color: var(--color-white);
      transform: translateY(0);

      @media (--tablet) {
        width: 260px;
        bottom: auto;
        padding: 20px 0;
        border-radius: 3px;
        border: 1px solid #cbc9c9;
      }

      &-animate-close {
        transform: translateY(100%);
        animation: appearance-bottom;
        animation-duration: 0.2s;

        @media (--tablet) {
          transform: translateY(0);
          animation: none;
        }
      }
    }

    &__corner {

      @media (--tablet) {
        position: absolute;
        top: -9px;
        left: 190px;
        display: block;
        width: 16px;
        height: 16px;
        transform: rotate(45deg);
        border-left: 1px solid #cbc9c9;
        border-top: 1px solid #cbc9c9;
        background-color: var(--color-white);
        z-index: 1;
      }

      &--down {

        @media (--tablet) {
          top: auto;
          bottom: -9px;
          border-right: 1px solid #cbc9c9;
          border-bottom: 1px solid #cbc9c9;
          border-left: none;
          border-top: none;
        }
      }

      &--left {

        @media (--tablet) {
          left: 70px;
        }
      }
    }

    &__close {
      position: absolute;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 1em;
      top: 15px;
      right: 15px;
      color: #353535;

      @media (--tablet) {
        display: none;
      }
    }
  }

  @keyframes appearance-bottom {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }

  @keyframes appearance-background {
    0% {
      background-color: rgba(53, 53, 53, 0.1);
    }

    100% {
      background-color: transparent;
    }
  }

  .popup-enter-active {
    transition: all 0.2s ease;
  }

  .popup-enter {
    transform: translateY(100%);

    @media (--tablet) {
      transform: translateY(0);
    }
  }

  .popup-show-enter-active {
    transition: all 0.2s ease;
  }

  .popup-show-enter {
    background-color: transparent;
  }
</style>
