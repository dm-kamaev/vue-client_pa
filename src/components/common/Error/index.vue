<template>
  <div class="error">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'Error'
  }
</script>

<style scoped>

  .error {
    font-size: 16px;
    color: red;
  }
</style>
