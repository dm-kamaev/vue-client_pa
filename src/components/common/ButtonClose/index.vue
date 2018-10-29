<template>
  <button class="icon-close" @click="onHandler" type="button">
    <svg class="icon-close__image" width="19" height="19" viewBox="0 0 19 19">
      <line class="icon-close__element" x1="1" y1="18" x2="18" y2="1"
            style="fill: none;stroke: #fd8204;stroke-miterlimit: 10;stroke-width: 2px"></line>
      <line class="icon-close__element" x1="18" y1="18" x2="1" y2="1"
            style="fill: none;stroke: #fd8204;stroke-miterlimit: 10;stroke-width: 2px"></line>
    </svg>
  </button>
</template>

<script>
  export default {
    name: 'ButtonClose',

    methods: {
      onHandler() {
        this.$emit('closeHandler')
      }
    }
  }
</script>

<style>
  @import "../../../css/variables.css";

  .icon-close {
    position: absolute;
    top: 3px;
    right: 7px;
    display: flex;
    width: 30px;
    height: 30px;
    padding: 0;
    background: transparent;
    border: 0;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

    @media (--tablet) {
      top: 5px;
      right: 5px;
      width: 40px;
      height: 40px;
    }

    &:hover > .icon-close__image > .icon-close__element {
      @media (--tablet) {
        fill: #ff9f3c;
      }
    }

    &:focus {
      outline: none;
    }

    &:focus:not(:active) {
      outline: none;
    }

    &__image {
      margin: auto;
      width: 15px;
      height: 15px;

      @media (--tablet) {
        width: 19px;
        height: 19px;
      }
    }

    &__element {
      @media (--tablet) {
        fill: var(--brand-color-orange);
      }
    }
  }

</style>
