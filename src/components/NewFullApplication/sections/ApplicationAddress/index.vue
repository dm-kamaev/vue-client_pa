<template>
  <div class="application-address">
    <application-header @backwards="orderPrevStep">
      Введите адрес
    </application-header>

    <svg class="application-address__point" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 258 258"><defs><linearGradient id="Ð‘ÐµÐ·Ñ‹Ð¼ÑÐ½Ð½Ñ‹Ð¹_Ð³Ñ€Ð°Ð´Ð¸ÐµÐ½Ñ‚_194" x1="114.37" y1="253.68" x2="269.21" y2="35.2" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#333"></stop><stop offset="0.64" stop-color="gray" stop-opacity="0"></stop></linearGradient></defs><title>Ð¾Ñ‚Ð¼ÐµÑ‚ÐºÐ°</title><g id="Ð¡Ð»Ð¾Ð¹_2" data-name="Ð¡Ð»Ð¾Ð¹ 2"><g id="Ð¡Ð»Ð¾Ð¹_1-2" data-name="Ð¡Ð»Ð¾Ð¹ 1"><rect width="258" height="258" style="fill:none"></rect><path d="M219,185.62c-21.52,23.95-128.22,68.26-128.22,68.26s24.69-87.68,46.21-111.64,34.87-46.17,72.64-28.44C234.46,125.48,240.47,161.66,219,185.62Z" style="opacity:0.71;fill:url(#Ð‘ÐµÐ·Ñ‹Ð¼ÑÐ½Ð½Ñ‹Ð¹_Ð³Ñ€Ð°Ð´Ð¸ÐµÐ½Ñ‚_194)"></path><path d="M193.2,87.44a83.67,83.67,0,1,0-85.38,83.63c-4.52,14.25-16.68,52.59-20.31,64.31-4.71,15.18-3.09,17.43-1,18.46,3.18,1.6,8.88-2.26,8.88-2.26,4.51-2.71,14-12.62,15.83-14.55C198.91,141.58,193.2,87.44,193.2,87.44Z" style="fill:#fff"></path><path d="M181.48,87.2a71.88,71.88,0,1,0-58.69,70.72L97,234.86a1.64,1.64,0,0,0,2.79,1.59c31.48-36.18,53.06-69.06,65.53-94,16.16-32.32,16.16-51.86,16.16-51.86l-.09.13C181.45,89.56,181.48,88.38,181.48,87.2Z" style="fill:#ff7708"></path><circle cx="109.53" cy="87.44" r="54.14" style="fill:#fff"></circle></g></g></svg>

    <form class="application-address__form">
      <div class="application-address__form-group">

        <div class="application-address__hint-wrapper">
          <address-hint
            :address="address.street"
            @changeActive="changeActiveHint"
            @change="changeAddress"
          />
        </div>

        <template v-if="address.street.completed || !mobile">

          <input
            v-if="address.street.completed || !mobile"
            ref="flat"
            class="application-address__input input"
            v-model="address.flat.value"
            placeholder="Квартира"
            type="number"
            name="flat"
            autocomplete="off"
            @focus="focus"
            @blur="blur"
            @change="change({flat: address.flat.value})"
            @keyup.13="pressKey"
          >

          <input
            class="application-address__input  input"
            v-model="address.floor.value"
            type="number"
            placeholder="Этаж"
            name="floor"
            autocomplete="off"
            @focus="focus"
            @blur="blur"
            @change="change({floor: address.floor.value})"
            @keyup.13="pressKey"
          >

          <input
            class="application-address__input  input"
            v-model="address.porch.value"
            type="number"
            placeholder="Подьезд"
            name="porch"
            autocomplete="off"
            @focus="focus"
            @blur="blur"
            @change="change({porch: address.porch.value})"
            @keyup.13="pressKey"
          >

          <input
            class="application-address__input  input"
            v-model="address.intercom.value"
            type="text"
            placeholder="Домофон"
            name="intercom"
            autocomplete="off"
            @focus="focus"
            @blur="blur"
            @keyup.13="pressKey"
            @keyup.9="pressKey"
            @change="change({intercom: address.intercom.value})"
          >

        </template>
      </div>
      <yandex-map class="application-address__map" :center="cityCenter" :height="mapHeight" :width="mapWidth" :geoObject="geoObject" @setPoint="setPointOnMap" />
    </form>

    <div class="application-address__btns-wrapper">
      <custom-button v-if="mobile" :color="buttonColor" @click="sendContacts">
        Быстрый заказ
      </custom-button>

      <custom-button :disabled="!address.street.completed" @click="submit">
        <template v-if="buttonOrder">Заказать</template>
        <template v-else>Далее</template>
      </custom-button>
    </div>

    <popup v-if="isPopupOpen" @close="hidePopup" :coordinate="coordinate">
      <application-address-hint @required="requiredFlat"/>
    </popup>

  </div>
