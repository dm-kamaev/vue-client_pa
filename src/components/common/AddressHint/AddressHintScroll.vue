<template>
  <ul class="address-hint-scroll" :style="{ 'max-height': listHeight }">
    <li v-for="(item, index) in list"
        class="address-hint-scroll__item"
        :class="{'address-hint-scroll__item--selected': selected === index }"
        @mouseover="mouseOver(index)"
        @click="select(item)" >
      <p class="address-hint-scroll__text">{{ item.displayName }}</p>
    </li>
  </ul>
</template>

<script>
  import PerfectScrollbar from 'perfect-scrollbar'
  import { getGeoObject } from './apiYandex'

  export default {
    name: 'AddressHintScroll',

    props: {
      list: {
        type: Array
      },

      maxHeight: {
        type: Number
      },

      selected: {
        type: Number
      }
    },

    data: () => ({
      ps: null
    }),

    computed: {
      listHeight() {
        if (this.maxHeight) {
          return `${this.maxHeight}px`
        }

        return '100%'
      }
    },

    methods: {
      async select(value) {
        this.$emit('setAddress', value)
      },

      mouseOver(index) {
        this.$emit('customMouseOver', index)
      }
    },

    updated: function () {
      this.$nextTick(function () {
        this.ps.update()
      })
    },

    mounted() {
      this.ps = new PerfectScrollbar(this.$el)
    }
  }
</script>

<style>
  @import "../../../css/variables.css";
  @import "../../../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css";

  .address-hint-scroll {
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

    &__item {
      padding: 10px 15px;
      list-style: none;
      letter-spacing: .4px;
      font-size: 14px;
      line-height: 1em;
      color: #353535;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      &--selected {
        @media (--tablet) {
          background-color: #f3f3f3;
        }
      }

      &__text {
        margin-bottom: 3px;
        font-size: 14px;
        line-height: 1em;
        color: #353535;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

</style>
