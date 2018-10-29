<template>
  <div class="application-dry-cleaning">

    <application-header @backwards="prev">
      Выберите услуги химчистки
    </application-header>

    <div class="service-menu">
      <custom-select class="service-menu__select" :options="serviceGroup"  label="title"></custom-select>
      <ul class="service-menu__menu">
        <li v-for="item in serviceGroup" class="service-menu__item" @click="selectServiceGroup(item)" :class="{'service-menu__item--active': activeServiceGroup === item}">
          <p class="service-menu__item-name">{{ item.title }}</p>
        </li>
      </ul>
      <linear-menu class="service-menu__sub-menu" v-if="activeServiceGroup && activeServiceGroup.services.length" :list="activeServiceGroup.services" v-model="activeService"/>
    </div>

    <div class="application-dry-cleaning__content">

      <cards-radio v-if="activeService && activeService.list" :list="activeServiceList" v-model="activeClassItem"/>

      <template v-if="classId">
        <application-dry-cleaning-calculator :classId="classId"/>

        <div v-for="item in services">{{ item }}</div>
      </template>
    </div>

  </div>
</template>

<script>
  import ApplicationHeader from "../../ApplicationHeader"
  import ApplicationDryCleaningCalculator from "./ApplicationDryCleaningCalculator";
  import LinearMenu from "vue_components/src/components/LinearMenu"
  import CardsRadio from "vue_components/src/components/CardsRadio"
  import CustomSelect from "../../../NewFullApplication/CustomSelect";

  export default {

    name: 'ApplicationDryCleaning',

    components: {
      ApplicationHeader,
      ApplicationDryCleaningCalculator,
      CustomSelect,
      LinearMenu,
      CardsRadio
    },

    props: {
      serviceId: {
        type: String
      }
    },

		data: () => ({
      service: {},
      price: 0,
      services: [],
      classId: null,
      serviceGroup: [
        {
          title: 'Мягкая мебель',
          services: [
            {
              title: 'Диван',
              list: [ 'sofa', 'folding-sofa' ]
            },
            {
              title: 'Кресло',
              list: [ 'armchair', 'armchair-bed', 'half-armchair' ]
            },
            {
              title: 'Стул',
              list: [ 'chair', 'fabric-chair', 'office-chair', 'padded-stool' ]
            },
            {
              title: 'Другое',
              list: [ 'kitchen-corner', 'bed-frame', 'mattress' ]
            },
          ]
        },

        {
          title: 'Ковер и ковролин',
          services: [
            {
              title: 'Ковер',
              value: 'carpet'
            },
            {
              title: 'Ковролин',
              value: 'carpeting'
            },
          ]
        },

        {
          title: 'Шторы и жалюзи',
          services: [
            {
              title: 'Шторы',
              value: 'curtain'
            },
            {
              title: 'Жалюзи',
              value: 'blind'
            },
            {
              title: 'Римские',
              value: 'roman-blind'
            },
            {
              title: 'Ламбрекен',
              value: 'lambrequin'
            },
          ]
        },
        {
          title: 'Дополнительно',
          services: ['']
        }
      ],
      activeServiceGroup: null,
      activeService: null,
      activeClassItem: null
    }),

		computed: {
      config() {
        return this.$store.state.services.objectClasses
      },

      activeServiceList() {
        const arr = []

        if (this.activeService.list) {
          this.activeService.list.forEach((item) => {
            arr.push(this.config[item])
          })
        }

        return arr
      }
    },

		methods: {
      prev() {
        this.$emit('prev')
      },

      selectService(item) {
		    this.activeService = item
      },

      selectClass(item) {
        this.activeClass = item
      },

      selectServiceGroup(item) {
        this.activeServiceGroup = item
        this.activeService = this.activeServiceGroup.services[0]
      }
    },

    watch: {

      activeClass() {
        this.setAddition()
      },

      activeClassItem() {
        this.classId = this.activeClassItem.classId
      },

      activeService() {
        if (this.activeService.list) {
          this.activeClassItem = this.activeServiceList[0]
        } else {
          this.activeClassItem = this.config[this.activeService.value]
        }

      }
    },

    mounted() {
      if (this.activeServiceGroupId) {
        for (let key in this.serviceGroup) {
          if (this.serviceGroup[key].id === this.activeServiceGroupId) {
            this.activeServiceGroup = this.serviceGroup[key]
          }
        }
      } else {
        this.activeServiceGroup = this.serviceGroup[0]
      }

      this.activeService = this.activeServiceGroup.services[0]
      this.activeClassItem = this.activeServiceList[0]
      // if (this.activeServiceGroupId) {
      //   for (let key in this.serviceGroup) {
      //     if (this.serviceGroup[key].id === this.activeServiceGroupId) {
      //       this.activeServiceGroup = this.serviceGroup[key]
      //     }
      //   }
      // } else {
      //   this.activeServiceGroup = this.serviceGroup[0]
      // }
      //
      // this.activeService = this.activeServiceGroup.services[0]
      // this.activeClass = this.activeService.list[0]
      // this.activeClassItem = this.activeServiceList[0]
      //
      // this.setAddition()
    }
	}
