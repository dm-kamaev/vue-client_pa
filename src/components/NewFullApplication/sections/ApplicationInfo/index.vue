<template>
  <div class="application-info">
    <loader v-if="loading"/>

    <template v-if="loaded">
      <p class="application-info__title">Спасибо, мы получили ваш заказ</p>
      <div class="application-info__wrap">
        <div class="application-info__section  application-info__section--with-border">
          <p class="application-info__text">Клининговая компания ООО «Домовёнок»</p>
        </div>

        <template v-if="!getContactOrder">
          <div class="application-info__section" v-if="date">
            <p class="application-info__text">Дата и время:</p>
            <p class="application-info__text">{{ dateFormat }}</p>
          </div>

          <div class="application-info__section">
            <p class="application-info__text  application-info__text--with-margin">Услуги:</p>
            <ul class="application-info__list">
              <li v-for="item in services" class="application-info__list-item">
                <p class="application-info__text">{{ item }}</p>
              </li>
            </ul>
          </div>

          <div class="application-info__section" v-if="addressTitle">
            <p class="application-info__text  application-info__text--with-margin">Адрес:</p>
            <p class="application-info__text  application-info__text--wide">{{ addressTitle }}</p>
          </div>

          <div class="application-info__section  application-info__section--with-border" v-if="price">
            <p class="application-info__text">Итого:</p>
            <p class="application-info__text">
            <template>
              {{ price }} руб
            </template>
          </p>
          </div>

          <div v-if="!pathSuccess" class="application-info__section">
            <p class="application-info__text">{{ text }}</p>
          </div>

          <div class="application-info__section">
            <p class="application-info__text">Вы можете заплатить Домовенку наличными или оплатить заказ картой в ЛК.</p>
          </div>

          <custom-button v-if="pathSuccess" class="application-info__custom-button" @click="submit">
            Перейти к заказу
          </custom-button>
        </template>

        <div v-else class="application-info__section">
          <p class="application-info__text">{{ shortText }}</p>
        </div>
      </div>
    </template>

    <p v-if="error" class="application-info__text application-info__text--red text">Произошла техническая ошибка, свяжитесь с нашими менеджерами по номеру <a href="tel:+74956680468">8(495)668-04-68</a></p>
  </div>
</template>

<script>
  import moment from 'moment'
  import { mapMutations, mapState } from 'vuex'
  import CustomButton from '@/components/common/CustomButton'
  import Loader from '@/components/common/Loader'

  export default {
    name: 'ApplicationInfo',

    components: {
      CustomButton,
      Loader
    },

    computed: {
      ...mapState({
        date: state => state.order.date,
        timeZone: state => state.order.timeZone,
        price: state => state.order.price,
        services: state => state.order.services,
        address: state => state.order.address,
        pathSuccess: state => state.order.progress.pathSuccess,
        loading: state => state.order.progress.loading,
        loaded: state => state.order.progress.loaded,
        error: state => state.order.progress.error,
        getContactOrder: state => state.order.getContactOrder
      }),

      addressTitle() {
        if (this.address.street.value) {
          let address = this.address.street.value
          address += this.address.flat ? `, кв. ${this.address.flat}` : '';
          address += this.address.porch ? `, под. ${this.address.porch}` : '';
          address += this.address.floor ? `, этаж ${this.address.floor}` : '';
          address += this.address.intercom ? `, домофон ${this.address.intercom}` : '';

          return address
        }

        return null
      },

      price() {
        let price = 0

        for (let key in this.services) {
          if (typeof this.services[key].price === 'number') {
            price+= this.services[key].price
          }
        }

        return price
      },

      priceString() {
        let price = ''

        for (let key in this.services) {
          if (typeof this.services[key].price === 'string') {
            price+= this.services[key].price
          }
        }

        return price
      },

      dateFormat() {
        return moment(this.date).format('D MMMM HH:mm')
      },

      text() {
        let text = 'В течение 15 минут мы подтвердим возможность осуществления заказа в это время.'
        let date = new Date();
        let finishDayHour = 16;
        let beginDayHour = 9;

        if (date.getHours() > finishDayHour || date.getHours() < beginDayHour) {
          text = "До 9-00 утра мы набираемся сил, чтобы быть Вам еще полезнее. Мы свяжемся с Вами после 9-00 утра. Спасибо за понимание."
        }

        return text
      },

      shortText() {
        let text = 'В течение 15 минут наши менеджеры свяжутся с вами.'
        let date = new Date();
        let finishDayHour = 16;
        let beginDayHour = 9;

        if (date.getHours() > finishDayHour || date.getHours() < beginDayHour) {
          text = "До 9-00 утра мы набираемся сил, чтобы быть Вам еще полезнее. Мы свяжемся с Вами после 9-00 утра. Спасибо за понимание."
        }

        return text
      }
    },

    methods: {

      formatPriceString(str) {
        return str[3].toUpperCase() + str.slice(4)
      },

      submit() {
        window.location = this.pathSuccess
      }
    },

    mounted() {
      if (this.pathSuccess) {
        setTimeout(() => {
          window.location = this.pathSuccess
        }, 15000)
      }
    }
  }
</script>

<style scoped>
  @import "../../../../css/variables.css";

  .application-info {
    margin: -62px 20px 20px;

    @media (--tablet) {
      margin: 0;
    }

    &__custom-button {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 10;

      @media (--tablet) {
        position: static;
      }
    }


    &__wrap {
      margin-bottom: 20px;
      padding: 20px;
      border: 1px solid #e6e6e6;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.1);

      @media (--tablet) {
        padding: 30px 30px;
      }
    }

    &__title {
      margin-bottom: 20px;
      text-align: center;
      font-size: 14px;
      line-height: 1.3em;
      color: #000000;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        margin-bottom: 30px;
        font-size: 21px;
      }

      @media (--desktop) {
        font-size: 24px;
      }
    }

    &__section {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 15px;

      &--with-border {
        padding-top: 15px;
        padding-bottom: 15px;
        border-top: 1px dashed #000000;
        border-bottom: 1px dashed #000000;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__text {
      font-size: 14px;
      line-height: 1.3em;
      color: #000000;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        font-size: 16px;
      }

      &--no-shrink {
        margin-left: 10px;
        flex-shrink: 0;
      }

      &--wide {
        width: 100%;
      }

      &--with-margin {
        margin-bottom: 12px;
      }
    }

    &__list {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;
    }

    &__list-item {
      position: relative;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__btn {
      width: 100%;
      margin: 0 auto;
      background-color: #ff5a19;

      @media (--tablet) {
        width: 260px;
      }
    }
  }
</style>