</template>

<script>
  import CustomButton from '@/components/common/CustomButton'
  import AddressHint from '@/components/common/AddressHint'
  import ApplicationHeader from '../../ApplicationHeader'
  import YandexMap from '@/components/common/YandexMap'
  import { getGeoObject } from '@/components/common/AddressHint/apiYandex'
  import { mapMutations, mapState, mapActions } from 'vuex'
  import types from '@/store/types'
  import analytic from '@/store/common/analytic'
  import Popup from "../../../common/Popup/index"
  import ApplicationAddressHint from './ApplicationAddressHint';

  export default {
    name: 'ApplicationAddress',

    components: {
      ApplicationAddressHint,
      Popup,
      AddressHint,
      YandexMap,
      ApplicationHeader,
      CustomButton
    },

    data: () => ({
      addressHintActive: false,
      buttonColor: 'grey',
      address: {
        street: {
          value: '',
          valid: true,
          completed: false,
          required: true
        },
        flat: {
          value: '',
          valid: true
        },
        floor: {
          value: ''
        },
        intercom: {
          value: ''
        },
        porch: {
          value: ''
        }
      },
      cities: {
        'moscow': {
          name: 'г. Москва',
          center: [55.76, 37.64]
        },
        'nn': {
          name: 'г. Нижний Новгород',
          center: [56.32, 44.00]
        },
        'spb': {
          name: 'г. Санкт-Петербург',
          center: [59.93, 30.31]
        }
      },
      addressLoading: false,
      isPopupOpen: false,
    }),

    computed: {
      ...mapState({
        town: state => state.order.town,
        addressState: state => state.order.address,
        mobile: state => state.common.isMobile,
        buttonOrder: state => state.order.buttonOrder,
        geoObject: state => state.order.address.street.geoObject,
      }),

      cityCenter() {
        if (this.geoObject) {
          if (Object.keys(this.geoObject).length) {
            return this.geoObject.Point.pos.split(' ').reverse().map(n => +n)
          }
        }

        return this.cities[this.town].center
      },

      isInputShown() {
        if (this.mobile) {
          return false
        }

        return true
      },

      activeCity() {
        return this.cities[this.town].name;
      },

      mapHeight() {
        if (this.mobile) {
          return '100vh'
        } else {
          return '260px'
        }
      },

      mapWidth() {
        if (this.mobile) {
          return '100vw'
        } else {
          return '100%'
        }
      },

      coordinate() {
        return this.$refs.flat.getBoundingClientRect()
      }
    },

    methods: {
      ...mapMutations({
        setView: types.ORDER_SET_CURRENT_VIEW
      }),

      ...mapActions(['setAddress', 'orderNextStep', 'orderPrevStep', 'sendContacts']),

      focus() {
        if (this.mobile) {
          document.querySelector('.application-sidebar').style.display = 'none'
          document.querySelector('.application-address__btns-wrapper').style.display = 'none'
        }
      },

      blur() {
        if (this.mobile) {
          document.querySelector('.application-sidebar').style.display = 'block'
          document.querySelector('.application-address__btns-wrapper').style.display = 'flex'
        }
      },

      changeActiveHint(value) {
        this.addressHintActive = value
      },

      submit() {
        if (this.address.flat.value === '') {
          this.isPopupOpen = true
        } else {
          this.orderNextStep()
        }
      },

      setPointOnMap(geoObject) {
        if (!this.addressHintActive) {
          this.setAddress({
            street: {
              geoObject: JSON.parse(JSON.stringify(geoObject)),
              value: geoObject.name
            }
          })

          this.$set(this.address.street, 'completed', true)
          this.$set(this.address.street, 'value', geoObject.name)
        }
      },

      changeAddress(obj) {
        this.setAddress({
          street: {
            [obj.key]: obj.value
          }
        })

        this.$set(this.address.street, obj.key, obj.value)
      },

      hidePopup() {
        this.isPopupOpen = false
      },

      pressKey(e) {
        e.target.blur()
      },

      requiredFlat(value) {
        this.isPopupOpen = false

        if (!value) {
          this.$refs.flat.focus()
        } else {
          this.orderNextStep()
        }
      },

      change(obj) {
        this.setAddress(obj)
      }
    },

    created() {
      this.address.flat.value = this.addressState.flat
      this.address.floor.value = this.addressState.floor
      this.address.intercom.value = this.addressState.intercom
      this.address.porch.value = this.addressState.porch

      if (Object.keys(this.addressState.street.geoObject).length) {
        this.address.street.value = this.addressState.street.value
        this.address.street.completed = true
      }


    },

    mounted() {
      this.setView('address')
      analytic.sendEvent({name: "form", value: "order_new_address", ga_action: "open"}, ['ga', 'af', 'fb'])
    }
  }
