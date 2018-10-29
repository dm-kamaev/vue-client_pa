<template>
  <div class="select" :class="{'select--open': showList, 'select--one': length <= 1}">

    <div ref="button" class="select__tag" @click="openList">
      <template v-if="value">
        {{ value[label] }}
      </template>

      <template v-else>{{ options[0][label] }}</template>
    </div>

    <custom-select-scroll v-if="showList" class="select__list" :list="filterOptions" @select="select" :label="label" :style="{top: `${top}px`, maxHeight: maxHeight ? maxHeight + 'px' : '172px' }"/>

  </div>
</template>

<script>
  import CustomSelectScroll from './CustomSelectScroll'

  export default {
    name: 'CustomSelect',

    components: {
      CustomSelectScroll
    },

    props: {
      options: {
        type: Array,
        required: true
      },

      label: {
        type: String,
        required: false
      },

      value: {
        type: Object,
      },

      trackBy: {
        type: String
      },

      maxHeight: {
        type: String
      }
    },

    data: () => ({
      selected: null,
      showList: false,
      height: 25
    }),

    computed: {
      length() {
        return this.options.length
      },

      heightList() {
        if (Number(this.maxHeight)) {
          return Number(this.maxHeight) + 2
        }

        return this.length > 4 ? this.height * 4 + 2 : this.height * this.length + 2
      },

      up() {
        if (this.$refs.button) {
          return window.innerHeight < this.$refs.button.getBoundingClientRect().bottom + this.heightList
        }

        return false
      },

      top() {
        return this.up ? `-${this.heightList - 1}` : this.height - 1
      },

      filterOptions() {
        if (this.selected) {
          const arr = [ ...this.options ]
          arr.splice(arr.indexOf(this.selected), 1)

          return arr
        }

        return this.options
      }
    },

    methods: {
      openList() {
        this.showList = !this.showList
      },

      select(item) {
        this.$emit('input', item)
        this.showList = false
      }
    }
  }
</script>

<style scoped>
  @import "../../css/variables.css";

  .select {
    position: relative;
    width: 135px;
    box-sizing: content-box;
    display: block;
    min-height: 20px;
    text-align: left;
    color: #000;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

    @media (--tablet) {
      width: 160px;
    }

    &:focus {
      border-color: var(--brand-color-orange);
      outline: none;
    }

    &--open {
      & .select__tag::after {
        top: calc(50% - 6px);
        transform: rotateZ(180deg);
      }
    }

    &--one {
      & .select__tag::after {
        display: none;
      }

      & .select__list {
        display: none;
      }
    }

    &__tag {
      background-color: transparent;
      border: none;
      font-family: var(--base-font-family);
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      vertical-align: top;
      display: block;
      width: 135px;
      min-height: 20px;
      padding-left: 14px;
      padding-right: 35px;
      padding-top: 0;
      padding-bottom: 0;
      white-space: nowrap;
      text-align: center;
      text-overflow: ellipsis;
      font-size: 14px;
      line-height: 19px;
      letter-spacing: 0.4px;
      color: #ffffff;
      transition: border .1s ease;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      @media (--tablet) {
        width: 160px;
        font-size: 16px;
        line-height: 22px;

      }

      &::after {
        content: "";
        position: absolute;
        background-image: url("./img/arrow.svg");
        line-height: 16px;
        display: block;
        box-sizing: border-box;
        width: 17px;
        height: 9px;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        padding: 4px 8px;
        margin: 0;
        background-size: 17px 9px;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
        transition: transform .2s ease;
      }

      &:focus {
        outline: none;
      }
    }

    &__list {
      overflow: auto;
      position: absolute;
      left: 0;
      z-index: 10;
      width: calc(100% - 2px);
      max-height: 172px;
      margin: 0;
      padding: 0;
      border: 1px solid #cbc9c9;
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      background-color: var(--bg-white);
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);
    }
  }
</style>
