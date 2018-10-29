<template>
  <transition name="slide-fade">
    <div v-if="show" class="alert-notification">
      <p>
        {{ text }}

        <span v-if="actions.length" class="alert-notification__button" v-for="item in filteredActions" :key="item.actionName" @click="sendAction(item)">
          {{ item.title }}
        </span>
      </p>

      <svg width="15" height="15" viewBox="0 0 19 19" class="alert-notification__close" @click="close">
        <line x1="1" y1="18" x2="18" y2="1" class="alert-notification__close-element" style="fill: none; stroke: #ffffff; stroke-miterlimit: 10; stroke-width: 2px;"></line>
        <line x1="18" y1="18" x2="1" y2="1" class="alert-notification__close-element" style="fill: none; stroke: #ffffff; stroke-miterlimit: 10; stroke-width: 2px;"></line>
      </svg>
    </div>
  </transition>
</template>

<script>
  import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
  import types from '@/store/types'

  export default {
    name: 'AlertNotification',

    props: {
      theKey: {
        type: String
      },

      text: {
        type: String
      },

      html: {
        type: String
      },

      actions: {
        type: Array
      }
    },

    data: () => ({
      show: false
    }),

    computed: {
      filteredActions() {
        return this.actions.filter((item) => {
          if (item.actionName !== 'close') {
            return true
          }
        })
      }
    },

    methods: {
      ...mapActions(['sendActionOnNotification']),

      ...mapMutations({
        closeAlert: types.CLOSE_ALERT
      }),

      sendAction(item) {
        this.sendActionOnNotification({ key: this.theKey, actionName: item.actionName })
      },

      close() {
        this.closeAlert(this.theKey)

        this.actions.forEach((item) => {
          if (item.actionName === 'close') {
            this.sendAction(item)
          }
        })
      }
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

<style>
  @import "../../../css/variables.css";

  .alert-notification {
    height: 100%;
    position: relative;
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

    &__text {
      line-height: 1.3em;
    }

    &__button {
      color: #ff5a19;
      margin-left: 10px;
      text-decoration: underline;
      cursor: pointer;
    }

    &__close {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;

      @media (--tablet) {
        width: 17px;
        height: 17px;
      }
    }
  }

  .slide-fade-enter-active {
    transition: all 0.7s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.7s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    margin-top: -50px;

    @media (--tablet) {
      margin-top: -30px;
    }
  }
</style>
