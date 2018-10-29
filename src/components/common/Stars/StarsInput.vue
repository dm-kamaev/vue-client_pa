<template>
  <div class="stars">
    <template v-for="item in list">
      <input class="stars__input" :id="'star-' + `${item.status}`" type="radio" name="Quality" :value="item.status" :rating="rating" @change="change">
      <label class="stars__label" :title="item.title" :for="'star-' + item.status"></label>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'RatingStars',

    model: {
      prop: 'rating'
    },

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
    }),

    methods: {
      change(e) {
        this.$emit('input', Number(e.target.value))
      }
    }
  }
</script>

<style scoped>
  .stars {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    max-width: 400px;
    width: 280px;
    margin: auto;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

    @media (--tablet) {
      width: 300px;
    }

    &:hover .stars__label:hover,
    .stars:hover .stars__label:hover ~ .stars__label,
    .stars__input:checked ~ .stars__label {
      background-image: url('./img/star-fill.svg');
      background-repeat: no-repeat;
    }

    &:hover .stars__label:hover,
    .stars:hover .stars__label:hover ~ .stars__label,
    .stars__input:checked ~ .stars__label {
      background-image: url('./img/star-fill.svg');
      background-repeat: no-repeat;
    }

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      display: none;
      width: 35px;
      height: 35px;
      opacity: 0;
    }

    &__label {
      position: relative;
      display: flex;
      align-items: center;
      width: 35px;
      height: 35px;
      background-size: 35px 35px;
      background-image: url('./img/star-stroke.svg');
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
    }

    &__label--active {
      background-image: url('./img/star-fill.svg');
      background-repeat: no-repeat;
    }

    &__label:hover,
    .stars__label:hover ~ .stars__label {
      background-image: url('./img/star-fill.svg');
      background-repeat: no-repeat;
    }
  }

</style>