</script>

<style scoped>
  @import "../../../../css/variables.css";
  @import "../../../../css/components/button.css";
  @import "../../../../css/components/input.css";

  .application-address {

    &__btns-wrapper {
      position: fixed;
      bottom: 0;
      z-index: 10;
      display: flex;
      width: 100%;

      @media (--tablet) {
        position: static;
      }
    }

    &__form {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      @media (--tablet) {
        margin-bottom: 30px;
      }

      @media (--desktop) {
        margin-bottom: 40px;
      }
    }

    &__form-group {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      top: -20px;
      z-index: 9;
      box-sizing: border-box;
      width: 100%;
      padding-left: 20px;
      padding-right: 20px;

      @media (--tablet) {
        position: static;
        padding-left: 0;
        padding-right: 0;
      }

      @media (--desktop) {
        justify-content: space-between;
      }
    }

    &__select {
      margin-bottom: 20px;
    }

    &__form-row {
      display: flex;
      margin-bottom: 10px;
    }

    &__hint-wrapper {
      width: 100%;
      margin-bottom: 10px;

      @media (--tablet) {
        margin-bottom: 20px;
      }
    }

    &__input {
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      display: block;
      width: calc(50% - 7.5px);
      margin-bottom: 10px;
      margin-right: 15px;
      padding: 12px 15px;
      border: 1px solid #cbc9c9;
      border-radius: 3px;
      text-align: left;
      color: #353535;
      line-height: 1.3em;
      letter-spacing: 0.4px;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-color: var(--color-white);
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        display: block;
        font-size: 16px;
        margin-bottom: 15px;
      }

      @media (--desktop) {
        width: calc(25% - 12px);
        margin-bottom: 20px;
      }

      &--invalid {
        border: 1px solid var(--color-red);
      }

      &::placeholder {
        font-size: 14px;
        color: #cbc9c9;

        @media (--tablet) {
          font-size: 16px;
        }
      }

      &:nth-of-type(even) {
        margin-right: 0;

        @media (--desktop) {
          margin-right: 15px;
        }
      }

      &:last-of-type {
        margin-right: 0;

        @media (--desktop) {
          margin-right: 0;
        }
      }

      &:hover {
        @media (--tablet) {
          border-color: #ff5a19;
        }
      }

      &:focus {
        @media (--tablet) {
          border-color: #ff5a19;
        }
      }
    }

    &__map {
      position: fixed;
      top: 50px;
      left: 0;
      z-index: 0;

      @media (--tablet) {
        position: static;
      }
    }

    &__point {
      position: absolute;
      top: calc(50% + 10px);
      left: calc(50% - 20px);
      z-index: 1;
      width: 40px;
      height: 40px;

      @media (--tablet) {
        display: none;
      }
    }
  }
</style>
