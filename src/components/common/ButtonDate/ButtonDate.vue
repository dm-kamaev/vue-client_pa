<template>
  <div class="button-date">
    <div class="button-date__btn">{{ getDate }}</div>
    <div class="button-date__switch">
      <button class="button-date__plus" @click="next" :disabled="disabledNext" type="button">Следующая</button>
      <button class="button-date__minus" @click="prev" :disabled="disabledPrev" type="button">Предыдущая</button>
    </div>
  </div>
</template>

<script>
  import getArrayDate from '@/components/common/ButtonDate/getArrayDate'
  import moment from 'moment'
  export default {
    name: 'ButtonDate',

    props: {
      dateArray: {
        type: Array,
        required: true
      },

      dateIndex: {
        type: Number,
        required: true
      }
    },

    data: () => ({
      count: null
    }),

    computed: {
      getDate() {
        return moment(this.dateArray[this.count].value).format('D.MM')
      },

      disabledNext() {
        return this.dateArray.length - 1 <= this.count
      },

      disabledPrev() {
        return this.count === 0
      }
    },

    methods: {
      next() {
        this.count++
      },

      prev() {
        this.count--
      }
    },

    created() {
      this.count = this.dateIndex
    },

    watch: {
      count() {
        this.$emit('setActive', this.dateArray[this.count].value)
      }
    }
  }
</script>

<style>
  @import "../../../css/variables.css";
  @import "../../../css/mixins.css";

  .button-date {
    display: flex;
    background-color: var(--color-white);
    user-select: none;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

    &--round {
      border-radius: 3px;

      & .button-date__btn {
        border-radius: 3px 0 0 3px;
      }

      & .button-date__plus {
        border-radius: 0 3px 0 0;
      }

      & .button-date__minus {
        border-radius: 0 0 3px 0;
      }
    }

    &--grey {
      &__btn {
        border-color: #d5cec2;
      }

      &__plus {
        border-color: #d5cec2;

        &--disabled {
          &--hover {
            border-color: #d5cec2;
          }
        }
      }

      &__minus {
        border-color: #d5cec2;

        &--disabled {
          &--hover {
            border-color: #d5cec2;
          }
        }
      }
    }

    &--light-grey {
      & .button-date__btn {
        color: var(--text-color-white);
        border-color: #e6e6e6;
      }

      & .button-date__plus {
        border-color: #e6e6e6;

        &--disabled:hover {
          border-color: #e6e6e6;
        }
      }

      & .button-date__minus {
        border-color: #e6e6e6;

        &--disabled:hover {
          border-color: #e6e6e6;
        }
      }
    }

    &--center {
      & .button-date__btn {
        text-align: center;
      }
    }

    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: 100px;
      padding: 12px 15px 12px 15px;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
      border: 1px solid #d5cec2;
    }

    &__switch {
      width: 30px;
      border-left: none;
    }

    &__plus {
      display: block;
      height: 22px;
      width: 100%;
      margin-left: -1px;
      background-image: url("img/button-date-icon.svg");
      background-repeat: no-repeat;
      background-position: -150px center;
      border: 1px solid #d5cec2;
      cursor: pointer;

      &:hover {
        position: relative;
        z-index: 1;
        background-color: var(--brand-color-orange);
        background-position: -90px center;
        border: 1px solid var(--brand-color-orange);
      }

      &:focus {
        outline: none;
        position: relative;
        z-index: 1;
        background-color: var(--brand-color-orange);
        background-position: -90px center;
        border: 1px solid var(--brand-color-orange);
      }

      &:disabled {
        background-position: -120px center;
        cursor: auto;

        &:hover {
          background-color: transparent;
          background-position: -120px center;
          border-color: #d5cec2;
        }
      }

      @apply --free-text;
    }

    &__minus {
      display: block;
      height: 22px;
      margin-top: -1px;
      margin-left: -1px;
      width: 100%;
      background-image: url("img/button-date-icon.svg");
      background-repeat: no-repeat;
      background-position: 0 center;
      border: 1px solid #d5cec2;
      cursor: pointer;

      &:hover {
        position: relative;
        z-index: 1;
        background-color: var(--brand-color-orange);
        background-position: -60px center;
        border: 1px solid var(--border-color-orange);
      }

      &:focus {
        outline: none;
        position: relative;
        z-index: 1;
        background-color: var(--brand-color-orange);
        background-position: -60px center;
        border: 1px solid var(--border-color-orange);
      }

      &:disabled {
        background-position: -30px center;
        cursor: auto;

        &:hover {
          background-color: transparent;
          background-position: -30px center;
          border-color: #d5cec2;
        }
      }

      @apply --free-text;
    }
  }
</style>
