<template>
  <div class="custom-select" :class="{'custom-select--open': showList, 'custom-select--one': length <= 1}">

    <div ref="button" class="custom-select__tag" @click="openList">
      <template v-if="value">
        {{ value[label] }}
      </template>

      <template v-else>{{ options[0][label] }}</template>
    </div>

    <custom-select-scroll v-if="showList" class="custom-select__list" :list="filterOptions" @select="select" :label="label" :style="{top: `${top}px`, maxHeight: maxHeight ? maxHeight + 'px' : '172px' }"/>

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
      height: 43
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

<style>
  @import "../../../css/variables.css";

  .custom-select {
    position: relative;
    width: 100%;
    box-sizing: content-box;
    display: block;
    min-height: 40px;
    text-align: left;
    color: #353535;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

    &:focus {
      border-color: var(--brand-color-orange);
      outline: none;
    }

    &--open {
      & .custom-select__tag::after {
        top: calc(50% - 6px);
        transform: rotateZ(180deg);
      }

      & .custom-select__tag {
        border-radius: 3px 3px 0 0;
      }
    }

    &--one {
      & .custom-select__tag::after {
        display: none;
      }

      & .custom-select__list {
        display: none;
      }
    }

    &__tag {
      display: block;
      min-height: 43px;
      padding: 12px 40px 12px 25px;
      line-height: 17px;
      border: 1px solid #cbc9c9;
      border-radius: 3px;
      background-color: #fff;
      font-size: 16px;
      width: 100%;
      transition: border .1s ease;
      box-sizing: border-box;
      vertical-align: top;
      text-align: left;
      position: relative;
      overflow: hidden;
      color: #353535;
      letter-spacing: 0.4px;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      &::after {
        content: "";
        position: absolute;
        background-image: url("./img/arrow.svg");
        line-height: 16px;
        display: block;
        box-sizing: border-box;
        width: 17px;
        height: 9px;
        right: 15px;
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

      &--down {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }

      &--up {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
      }
    }

    &__list {
      max-height: 172px;
      overflow: auto;
      width: calc(100% - 2px);
      position: absolute;
      z-index: 10;
      left: 0;
      background-color: var(--bg-white);
      border: 1px solid #cbc9c9;
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;
      margin: 0;
      padding: 0;
      font-size: 16px;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);
    }
  }

  .custom-select--big .custom-select__tag {
    font-size: 14px;
    padding-top: 14px;
    padding-bottom: 13px;

    @media (--tablet) {
      font-size: 16px;
    }
  }

  .custom-select--big .custom-select__list {
    font-size: 14px;

    @media (--tablet) {
      font-size: 16px;
    }
  }

</style>
