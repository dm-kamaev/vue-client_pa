<template>
  <div class="form">
    <p class="form__title  title">{{ rating.title }}</p>
    <div class="form__row">
      <div class="form__image" :class="rating.img"></div>
    </div>
    <div class="form__row">
      <p class="form__text  text">{{ rating.text }}</p>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default  {
    name: 'OrderReviewClientRating',

    data: () => ({
      list: [
        {
          title: 'Поздравляем. Это Ваша первая оценка.',
          text: 'Ваши оценки напрямую влияют на оплату Домовят и помогают им становиться лучше.',
          img: 'form__image--zero',
          percent: '0'
        },
        {
          title: 'Начинающий оценщик',
          text: '80% наших клиентов ставят оценки чаще. Не стесняйтесь выражать свое мнение!',
          img: 'form__image--first',
          percent: '20'
        },
        {
          title: 'Оценщик любитель',
          text: 'Вы оцениваете заказы чаще чем 20% наших клиентов. Так держать!',
          img: 'form__image--second',
          percent: '40'
        },
        {
          title: 'Ценитель',
          text: 'Половина клиентов ставит оценки чаще. Это значит, что половина клиентов ставит реже. Спасибо!',
          img: 'form__image--third',
          percent: '60'
        },
        {
          title: 'Профессиональный оценщи',
          text: 'Лишь 20% клиентов ставят нам оценки чаще. Спасибо Вам!',
          img: 'form__image--fourth',
          percent: '80'
        },
        {
          title: 'Главный знаток',
          text: 'Вы на самом верху. Никто не оценивает нашу работу чаще, чем Вы. Мы поражены. Спасибо.',
          img: 'form__image--fifth',
          percent: '100'
        }
      ]
    }),

    computed: {
      ...mapState({
        numberOfReviews: state => state.client.numberOfReviews,
        reviewsRating: state => state.client.reviewsRating
      }),

      rating() {
        if (this.numberOfReviews !== 0) {
          return this.list[0]
        } else {
          if (this.reviewsRating < 20) {
            return this.list[1]
          } else if (this.reviewsRating < 40) {
            return this.list[2]
          } else if (this.reviewsRating < 60) {
            return this.list[3]
          } else if (this.reviewsRating < 80) {
            return this.list[4]
          } else {
            return this.list[5]
          }
        }
      }
    }
  }

</script>

<style>
  @import "../../../css/variables.css";
  @import "../../../css/components/title.css";
  @import "../../../css/components/text.css";

  .form {

    @media (--tablet) {
      width: 500px;
    }

    &__title {
      text-align: center;
      margin-bottom: 30px;
      color: #000000;
    }

    &__text {
      text-align: center;
      color: #000000;
      line-height: 1.3em;
    }

    &__image {
      width: 225px;
      height: 225px;
      margin: 0 auto 20px;

      @media (--desktop) {
        width: 250px;
        height: 250px;
        margin: 0 auto 30px;
      }

      &--zero {
        background-image: url("./img/rating-zero.svg");
        background-repeat: no-repeat;
        background-size: contain;
      }

      &--first {
        background-image: url("./img/rating-first.svg");
        background-repeat: no-repeat;
        background-size: contain;
      }

      &--second {
        background-image: url("./img/rating-second.svg");
        background-repeat: no-repeat;
        background-size: contain;
      }

      &--third {
        background-image: url("./img/rating-third.svg");
        background-repeat: no-repeat;
        background-size: contain;
      }

      &--fourth {
        background-image: url("./img/rating-fourth.svg");
        background-repeat: no-repeat;
        background-size: contain;
      }

      &--fifth {
        background-image: url("./img/rating-fifth.svg");
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
  }

</style>
