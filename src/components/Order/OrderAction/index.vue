<template>
  <div>
    <div class="order-action">
      <div class="order-action__wrap">
        <button class="order-action__btn text" @click="moveOrder">Перенести заказ</button>

        <button class="order-action__btn order-action__btn--arrow" @click="showMenu = !showMenu">
          <svg class="order-action__icon-more" :class="{'order-service__icon-more--open': showMenu }" xmlns="http://www.w3.org/2000/svg" width="15.88" height="8.24" viewBox="0 0 15.88 8.24">
            <path fill="none" stroke="#682f24" stroke-linecap="round" stroke-miterlimit="10" d="M15.38.5l-3.72 3.53-3.72 3.52-3.72-3.52L.5.5"/>
          </svg>
        </button>
      </div>

      <transition name="slide-fade">
        <ul v-if="showMenu" class="order-action__list" v-click-outside="clickOutside">
          <li class="order-action__option text" @click="cancelOrder">
            Отменить
          </li>
        </ul>
      </transition>
    </div>

    <modal v-if="show" :show="show" :buttonHide="true" @close="close">
      <order-action-cancel @close="close" :order="order" :date="orderDate" />
    </modal>

    <order-action-move v-if='showMoveOrder' @close="close" :order="order" :date="orderDate"/>
  </div>
</template>

<script>
  import moment from 'moment'
  import Modal from '@/components/common/Modal'
  import OrderActionMove from '@/components/Order/OrderAction/OrderActionMove'
  import OrderActionCancel from '@/components/Order/OrderAction/OrderActionCancel'
  import analytic from '@/store/common/analytic'
  import vClickOutside from 'v-click-outside'

  export default {
    name: 'OrderAction',

    components: {
      Modal,
      OrderActionMove,
      OrderActionCancel
    },

    props: {
      order: {
        type: Object,
        required: true
      }
    },

    directives: {
      clickOutside: vClickOutside.directive
    },

    data: () => ({
      showMenu: false,
      show: false,
      currentView: null,
      showMoveOrder: false
    }),

    computed: {
      orderDate() {
        return moment.parseZone(moment.utc(this.order.date).utcOffset(this.order.timeZone))
      }
    },

    methods: {
      moveOrder() {
        this.showMenu = false
        this.showMoveOrder = true

        analytic.sendEvent({name: "button", value: "move_order_show", ga_action: "click"}, ['ga', 'af', 'fb']);
      },

      cancelOrder() {
        this.showMenu = false
        this.show = !this.show

        analytic.sendEvent({name: "button", value: "cancelled_order_show", ga_action: "click"}, ['ga', 'af', 'fb']);
      },

      close() {
        this.showMoveOrder = false
        this.show = false
      },

      clickOutside() {
        if (this.showMenu) {
          this.showMenu = false
        }
      }
    }
  }
</script>

<style>
  @import "../../../css/variables.css";
  @import "../../../css/components/text.css";
  @import "../../../css/mixins.css";

  .order-action {
    position: relative;
    width: 205px;

    &__wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__btn {
      font-family: var(--base-font-family);
      border: 1px solid #dfd1c4;
      border-radius: 3px;
      margin: 0;
      padding: 10px 20px;
      text-align: center;
      cursor: pointer;

      &:focus {
        outline: none;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);
      }

      @media (--tablet) {
        &:hover {
          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .1);
        }
      }

      &--arrow {
        display: flex;
        padding: 0;
        width: 36px;
        height: 36px;
      }
    }

    &__list {
      background-color: #ffffff;
      border: 1px solid #dfd1c4;
      border-radius: 3px;
      position: absolute;
      top: calc(100% + 5px);
      left: 0;
      z-index: 1;
      width: 100%;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
    }

    &__option {
      padding: 10px 20px;
      list-style: none;
      text-align: left;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);


      @media (--tablet) {
        background-color: #f0eae0;
      }

      &:hover {
        @media (--tablet) {
          background-color: var(--bg-dark);
        }
      }
    }

    &__icon-more {
      transform: rotate(-90deg);
      width: 15px;
      height: 15px;
      margin: auto;
      transition-property: transform;
      transition-duration: 0.2s;

      &--open {
        transform: rotate(0deg);
      }
    }
  }

  .slide-fade-enter-active {
    transition: all .2s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }

  @keyframes arrow {
    from {
      background-position: -40px center;
    }

    to {
      background-position: -70px center;
    }
  }
</style>
