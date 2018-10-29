<template>
  <div class="invitation">

    <section class="invitation__section">
      <h1 class="invitation__title">Вам подарили скидку 500 рублей на первую уборку</h1>
      <img class="invitation__image  invitation__image--promocode" height="100" width="auto" src="./img/present.svg">
      <p class="invitation__promocode">Промокод:<span class="invitation__code">{{ promoCode }}</span></p>
      <p class="invitation__text">При оформлении заказа назовите менеджеру данный промокод<br> и получите скидку на первую уборку</p>
    </section>

    <section class="invitation__section">
      <h2 class="invitation__heading">Почему стоит заказать уборку в Домовёнке?</h2>
      <div>
        <ul class="invitation__list  invitation__list--gorizontal  invitation__list--advantages">
          <li class="invitation__item invitation__item--advantages" >
            <div class="invitation__image-wrap" >
              <img class="invitation__image" height="60" width="auto" src="./img/learning.svg">
            </div>
            <p class="invitation__text">Мы сами обучаем сотрудников</p></li>
          <li class="invitation__item invitation__item--advantages" >
            <div class="invitation__image-wrap" >
              <img class="invitation__image" height="60" width="auto"  src="./img/funds.svg">
            </div>
            <p class="invitation__text">Используем профессиональные
              средства</p></li>
          <li class="invitation__item invitation__item--advantages" >
            <div class="invitation__image-wrap" >
              <img class="invitation__image" height="60" width="auto"  src="./img/disadvantages.svg">
            </div>
            <p class="invitation__text">Бесплатно исправляем недостатки</p></li>
          <li class="invitation__item invitation__item--advantages" >
            <div class="invitation__image-wrap" >
              <img class="invitation__image" height="60" width="auto"  src="./img/responsibility.svg">
            </div>
            <p class="invitation__text">Несем материальную ответсвенность</p></li>
          <li class="invitation__item invitation__item--advantages" >
            <div class="invitation__image-wrap" >
              <img class="invitation__image" height="60" width="auto"  src="./img/eight-years.svg">
            </div>
            <p class="invitation__text">Более 8 лет на рынке</p></li>
        </ul>
      </div>

    </section>

    <section class="invitation__section">
      <h2 class="invitation__heading heading">Услуги</h2>
      <ul class="invitation__list  invitation__list--service">
        <li class="invitation__item  invitation__item--service"><a class="invitation__link" href="/podderzhka">Поддерживающая уборка</a></li>
        <li class="invitation__item  invitation__item--service"><a class="invitation__link" href="/domrabotnica">Домработница</a></li>
        <li class="invitation__item  invitation__item--service"><a class="invitation__link" href="/generalnaya_uborka">Генеральная уборка</a></li>
        <li class="invitation__item  invitation__item--service"><a class="invitation__link" href="/posle_remonta">Уборка после ремонта</a></li>
        <li class="invitation__item  invitation__item--service"><a class="invitation__link" href="/uborka-kottedzhej">Уборка коттеджей</a></li>
        <li class="invitation__item  invitation__item--service"><a class="invitation__link" href="/mite_okon">Мытье окон</a></li>
        <li class="invitation__item  invitation__item--service"><a class="invitation__link" href="/himchistka">Химчистка</a></li>
        <li class="invitation__item  invitation__item--service"><a class="invitation__link" href="/vizov_mastera_na_dom">Домашний мастер</a></li>
        <li class="invitation__item  invitation__item--service"><a class="invitation__link" href="/obrabotka_poverhnostey">Обработка поверхностей</a></li>
      </ul>
      <div class="invitation__button-wrap">
        <a class="invitation__button" href="https://www.domovenok.su/price/">Цены на все услуги</a>
      </div>
      <div>
        <!--<section class="invite-friend__section  invite-friend__section&#45;&#45;center ya-share2" data-services="facebook,vkontakte,odnoklassniki" data-url="{{inviteUrl}}" data-title="Дарю скидку на первую уборку" data-description="Скидка для моих друзей. Делюсь с вами скидкой 500 рублей на первую уборку от Домовёнка." data-image="{{paPublicUrl}}/media/general/stock/discount_on_cleaning.jpg">></section>-->
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Invitation',

    data: () => ({
      promoCode: null
    })
  }
</script>

