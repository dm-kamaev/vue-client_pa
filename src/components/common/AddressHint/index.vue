<template>
  <div
    class="address-hint"
    :class="{'address-hint--invalid': !address.valid, 'address-hint--active': inputIsActive}">

    <button v-if="showButtonClose" class="address-hint__icon-close" type="button" @click="cleanField">
      <svg class="address-hint__icon-close-image" width="14" height="14" viewBox="0 0 19 19">
        <line class="address-hint__icon-close-element" x1="1" y1="18" x2="18" y2="1"
              style="fill: none;stroke: #999999;stroke-miterlimit: 10;stroke-width: 2px"></line>
        <line class="address-hint__icon-close-element" x1="18" y1="18" x2="1" y2="1"
              style="fill: none;stroke: #999999;stroke-miterlimit: 10;stroke-width: 2px"></line>
      </svg>
    </button>

    <input
      ref="input"
      class="address-hint__input input"
      type="search"
      placeholder="Начните вводить улицу.."
      name="street"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
      v-model="value"
      @focus="focus"
      @blur="blur"
      @input="change"
      @keyup.esc="cleanField"
      @keydown.up.prevent="moveUp"
      @keydown.down.prevent="moveDown"
      @keydown.enter.prevent="enter"
    >

    <div v-if="inputIsActive"  class="address-hint__list">
      <address-hint-scroll
        v-if="options.length"
        ref="list"
        :selected="pointer"
        :list="options"
        :maxHeight="maxHeight"
        data-name="street"
        @focus="focus"
        @customMouseOver="mouseOver"
        @setAddress="setAddress" />
      <div class="address-hint__list-button" @click="pointOnMap">
        Указать на карте
      </div>
    </div>
  </div>
</template>

<script>
  import AddressHintScroll from './AddressHintScroll'
  import { getGeoObject } from './apiYandex'

  export default {
    name: 'AddressHint',

    components: {
      AddressHintScroll
    },

    props: {
      address: {
        type: Object,
        required: true
      }
    },

    data: () => ({
      arr: [],
      cities: {
        'moscow': {
          name: 'Москва',
          center: [55.76, 37.64]
        },
        'nn': {
          name: 'Нижний Новгород',
          center: [56.32, 44.00]
        },
        'spb': {
          name: 'Санкт-Петербург',
          center: [59.93, 30.31]
        }
      },
      searchHouse: false,
      value: '',
      options: [],
      pointer: 0,
      optionHeight: 34,
      loading: false,
      popupClass: '',
      isPopupOpen: false,
      coordinate: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100vw',
        height: '100vh'
      },
      inputIsActive: false
    }),

    computed: {
      addressValue() {
        return this.address.value
      },

      activeCity() {
        return this.cities[this.$store.state.client.orders.new.city].name;
      },

      pointerPosition () {
        return this.pointer * this.optionHeight
      },

      visibleElements () {
        return this.maxHeight / this.optionHeight
      },

      mobile() {
        return this.$store.state.common.isMobile
      },

      maxHeight() {
        if (this.mobile) {
          return 400
        }

        return 170
      },

      showButtonClose() {
        return this.value !== ''
      }
    },

    methods: {
      blur() {
        if (this.inputIsActive) {
          this.$refs.input.focus()

          if (this.mobile) {
            window.scrollBy(0, 0)
          }
        }
      },

      focus() {
        this.inputIsActive = true
      },

      enter() {
        this.setAddress(this.options[this.pointer])
      },

      mouseOver(index) {
        if (this.pointer > index) {
          this.pointer = index

          if (this.$refs.list.$el.scrollTop >= this.pointerPosition) {
            this.$refs.list.$el.scrollTop = this.pointerPosition
          }
        } else {
          this.pointer = index

          if (this.$refs.list.$el.scrollTop <= this.pointerPosition - (this.visibleElements - 1) * this.optionHeight) {
            this.$refs.list.$el.scrollTop = this.pointerPosition - (this.visibleElements - 1) * this.optionHeight
          }
        }

      },

      moveUp() {
        if (this.pointer > 0) {
          this.pointer--

          if (this.$refs.list.$el.scrollTop >= this.pointerPosition) {
            this.$refs.list.$el.scrollTop = this.pointerPosition
          }
        }
      },

      moveDown() {
        if (this.pointer < this.options.length - 1) {
          this.pointer++

          if (this.$refs.list.$el.scrollTop <= this.pointerPosition - (this.visibleElements - 1) * this.optionHeight) {
            this.$refs.list.$el.scrollTop = this.pointerPosition - (this.visibleElements - 1) * this.optionHeight
          }
        }
      },

      async setAddress(item) {
        this.$emit('change', {key: 'value', value: item.displayName})

        ymaps.geocode(item.value).then((data) => {
          const obj = data.geoObjects.get(0)
          let error = false

          if (obj) {
            switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
              case 'exact':
                break;
              case 'number':
              case 'near':
              case 'range':
                error = true
                break;
              case 'street':
                error = true
                break;
              case 'other':
              default:
                error = true
            }
          } else {
            error = true
          }

          if (error) {
            this.$emit('change', {key: 'value', value: `${item.displayName}, ` })
            this.getIncompleteGeoObject(data.geoObjects.get(0).geometry.getCoordinates())

            const options = {
              results: 5
            }

            if (this.mobile) {
              options.results = 4
            }

            ymaps.suggest(item.value, options).then((items) => {
              this.options = items
              this.pointer = 0
            });
          } else {
            this.inputIsActive = false
            this.getGeoObject(data.geoObjects.get(0).geometry.getCoordinates())
          }
        }, function (e) {
          ymaps.suggest(item.value, options).then((items) => {
            this.options = items
            this.pointer = 0
          });
        })
      },

      async getIncompleteGeoObject(pos) {
        const data = await getGeoObject({
          results: 1,
          coordinate: `${pos[1]} ${pos[0]}`
        })

        const geoObject = data[0].GeoObject
        this.$emit('change', { key: 'geoObject', value: { ...geoObject }})
      },

      async getGeoObject(pos) {
        const data = await getGeoObject({
          results: 1,
          kind: 'house',
          coordinate: `${pos[1]} ${pos[0]}`
        })

        const geoObject = data[0].GeoObject
        this.$emit('change', { key: 'geoObject', value: { ...geoObject }})
        this.$emit('change', { key: 'completed', value: true })
        this.$emit('change', { key: 'value', value: geoObject.name })
        this.options = []
      },

      async change() {
        this.$emit('change', {key: 'value', value: this.value})

        const options = {
          results: 5
        }

        if (this.mobile) {
          options.results = 4
        }

        ymaps.suggest(`${this.value}`, options).then((items) => {
          this.options = items
          this.pointer = 0
        });
      },

      cleanField() {
        this.$emit('change', {key: 'value', value: ''})
        this.$emit('change', {key: 'geoObject', value: null})
        this.$emit('change', {key: 'completed', value: false})

        this.options = []
      },

      pointOnMap() {
        this.inputIsActive = false

        if (this.address.completed) {
          this.$emit('change', {key: 'value', value: this.address.geoObject.name})
        } else {
          this.$emit('change', {key: 'value', value: ''})
        }

        this.options = []
      },

      showPopup() {
        this.isPopupOpen = true
      },

      hidePopup() {
        this.isPopupOpen = false
      },

      popupChange(obj) {
        this.$emit('change', obj)
      }
    },

    watch: {
      addressValue() {
        if (this.value !== this.address.value) {
          this.value = this.address.value
        }
      },

      inputIsActive() {
        if (this.mobile) {
          if (this.inputIsActive) {
            document.querySelector('.application-header').style.position = 'absolute'
            document.querySelector('.application-sidebar').style.display = 'none'
            document.querySelector('.application-address__btns-wrapper').style.display = 'none'
            window.scrollBy(0, 0)
          } else {
            window.scrollBy(0, 0)
            this.$refs.input.blur()

            document.querySelector('.application-header').style.position = 'fixed'
            document.querySelector('.application-sidebar').style.display = 'block'
            document.querySelector('.application-address__btns-wrapper').style.display = 'flex'
          }
        } else {
          if (!this.inputIsActive) {
            this.$refs.input.blur()
          }
        }

        this.$emit('changeActive', this.inputIsActive)
      }
    },

    mounted() {
      this.value = this.address.value
    }
  }
