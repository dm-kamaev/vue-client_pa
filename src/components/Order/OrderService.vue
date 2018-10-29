<template>
  <div class="order-service order-service__item--sub">
    <div @click="show = !show" class="order-service__wrap">
      <svg class="order-service__icon-more" :class="{'order-service__icon-more--open': show, 'order-service__icon-more--active': service.objectClass }" xmlns="http://www.w3.org/2000/svg" width="15.88" height="8.24" viewBox="0 0 15.88 8.24">
        <path fill="none" stroke="#682f24" stroke-linecap="round" stroke-miterlimit="10" d="M15.38.5l-3.72 3.53-3.72 3.52-3.72-3.52L.5.5"/>
      </svg>

      <div class="order-service__item order-service__item--main">
        <p class="order-service__text text">{{ service.serviceTitle }}</p>
        <div class="order-service__cost">
          <span class="order-service__price" :class="{'order-service__without-discount': service.discount}">{{ service.amount | currency }}</span>
          <span v-if="service.discount" class="order-service__discount">{{ service.amountWithDiscount | currency }}</span>
        </div>
      </div>

    </div>
    <transition name="slide-fade">
      <ul v-if="show" class="list">
        <li v-for="(item, index) in service.objectClass" key="index"  class="order-service__item">
          <p class="order-service__text text">{{ item.objectClassTitle }}</p>
          <div class="order-service__cost">
            {{ item.amount | currency }}
          </div>
        </li>
      </ul>
    </transition>

  </div>
</template>

<script>
  export default {
    name: 'OrderService',

    props: {
      service: {
        type: Object,
        required: true
      }
    },

    data: () => ({
      show: false
    }),

    computed: {

    }
  }
</script>

<style>
  @import "../../css/variables.css";
  @import "../../css/mixins.css";
  @import "../../css/components/list.css";

  .order-service {
    position: relative;
    border-bottom: 1px solid #dfd1c4;

    &__wrap {
      position: relative;
      display: flex;
      align-items: center;
      padding: 15px 0;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        padding: 20px 0;
      }
    }

    &__item {
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
      align-items: center;
      line-height: 17px;
      margin-bottom: 10px;
      margin-left: 25px;

      &--main {
        margin-bottom: 0;
        margin-left: 0;
      }
    }

    &__cost {
      min-width: 80px;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      font-size: var(--font-size-sm);
      text-align: right;
      color: var(--text-color-orange);

      @media (--tablet) {
        margin-left: 20px;
      }

      &--discount {
        color: var(--color-green);
      }
    }

    &__without-discount {
      color: var(--text-color-orange);
      text-decoration: line-through;
    }

    &__discount {
      text-align: right;
      color: var(--color-green);
    }

    &__icon-more {
      @apply --free-text;
      opacity: 0.5;
      transform: rotate(-90deg);
      width: 15px;
      height: 15px;
      margin-right: 10px;
      transition-property: transform;
      transition-duration: 0.2s;

      @media (--tablet) {
        top: 21px;
      }

      &--active {
        opacity: 1;
      }

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
