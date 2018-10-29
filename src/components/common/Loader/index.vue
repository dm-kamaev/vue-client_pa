<template>
  <div class="loader">
    <div class="loader__item loader__item--1"></div>
    <div class="loader__item loader__item--2"></div>
    <div class="loader__item loader__item--3"></div>
    <div class="loader__item loader__item--4"></div>
    <div class="loader__item loader__item--5"></div>
    <div class="loader__item loader__item--6"></div>
    <div class="loader__item loader__item--7"></div>
    <div class="loader__item loader__item--8"></div>
  </div>
</template>

<script>
  export default {
    name: 'loader',
    mounted() {
    },

    data() {
      return {};
    },

    methods: {}
  }
</script>

<style>
  @import "../../../css/variables.css";

  .loader {
    position: relative;
    width: 54px;
    height: 54px;
    margin: auto;
    transform: scale(0.6);

    &__item {
      position: absolute;
      background-color: transparent;
      height: 10px;
      width: 10px;
      border-radius: 5px;
      animation-name: loader;
      animation-duration: 0.782s;
      animation-iteration-count: infinite;
      animation-direction: normal;

      &--1 {
        left: 0;
        top: 22px;
        animation-delay: 0.2895s;
      }

      &--2 {
        left: 6px;
        top: 6px;
        animation-delay: 0.386s;
      }

      &--3 {
        left: 22px;
        top: 0;
        animation-delay: 0.4825s;
      }

      &--4 {
        right: 6px;
        top: 6px;
        animation-delay: 0.589s;
      }

      &--5 {
        right: 0;
        top: 22px;
        animation-delay: 0.6855s;
      }

      &--6 {
        right: 6px;
        bottom: 6px;
        animation-delay: 0.782s;
      }

      &--7 {
        left: 22px;
        bottom: 0;
        animation-delay: 0.8785s;
      }

      &--8 {
        left: 6px;
        bottom: 6px;
        animation-delay: 0.975s;
      }
    }
  }

  @keyframes loader {
    0% {
      background-color: var(--brand-color-orange);
    }
    100% {
      background-color: transparent;
    }
  }

</style>
