<template>
  <ul>
    <li v-for="item in list" class="select-option" @click="select(item)">{{ item[label] }}</li>
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
  @import "../../css/variables.css";

  .select-option {
    display: block;
    padding: 7px 14px;
    text-decoration: none;
    text-transform: none;
    vertical-align: middle;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: var(--base-font-family);
    font-size: 14px;
    line-height: 19px;

    @media (--tablet) {
      font-size: 16px;
      line-height: 22px;
    }

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
