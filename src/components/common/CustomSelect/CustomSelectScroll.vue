<template>
  <ul>
    <li v-for="item in list" :key="item.value" class="select-option" @click="select(item)">{{ item[label] }}</li>
  </ul>
</template>

<script>
  import PerfectScrollbar from 'perfect-scrollbar';

  export default {
    name: 'CustomSelectScroll',

    props: {
      list: {
        type: Array
      },

      label: {
        type: String,
        required: false
      },
    },

    data: () => ({
      ps: null
    }),

    methods: {
      select(item) {
        this.$emit('select', item)
      }
    },

    mounted() {
      this.ps = new PerfectScrollbar(this.$el)
    }
  }
</script>

<style scoped>
  @import "../../../css/variables.css";

  .select-option {
    display: block;
    padding: 12px 25px;
    text-decoration: none;
    text-transform: none;
    vertical-align: middle;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &:hover {
      @media (--tablet) {
        background-color: #f2f2f2;
      }
    }

    &--disabled {
      opacity: 0.3;
    }
  }
</style>
