<template>
  <div class="stars">
    <div class="stars__item" v-for="item in list" :class="{'stars__item--active': item.status === rating}" :title="item.title">{{ item.title }}</div>
  </div>
</template>

<script>
  export default {
    name: 'RatingStars',

    props: {
      rating: {
        type: Number,
        required: true
      }
    },

    data: () => ({
      list: [
        {
          title: 'gorgeous',
          status: 5
        },
        {
          title: 'good',
          status: 4
        },
        {
          title: 'regular',
          status: 3
        },
        {
          title: 'poor',
          status: 2
        },
        {
          title: 'bad',
          status: 1
        }
      ]
    })
  }
</script>

<style>
  .stars {
    display: flex;
    flex-direction: row-reverse;
    width: 170px;
    margin-left: -5px;

    &__item {
      position: relative;
      display: flex;
      align-items: center;
      width: 34px;
      height: 21px;
      background-image: url("./img/star-stroke.svg");
      background-repeat: no-repeat;
      background-position: center;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
      font: 0/0 a;
      color: transparent;

      &--active ~ .stars__item {
        background-image: url("./img/star-fill.svg");
        background-repeat: no-repeat;
      }

      &--active {
        background-image: url("./img/star-fill.svg");
        background-repeat: no-repeat;
      }
    }
  }
</style>
