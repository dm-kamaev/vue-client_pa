<template>
  <div class="inputs-radio">
    <label v-for="item in list" class="inputs-radio__item">
      <input type="radio" class="inputs-radio__input" :name="name" :value="item.value" :checked="item.value === active" @change="change(item.value)">


      <template v-if="mobile">
        <span class="inputs-radio__text">{{ item.title }}</span>
        <span class="inputs-radio__indicator--active"></span>
        <span class="inputs-radio__indicator"></span>
      </template>

      <div class="inputs-radio__button" v-else>{{ item.title }}</div>
    </label>
  </div>
</template>

<script>
  export default {
    name: 'InputsRadio',

    props: {
      list: {
        type: Array,
        required: true
      },

      name: {
        type: String,
        required: true
      },

      active: {
        type: String
      }
    },

    data: () => ({}),

    computed: {
      mobile() {
        return window.innerWidth < 768
      },
    },

    methods: {
      change(value) {
        this.$emit('setValue', value)
      }
    },

    mounted() {
      this.$emit('mounted')
    }
  }
</script>

<style scoped>
  @import "../../../css/variables.css";

  .inputs-radio {

    @media (--tablet) {
      max-width: none;
      display: flex;
    }

    &__item {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 14px;
      color: #692f17;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        margin-right: 15px;
        margin-bottom: 0;
      }
    }

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      width: 25px;
      height: 25px;
      cursor: pointer;
      opacity: 0;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      &:checked ~ .inputs-radio__indicator--active {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 17px;
        height: 17px;
        background-color: #fd8204;
        border-radius: 50%;
      }

      &:checked ~ .inputs-radio__indicator {
        border-color: #fd8204;
      }

      &:checked ~ .inputs-radio__button {
        background-color: var(--brand-color-orange);
        color: #ffffff;
      }
    }

    &__button {
      border-radius: 22px;
      padding: 12px 28px;
      font-size: 14px;
      line-height: 1.2em;
      background-color: #eaeaea;
      color: #000000;
    }

    &__text {
      width: -webkit-calc(100% - 40px);
      width: calc(100% - 40px);
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }

    &__indicator {
      position: relative;
      display: block;
      align-self: center;
      width: 25px;
      height: 25px;
      border: 1px solid #d5cec2;
      border-radius: 50%;
    }
  }
</style>
