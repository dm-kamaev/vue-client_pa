<template>
  <ul class="payment-details__list list" ref="list">
    <li class="payment-details__item item" v-for="item in details.details">
      <div class="payment-details__col-left">
        <p class="payment-details__date">{{ item.dateString }}</p>
        <p class="payment-details__text">{{ item.title }}</p>
        <p v-if="item.addressTitle" class="payment-details__text">{{ item.addressTitle }}</p>
      </div>

      <div class="payment-details__col-right">
        <div class="payment-details__cost">{{ item.sum | currency }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
  import PerfectScrollbar from 'perfect-scrollbar';

  export default {
    name: 'payment-details-list',
    props: ['details'],
    mounted() {
      if (!this.mobile) {
        new PerfectScrollbar(this.$refs.list);
      }
    },

    data() {
      return {};
    },

    computed: {
      mobile() {
        return window.innerWidth < 768
      }
    },

    methods: {}
  }
</script>

<style scoped>
  @import "../../../css/variables.css";
  @import "../../../css/components/list.css";
  @import "../../../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css";

  .payment-details {

    &__list {
      position: relative;
    }

    &__title {
      margin-bottom: 20px;
      margin-left: 7.8%;

      @media (--tablet) {
        margin-bottom: 30px;
      }
    }

    &__item {
      display: flex;
      justify-content: space-between;
      padding: 25px 30px;
      padding-right: 7.8%;
      padding-left: 7.8%;
      border-bottom: 1px solid #dfd1c4;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      &:first-child {
        border-top: 1px solid #dfd1c4;
      }

      &--active {
        @media (--tablet) {
          background-color: var(--bg-dark);
        }

        &:hover {
          @media (--tablet) {
            background-color: var(--bg-dark);
          }
        }
      }
    }

    &__col-right {
      display: flex;
      min-width: 70px;
    }

    &__cost {
      align-self: center;
      font-size: var(--font-size-sm);
      color: var(--text-color-orange);
    }

    &__date {
      padding-bottom: 10px;
      font-size: var(--font-size-sm);
      color: var(--text-color-orange);
    }

    &__text {
      margin-bottom: 5px;
      font-size: var(--font-size-sm);
      color: var(--text-color);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .ps-container {
    &:hover > .ps-scrollbar-y-rail:hover {
      background-color: transparent;
    }

    &:hover > .ps-scrollbar-y-rail:hover > .ps-scrollbar-y {
      background-color: rgba(194, 194, 194, 0.3);
    }

    & > .ps-scrollbar-y-rail > .ps-scrollbar-y {
      position: absolute;
      right: 0;
      width: 6px;
      background-color: rgba(194, 194, 194, 0.3);
      border-radius: 5px;
      transition: none;
    }

    &.ps-in-scrolling.ps-y > .ps-scrollbar-y-rail > .ps-scrollbar-y {
      background-color: rgba(194, 194, 194, 0.3);
    }

    &.ps-in-scrolling.ps-y:hover > .ps-scrollbar-y-rail {
      background-color: transparent;
    }

    &.ps-in-scrolling.ps-y > .ps-scrollbar-y-rail {
      background-color: transparent;
    }

    & > .ps-scrollbar-y-rail:hover > .ps-scrollbar-y, .ps-container > .ps-scrollbar-y-rail:active > .ps-scrollbar-y {
      width: 6px;
    }

    & > .ps-scrollbar-y-rail {
      width: 6px;
    }

    & > .ps-scrollbar-y-rail {
      transition: none;
    }
  }
</style>