</script>

<style>
  @import "../../../css/variables.css";
  @import "../../../css/components/input.css";

  .address-hint {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    border-radius: 3px;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

    &--invalid {
      border: 1px solid var(--color-red);
    }

    &--active {
      border-radius: 0;
      position: absolute;
      top: -64px;
      width: 100%;
      left: 0;
      transition-property: width, margin-left, top, left;
      transition-duration: 0.2s;

      @media (--tablet) {
        position: relative;
        top: auto;
        border-radius: 3px 3px 0 0;
      }

      & .address-hint__input {
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #cccccc;

        @media (--tablet) {
          border: 1px solid #cccccc;
        }
      }

      & .address-hint__list {
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #cccccc;

        @media (--tablet) {
          border: 1px solid #cccccc;
        }
      }
    }

    &__popup {
      position: relative;
      box-sizing: border-box;
      height: calc(100vh - 60px);
      padding: 0 25px;
      background-color: #ffffff;
    }

    &__input {
      position: relative;
      display: block;
      width: 100%;
      font-family: var(--base-font-family);
      font-size: 14px;
      padding: 12px 35px 12px 15px;
      border: 1px solid #cbc9c9;
      overflow: hidden;
      line-height: 1.3em;
      text-align: left;
      color: #353535;
      letter-spacing: .4px;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 3px;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--tablet) {
        font-size: 16px;
      }

      &::placeholder {
        font-size: 14px;
        color: #cbc9c9;

        @media (--tablet) {
          font-size: 16px;
        }
      }

      &:focus {
        outline: none;
        border-color: #cbc9c9;
      }

      &--popup {
        border-bottom: 1px solid #cbc9c9;
      }
    }

    &__list {
      position: absolute;
      top: 44px;
      box-sizing: border-box;
      left: 0;
      z-index: 100;
      width: 100%;
      border: 1px solid #cbc9c9;
      border-radius: 0 0 3px 3px;
      background-color: var(--color-white);

      @media (--tablet) {
        top: 45px;
      }
    }

    &__list-button {
      padding: 15px 15px;
      line-height: 1em;
      text-align: left;
      color: #000000;
      cursor: pointer;

      &:hover {
        @media (--tablet) {
          color: #ff5a19;
        }
      }

      &:focus {
        @media (--tablet) {
          color: #ff5a19;
        }
      }

      &:active {
        @media (--tablet) {
          color: #000000;
        }
      }
    }

    &__loading {
      position: absolute;
      top: -10px;
      right: 0px;
      z-index: 100;
      width: 50px;
    }

    &__icon-close {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      padding-left: 10px;
      padding-right: 10px;
      cursor: pointer;
      z-index: 10;

      &:focus {
        outline: none;
      }

      &:focus:not(:active) {
        outline: none;
      }

      &:hover > .address-hint__icon-close-image > .address-hint__icon-close-element {
        @media (--tablet) {
          stroke: #ff9f3c;
        }
      }
    }
  }
</style>
