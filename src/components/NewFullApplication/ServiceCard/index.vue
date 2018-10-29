<template>
  <div class="service-card" :class="{'service-card--active': value}">
    <div  class="service-card__wrap" @click="setActive">
      <img class="service-card__image" :src="images[config.img]" width="50" height="50" :alt="config.altText">
      <p class="service-card__text">{{ config.title }}</p>
    </div>

    <service-card-counter v-if="activeCard" :config="config" :value="value" @input="change"/>
  </div>
</template>

<script>
  import ServiceCardCounter from './ServiceCardCounter'
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

   components: {
     ServiceCardCounter
   },

   props: {
     serviceId: {
        type: String,
        required: true
     },

     active: {
       type: Number
     },

     value: {
       type: Number
     }
   },

   data: () => ({
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
     activeCard() {
       return this.value > 0
     },

     config() {
       return this.$store.state.services.objectClasses[this.serviceId]
     }
   },

   methods: {
     setActive() {
       if (!this.value) {
         this.$emit('input', 1)
       }
     },

     change(value) {
       this.$emit('input', value)
     }
   }
 }
</script>

<style>
  @import "../../../css/variables.css";

  .service-card {
    position: relative;
    width: 215px;
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

    @media (--tablet) {
      width: 230px;
    }

    @media (--desktop) {
      width: 260px;
    }

    &:hover {
      @media (--tablet) {
        border-color: #ff5a19;
      }
    }

    &--active {
      border-color: #ff5a19;
    }

    &__image {
      width: 50px;
      height: 60px;
      margin-right: 10px;

      @media (--tablet) {
        width: 70px;
        height: 70px;
      }
    }

    &__wrap {
      display: flex;
      flex-grow: 1;
      align-items: center;
      padding: 10px;

      @media (--desktop) {
        padding-right: 15px;
        padding-left: 15px;
      }
    }

    &__text {
      width: calc(100% - 55px);
      font-size: 14px;
      text-align: left;
      line-height: 1.3em;
      color: #353535;
      user-select: none;

      @media (--tablet) {
        width: calc(100% - 80px);
        font-size: 16px;
      }
    }
  }
</style>