<style>
  @import "../../css/variables.css";
  @import "../../css/mixins.css";

  .invitation {
    display: block;

    @media (--tablet) {
      position: relative;
    }

    &__title {
      @apply --title;
      margin-bottom: 20px;
      padding-right: 7.8%;
      padding-left: 7.8%;
      text-align: center;

      @media (--tablet) {
        margin-bottom: 20px;
        padding-right: 0;
        padding-left: 0;
        font-size: 24px;
      }
    }

    &__promocode {
      display: block;
      width: 200px;
      margin: 0 auto 20px;
      padding: 10px 0;
      font-size: 14px;
      text-align: center;
      color: var(--text-color);
      border: 1px dashed var(--border-color-orange);
      border-radius: var(--border-radius);

      & span {
        margin-left: 5px;
        font-size: 16px;
        color: var(--text-color-orange);
      }
    }

    &__text {
      @apply --text;
      margin-bottom: 10px;
      font-size: var(--font-size-sm);
      text-align: center;

      @media (--tablet) {
        font-size: var(--font-size-sm);
      }

      &--number {
        margin-right: 5px;
        font-size: 16px;
        color: var(--text-color-orange);
      }

      &--orange {
        color: var(--text-color-orange);
      }

      &--list {
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      &--big {
        font-size: 16px;

        @media (--tablet) {
          font-size: 16px;
        }
      }

      &--center {
        text-align: center;
      }
    }

    &__input {
      margin-bottom: 15px;
    }

    &__section {
      width: auto;
      padding-top: 20px;
      padding-bottom: 10px;
      background-color: var(--bg-light);

      @media (--tablet) {
        width: 100%;
        padding-top: 40px;
        padding-bottom: 40px;
      }

      &:nth-child(even) {
        background-color: var(--bg-dark);
      }

      &--promocode {
        padding-right: 7.8%;
        padding-left: 7.8%;

        @media (--tablet) {
          padding-right: 0;
          padding-left: 0;
        }
      }

      &--advantages {
        padding-right: 7.8%;
        padding-left: 7.8%;
        background-color: var(--bg-dark);

        @media (--tablet) {
          padding-right: 0;
          padding-left: 0;
        }
      }

      &--service {
        margin-bottom: 20px;

        @media (--tablet) {
          margin-bottom: 0;
        }
      }

      &--bonus {
        clear: both;
        margin-top: 30px;
        margin-bottom: 30px;
      }

      &--horizontal {
        @media (--tablet) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
      }

      &--center {
        text-align: center;
      }

      &-wrap {
        margin-bottom: 20px;

        @media (--tablet) {
          width: 300px;
          margin-bottom: 0;
        }

        @media (--desktop) {
          width: 370px;
        }
      }
    }

    &__heading {
      margin-bottom: 20px;
      font-size: 18px;
      text-align: center;
      font-weight: normal;
      line-height: 1em;
      font-family: var(--heading-font-family);
      color: var(--text-color);
      letter-spacing: 0.4px;
    }

    &__button {
      text-decoration: none;

      @apply --button;
    }

    &__button-wrap {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;

      @media (--tablet) {
        margin-bottom: 20px;
      }
    }

    &__note {
      text-align: center;
      color: #a77d5a;
    }

    &__alert {
      box-sizing: border-box;
      width: 100%;
      margin: 20px auto -20px;
      padding: 10px 10px;
      text-align: center;
      color: var(--color-green);
      border: 1px dashed var(--color-green);
      border-radius: 3px;

      @media (--tablet) {
        box-sizing: content-box;
        width: 300px;
        padding: 10px 20px;
      }

      &--error {
        color: #b72727;
        border-color: #b72727;
      }
    }

    &__image {
      display: block;
      margin: auto;

      &--promocode {
        margin-bottom: 20px;
      }
    }

    &__image-wrap {
      margin-bottom: 15px;
    }

    &__list {
      margin: 0;
      padding: 0;

      &--gorizontal {
        display: flex;
      }

      &--advantages {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        margin: 20px auto 0;

        @media (--tablet) {
          flex-wrap: nowrap;
          width: 700px;
          margin: 30px auto 0;
        }
      }

      &--service {
        display: block;
        width: 100%;
        height: auto;
        margin: 0 auto 20px;

        @media (--tablet) {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          width: 600px;
          height: 150px;
          margin-bottom: 30px;
        }
      }
    }

    &__item {
      list-style: none;

      &--service {
        width: 80%;
        margin: 0 auto 10px;

        @media (--tablet) {
          width: 50%;
          margin: 0 0 10px;
        }
      }

      &--advantages {
        width: 50%;
        margin-bottom: 10px;

        @media (--tablet) {
          width: 25%;
          margin-bottom: 0;
        }
      }
    }

    &__link {
      display: block;
      width: 200px;
      margin: auto;
      color: var(--text-color);
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        margin-right: 7px;
        line-height: 14px;
        vertical-align: middle;
        background-color: var(--brand-color-orange);
        border-radius: 50%;
      }

      &:hover {
        @media (--tablet) {
          color: var(--text-color-orange);
        }
      }

      &:focus {
        @media (--tablet) {
          color: var(--text-color-orange);
        }
      }

      &:active {
        @media (--tablet) {
          color: var(--text-color);
        }
      }
    }
  }
</style>
