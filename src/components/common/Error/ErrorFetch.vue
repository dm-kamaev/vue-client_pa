<template>
  <error>Ошибка загрузки данных, попробуйте позже.</error>
</template>

<script>
  import ErrorComponent from '../Error'

  export default {
    name: 'ErrorFetch',
    components: {
      Error: ErrorComponent
    }
  }
</script>

<style scoped>

</style>
