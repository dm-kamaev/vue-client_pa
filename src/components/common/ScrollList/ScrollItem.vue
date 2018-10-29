<template>
  <a class="scroll-item">
    <slot name="left" class="scroll-item__column"></slot>
    <slot name="right" class="scroll-item__column"></slot>
  </a>
</template>

<script>
  export default {
    name: 'ScrollItem'
  }

</script>

<style scoped>
  @import "../../../css/variables.css";

  .scroll-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 30px;
    border-bottom: 1px solid var(--border-color-latte);
    user-select: none;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
    cursor: pointer;

    &:first-child {
      border-top: 1px solid var(--border-color-latte);
    }

    &:hover {
      background-color: var(--border-color-latte);
    }

    &__column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20px;

      &:last-child {
        margin-left: 0;
      }
    }
  }
</style>
