<template>
  <ul>
    <li v-for="item in list" class="select-option" @click="select(item)">{{ item[label] }}</li>
  </ul>
</template>

<script>
  import PerfectScrollbar from 'perfect-scrollbar';
  import "../../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css";

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
  @import "../../css/variables.css";
  @import "../../css/components/ps.css";

  .select-option {
    display: block;
    padding: 12px 25px;
    text-decoration: none;
    text-transform: none;
    vertical-align: middle;
    position: relative;
    cursor: pointer;
    white-space: nowrap;

    &:hover {
      @media (--tablet) {
        color: #ffffff;
        background-color: var(--brand-color-orange);
      }
    }

    &--disabled {
      opacity: 0.3;
    }
  }
</style>
