<template>
  <div class="form">
    <h2 class="form__title  title">Спасибо! Хотите получить следующую уборку бесплатно?</h2>
    <section class="form__section">
      <img class="form__img" src="./img/invite-friend.svg" width="280" height="auto">
      <p class="form__text  text">Разместите пост в любимой соц. сети. Вы получите 500 рублей на наши услуги за каждого обратившегося человека. Каждый Ваш друг также получит скидку в 500 рублей на первую уборку.</p>
      <share-social-links class="form__social-links" :param="socialParams"/>
    </section>
  </div>
</template>

<script>
  import ShareSocialLinks from "@/components/common/ShareSocialLinks";

  export default  {
    name: 'OrderReviewInviteFriends',

    components: {
      ShareSocialLinks
    },

    data: () => ({
      socialParams: {
        content: {
          url: '',
          title: 'Дарю скидку на первую уборку',
          description: 'Скидка для моих друзей. Делюсь с вами скидкой 500 рублей на первую уборку от Домовёнка',
          image: '/media/general/stock/discount_on_cleaning.jpg'
        },
        theme: {
          services: "facebook,vkontakte,odnoklassniki"
        }
      }
    })
  }
</script>

<style scoped>
  @import "../../../css/variables.css";
  @import "../../../css/components/title.css";
  @import "../../../css/components/text.css";

  .form {

    @media (--tablet) {
      width: 500px;
      margin: auto;
    }

    &__title {
      text-align: center;
      margin-bottom: 30px;
      color: #000000;
    }

    &__img {
      margin: 0 auto 20px;
      display: block;

      @media (--tablet) {
        width: 400px;
      }
    }

    &__text {
      text-align: center;
      color: #000000;
      line-height: 1.3em;
    }

    &__social-links {
      display: flex;
      justify-content: center;
      margin-top: 20px;

      @media (--tablet) {
        margin: 20px auto 0;
      }
    }
  }
</style>
