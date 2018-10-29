<template>
  <div class="application-services-item" @click="select">
    <div class="application-services-item__header">
      <h3 class="application-services-item__title">{{ service.title }}</h3>
    </div>
    <div class="application-services-item__inner">
      <ul class="application-services-item__list">
        <li v-for='item in service.works' class="application-services-item__list-item">{{ item }}</li>
      </ul>
      <p class="application-services-item__link" @click.stop="showDetails" >подробнее...</p>
      <div class="application-services-item__price">
        <p class="application-services-item__price-text">
          <span class="application-services-item__price-text  application-services-item__price-text--small  application-services-item__price-text--light">от</span>
          {{ service.price }}<span class="application-services-item__price-text  application-services-item__price-text--light">&#8381;</span>
        </p>
      </div>
    </div>
    <button class="btn" type="button">Выбрать</button>
  </div>
</template>

<script>

  export default {
    name: 'ApplicationServicesItem',

    props: {
      service: {
        type: Object
      }
    },

    methods: {
      showDetails() {
        this.$emit('showDetails')
      },

      select() {
        this.$emit('select')
      }
    }
  }
</script>

<style>
  @import "../../../../css/variables.css";

  .application-services-item {
    box-sizing: border-box;
    width: 245px;
    background-color: #ffffff;
    user-select: none;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

    &__header {
      padding-top: 20px;
      padding-bottom: 20px;
      background-color: #263239;
    }

    &__title {
      text-align: center;
      font-family: var(--base-font-family);
      font-size: 20px;
      line-height: 20px;
      font-weight: 400;
      color: #ffffff;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
    }

    &__inner {
      padding: 25px 25px 0 25px;
      border-left: 1px solid #cbc9c9;
      border-right: 1px solid #cbc9c9;
    }

    &__list {
      list-style: none;
      margin: 0 0 5px 0;
      padding: 0;
    }

    &__list-item {
      position: relative;
      margin-bottom: 20px;
      padding-left: 35px;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 19px;
      font-weight: 400;
      color: #353535;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      &:last-child {
        margin-bottom: 0;
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 20px;
        height: 19px;
        background: url("img/tick.svg") no-repeat center center;
        background-size: 18px 12px;
      }
    }

    &__link {
      display: block;
      margin-bottom: 15px;
      outline: none;
      text-align: right;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 19px;
      font-weight: 400;
      color: #9b9b9b;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

      @media (--tablet) {
        cursor: pointer;
      }

      &:hover {
        @media (--tablet) {
          opacity: 0.7;
        }
      }

      &:focus {
        @media (--tablet) {
          opacity: 0.7;
        }
      }

      &:active {
        @media (--tablet) {
          opacity: 1;
        }
      }
    }

    &__price {
      padding-top: 15px;
      padding-bottom: 15px;
      border-top: 1px solid #cbc9c9;
    }

    &__price-text {
      text-align: right;
      font-family: var(--base-font-family);
      font-size: 34px;
      line-height: 46px;
      font-weight: 600;
      color: #353535;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      &--small {
        font-size: 20px;
      }

      &--light {
        font-weight: 400;
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    font-family: var(--base-font-family);
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
    background-color: #ff5a19;
    outline: none;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

    &:hover {
      @media (--tablet) {
        background-color: #ff7623;
      }
    }

    &:focus {
      @media (--tablet) {
        background-color: #ff7623;
      }
    }

    &:disabled {
      background-color: #ededed;
    }

    &:active {
      @media (--tablet) {
        background-color: #ff5a19;
      }
    }
  }

</style>
