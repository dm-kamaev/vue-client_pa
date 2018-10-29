<template>
  <div class="application__card service-calc__item service-card">
    <div  class="service-card__wrap" @click="setActive">
      <img class="service-card__image" :src="image" width="50" height="50" :alt="service.altText">
      <p class="service-card__text text-ab  text-ab--small">{{ service.title }}</p>
    </div>
    <div v-if="activeCard" class="service-counter" data-value="1">
      <p class="service-counter__text">{{ service.title }}</p>
      <div class="service-counter__control">
        <button class="service-counter__btn  service-counter__btn--minus" @click="reduceCount"></button>
        <label class="service-counter__label">
          <input class="service-counter__output" min="0" :max="service.max" v-model='counter' name="counter" type="number">
        </label>
        <button class="service-counter__btn  service-counter__btn--plus" @click="addCount"></button>
      </div>
      <p class="service-counter__text"><span v-html="service.unit"></span></p>
    </div>
  </div>
</template>

<script>
  import objectClasses from '@/store/common/services/objectClasses'
  import serviceArmchair from './img/service-armchair.svg'
  import serviceRefrigerator from './img/service-refrigerator.svg'
  import serviceKitchenShelves from './img/service-kitchen-shelves.svg'
  import serviceWashingMachine from './img/service-washing-machine.svg'
  import serviceHourWork from './img/service-hour-work.svg'
  import serviceCleaningOven from './img/service-cleaning-oven.svg'
  import serviceIroning from './img/service-ironing.svg'
  import serviceExtract from './img/service-extract.svg'
  import serviceMicrowave from './img/service-microwave.svg'
  import serviceBed from './img/service-bed.svg'
  import serviceBath from './img/service-bath.svg'
  import serviceWindowOneFrame from './img/service-window-one-frame.svg'
  import serviceWindowTwoFrame from './img/service-window-two-frame.svg'
  import serviceWindowTwoFrameWith from './img/service-window-two-frame-with.svg'
  import serviceWindowThreeFrame from './img/service-window-three-frame.svg'
  import serviceBalcony from './img/service-balcony.svg'
  import serviceDoor from './img/service-door.svg'
  import serviceWindowGrid from './img/service-window-grid.svg'
  import serviceWindowGrille from './img/service-window-grille.svg'
  import serviceWindowBlinds from './img/service-window-blinds.svg'
  import serviceWindowSiding from './img/service-window-siding.svg'

 export default {
   name: 'ServiceCard',

   props: {
     service: {
        type: Object,
        required: true
     },

     active: {
       type: Number
     }
   },

   data: () => ({
     counter: 0,
     images: {
       serviceRefrigerator: serviceRefrigerator,
       serviceKitchenShelves: serviceKitchenShelves,
       serviceWashingMachine: serviceWashingMachine,
       serviceHourWork: serviceHourWork,
       serviceCleaningOven: serviceCleaningOven,
       serviceIroning: serviceIroning,
       serviceExtract: serviceExtract,
       serviceMicrowave: serviceMicrowave,
       serviceBed: serviceBed,
       serviceBath: serviceBath,
       serviceWindowOneFrame: serviceWindowOneFrame,
       serviceWindowTwoFrame: serviceWindowTwoFrame,
       serviceWindowTwoFrameWith: serviceWindowTwoFrameWith,
       serviceWindowThreeFrame: serviceWindowThreeFrame,
       serviceDoor: serviceDoor,
       serviceBalcony: serviceBalcony,
       serviceWindowGrid: serviceWindowGrid,
       serviceWindowGrille: serviceWindowGrille,
       serviceWindowBlinds: serviceWindowBlinds,
       serviceWindowSiding: serviceWindowSiding
     }
   }),

   computed: {
     image() {
       return this.images[this.service.img]
     },

     activeCard() {
       return this.counter > 0
     },

     detail() {
       const param = {
         "service": this.service.service,
         "class": this.service.class,
         "classId": this.service.classId,
         "sum": 0
       }

       if (this.service.changingParam.type === 'sum') {
         param.sum = this.counter
       } else {
         param.sum = Number(this.counter) !== 0  ? 1 : 0
         param.feature = this.service.changingParam.features[0].feature
         param.quantity = this.counter
       }

       if (this.service.defaultFeatures) {
         param.features = this.service.defaultFeatures
       }

       return param
     }
   },

   methods: {
     addCount() {
       if (this.counter < this.service.max) {
         this.counter++
       }
     },

     reduceCount() {
       if (this.counter > 0) {
         this.counter--
       }
     },

     setActive() {
       if (this.counter === 0) {
         this.counter = 1
       }
     }
    },

   mounted() {
     this.counter = this.active
   },

   watch: {
     counter() {
       this.$emit('change', { name: this.service.classId, count: this.counter })
     }
   }
 }
</script>

<style scoped>
  @import "../../../css/variables.css";

  .service-card {
    position: relative;
    width: 216px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    margin-right: 20px;
    background-color: #fff;
    border: 1px solid #cbc9c9;
    border-radius: 3px;
    user-select: none;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

    &:hover {
      @media (--tablet) {
        border-color: #ff5a19;
      }
    }

    &__image {
      width: 48px;
      height: 48px;
      margin-right: 10px;
    }

    &__wrap {
      display: flex;
      flex-grow: 1;
      align-items: center;
      padding: 10px;

      @media (--tablet) {
        padding: 15px;
      }

      @media (--desktop) {
        padding-right: 25px;
        padding-left: 25px;
      }
    }

    &__text {
      font-size: 14px;
      text-align: left;
      line-height: 1.3em;
      color: #353535;

      @media (--tablet) {
        font-size: 16px;
      }
    }

    &__btn-wrap {
      padding: 15px;
      text-align: center;
      color: #ff5a19;
      word-spacing: 0.4px;

      &--active {
        & .service-card__input {
          display: inline;
          color: var(--text-color-white);
          background-color: transparent;
          border: none;
        }
      }
    }

    &__input {
      display: none;
    }
  }

  .service-counter {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 3px;
    text-align: center;
    background-color: var(--color-white);
    opacity: 1;

    @media (--tablet) {
      padding: 6px;
    }

    &__control {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    &__text {
      line-height: 12px;
      font-size: 12px;
      color: #888888;
    }

    &__btn {
      position: relative;
      display: block;
      width: 40px;
      height: 40px;
      outline: none;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);

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

      &:before {
        background-color: var(--bg-white);
      }

      &--plus {
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 2px;
          height: 18px;
          background-color: #ff5a19;
          border-radius: 3px;
        }

        &:before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 18px;
          height: 2px;
          background-color: #ff5a19;
          border-radius: 3px;
        }
      }

      &--minus {
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 18px;
          height: 2px;
          background-color: #ff5a19;
          border-radius: 3px;
        }
      }
    }

    &__output {
      display: block;
      box-sizing: border-box;
      width: 40px;
      height: 40px;
      font-size: 18px;
      text-align: center;
      color: #353535;
      background-color: transparent;
      border: none;

      @media (--tablet) {
        width: 25px;
        font-size: 21px;
      }

      &:focus {
        outline: none;
      }
    }

    &__label {
      position: relative;
      display: flex;
      justify-content: center;
      font-size: 16px;
    }

    &__unit {
      margin-left: 3px;
      line-height: 34px;
    }
  }
</style>