</script>
<style scoped>
  @import "../../../../css/variables.css";
  @import "../../../../css/components/button.css";

  .application-dry-cleaning {

    &__content {
      padding: 20px;
      background-color: #f6f6f6;
    }

    &__menu-wrapper {
      padding-right: 20px;
      padding-left: 20px;

      @media (--tablet) {
        padding-left: 0;
        padding-right: 0;
      }
    }

    &__subtitle {
      margin-bottom: 30px;
      font-family: var(--base-font-family);
      font-size: 18px;
      line-height: 20px;
      font-weight: 400;
      color: #353535;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
    }

    &__calc-counter-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin-top: -35px;
    }

    &__footer {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 1px solid #cdcdcd;
    }

    &__price {
      margin-bottom: 30px;
      text-align: right;
      font-family: var(--base-font-family);
      font-size: 33px;
      line-height: 33px;
      font-weight: 600;
      color: #000000;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
    }

    &__text {
      margin-bottom: 40px;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      letter-spacing: 0.14px;
      color: #353535;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
    }

    &__btn {
      width: 270px;
      padding-top: 15px;
      padding-bottom: 15px;
      font-family: var(--base-font-family);
      font-size: 16px;
      line-height: 20px;
      font-weight: 400;
      color: #353535;
      background-color: #e8e8e8;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);
    }
  }

  .service-menu {
    margin-bottom: 15px;

    @media (--tablet) {
      margin-bottom: 25px;
    }

    &__select {
      box-sizing: border-box;
      width: calc(100% - 40px);
      margin-left: 20px;
      margin-right: 20px;
      margin-bottom: 20px;
      @media (--tablet) {
        display: none;
      }
    }

    &__menu {
      display: none;
      @media (--tablet) {
        list-style: none;
        display: flex;
        margin: 0 0 30px 0;
        padding: 0;
      }
    }

    &__item {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 13px;
      padding-bottom: 13px;
      border-top: 1px solid #cbc9c9;
      border-left: 1px solid #cbc9c9;
      border-bottom: 1px solid #cbc9c9;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 19px;
      font-weight: 400;
      color: #353535;
      background-color: #f6f6f6;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0);

      @media (--desktop) {
        font-size: 16px;
        line-height: 22px;
      }

      &:hover {
        @media (--tablet) {
          border-color: #263239;
          color: #ffffff;
          background-color: #263239;
        }
      }

      &:first-child {
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }

      &:last-child {
        border-right: 1px solid #cbc9c9;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
      }

      &--active {
        border-color: #263239;
        color: #ffffff;
        background-color: #263239;

        &:first-child {
          border-color: #263239;
        }

        &:last-child {
          border-color: #263239;
        }
      }
    }
  }
</style>
