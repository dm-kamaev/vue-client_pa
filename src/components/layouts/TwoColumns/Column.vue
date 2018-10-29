<template>
  <div v-if="show" class="column">
    <component :is="component" v-bind="props"></component>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { router } from '@/utils'

  export default {
    name: 'Column',

    mounted() {
      this.route()
    },

    props: ['routes', 'path'],

    data() {
      return {
        component: null,
        props: {},
        show: false
      }
    },

    methods: {
      route: function () {
        const { component, props } = router(this.routes, this.path)

        this.component = component
        this.show = !!component

        Vue.set(this, 'props', props)
      }
    },

    watch: {
      path(to, from) {
        this.route()
      }
    }
  }
</script>

<style>
  @import "../../../css/variables.css";

  .column {
    display: none;
    width: 100%;
    position: relative;
    flex-direction: column;
    height: 100%;
    background-color: var(--bg-white);

    @media (--tablet) {
      display: flex;
      width: 50%;
      background-color: var(--bg-light);
    }

    &:last-child {
      display: flex;
    }

    &:nth-child(2) {
      @media (--tablet) {
        background-color: var(--bg-dark);
      }
    }
  }
</style>
