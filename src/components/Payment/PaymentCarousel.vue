<template>
  <div class="payment-carousel">
    <router-link v-if="prev" :to="prev" class="payment-carousel__to-left link">Назад</router-link>
    <router-link v-if="next" :to="next" class="payment-carousel__to-right link">Вперед</router-link>

    <ul class="payment-carousel__list list">
      <li class="payment-carousel__month list__item payment-carousel__month--active">
        <p class="payment-carousel__link title" href="#">{{ month | date('MMMM YYYY') | firstLetterToUpperCase }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'PaymentCarousel',

    props: {
      prev: {
        type: String
      },

      next: {
        type: String
      },

      month: {
        type: Date
      }
    }
  }
</script>

<style scoped>
  @import "../../css/variables.css";

  .payment-carousel {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 18px;
    line-height: 20px;

    &__list {
      width: 100%;
      padding-left: 0;
      margin: 0;
    }

    &__to-left {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 20px;
      height: 20px;
      font: 0/0 a;
      color: transparent;
      background-image: url("img/check.svg");
      background-repeat: no-repeat;
      background-position: -75px center;
      transform: rotate(180deg);
    }

    &__to-right {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      width: 20px;
      height: 20px;
      font: 0/0 a;
      color: transparent;
      background-image: url("img/check.svg");
      background-repeat: no-repeat;
      background-position: -75px center;
    }

    &__month {
      display: none;
      margin: 0;
      padding: 0;
      text-align: center;
      transition: color 200ms ease-in-out;
    }

    &__month--active {
      display: block;
    }
  }
</style>
