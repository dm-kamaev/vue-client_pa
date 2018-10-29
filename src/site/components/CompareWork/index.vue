<template>
   <div class="compare-work">

     <compare-work-header
       ref="header"
       :style="{'top': `${top}px`}"
       v-if="firstService && secondService"
       :services="services"
       :firstService="firstService"
       :secondService="secondService"
       @changeFirstService="changeFirstService"
       @changeSecondService="changeSecondService" />

     <div v-if="firstService && secondService"
          class="compare-work__wrap">

       <div ref="table" class="compare-work__table">
         <div class="compare-work__table-inner">
           <compare-work-row v-for="(item, index) in namesOfWork.common"
                             key="index">
             <template slot="first">{{ item }}</template>
             <template slot="second" class="compare-work__cell">
               {{ config[firstService.value].common[index] }}
             </template>
             <template slot="third" class="compare-work__cell">
               {{ config[secondService.value].common[index] }}
             </template>
           </compare-work-row>

           <compare-work-row v-for="item in differentWorks"
                             key="`${item.value}${firstService.value}${secondService.value}`">
             <template slot="first">{{ item.title }}</template>
             <template slot="second" class="compare-work__cell">
               <template v-if="config[firstService.value][item.group][item.value]">
                 <svg width="21" height="16" viewBox="0 0 21 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                   <g fill="none">
                     <g>
                       <path d="M 18.1267 0L 6.16978 12.0972L 0 4.7093" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" transform="translate(1.37329 1.5)" stroke="#58B874"/>
                     </g>
                   </g>
                 </svg>
               </template>
               <template v-else>
                &mdash;
               </template>
             </template>
             <template slot="third" class="compare-work__cell">
               <template v-if="config[secondService.value][item.group][item.value]">
                 <svg width="21" height="16" viewBox="0 0 21 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                   <g fill="none">
                     <g>
                       <path d="M 18.1267 0L 6.16978 12.0972L 0 4.7093" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" transform="translate(1.37329 1.5)" stroke="#58B874"/>
                     </g>
                   </g>
                 </svg>
               </template>
               <template v-else>
                 &mdash;
               </template>
             </template>
           </compare-work-row>
         </div>
       </div>

       <h3 class="compare-work__title">Общие работы</h3>

       <linear-menu :list="menu" v-model="activeMenu"/>

       <ul v-for="(group, index) in commonWorks" class="compare-work__list" v-show="index === activeMenu.value">
         <li v-for="service in group"
             key="service"
             class="compare-work__list-item">
           {{ service }}
         </li>
       </ul>
     </div>


   </div>
</template>
<script>
  import LinearMenu from 'vue_components/src/components/LinearMenu'
	import CustomSelect from "../../components/CustomSelect/index";
	import { namesOfWork } from "./namesOfWork"
  import { config } from "./config"
  import CompareWorkHeader from "./CompareWorkHeader";
  import CompareWorkRow from "./CompareWorkRow";

  export default {
    components: {
      CompareWorkRow,
      CompareWorkHeader,
      LinearMenu,
      CustomSelect
    },

    name: 'CompareWork',

		data: () => ({
      menuCenter: true,
      firstService: null,
      secondService: null,
      commonWorks: {
        room: [],
        kitchen: [],
        bathroom: []
      },
      config: config,
      differentWorks: [],
      menu: [
        {
          title: 'Комната и коридор',
          value: 'room'
        },
        {
          title: 'Кухня',
          value: 'kitchen'
        },
        {
          title: 'Ванная',
          value: 'bathroom'
        }
      ],
      activeMenu: null,
      namesOfWork: namesOfWork,
      top: 60,
      pageHeaderHeight: 60
		}),

    computed: {
      heightHeader() {
        return this.$refs.header.$el.getBoundingClientRect().height;
      },

      town() {
        const subDomain = window.location.hostname.split('.')[0]
        let town = 'moscow'

        if (/www/.test(subDomain)) {
          town = 'moscow'
        }

        if (/spb/.test(subDomain)) {
          town = 'spb'
        }

        if (/nn/.test(subDomain)) {
          town = 'nn'
        }

        return town
      },

      services() {
        return this.$store.state.services.servicesByTown[this.town][0].services
      }
    },

		methods: {
      handleScroll() {
        const tableBottom = this.$refs.table.getBoundingClientRect().bottom

        if (tableBottom < (this.heightHeader + this.pageHeaderHeight)) {
          this.top = tableBottom - this.heightHeader
        } else {
          this.top = this.pageHeaderHeight
        }
      },

      compareWorks() {
        this.differentWorks = []
        this.commonWorks = {
          room: [],
          kitchen: [],
          bathroom: []
        }

        for (let group in namesOfWork) {
          for (let service in namesOfWork[group]) {
            if (config[this.firstService.value][group][service] === config[this.secondService.value][group][service]) {
              if (this.commonWorks[group] && config[this.firstService.value][group][service]) {
                this.commonWorks[group].push(namesOfWork[group][service])
              }
            } else {
              if (this.commonWorks[group]) {
                const exist = this.differentWorks.some((item) => {
                  return item.title === namesOfWork[group][service]
                })

                if (!exist) {
                  this.differentWorks.push({
                    title: namesOfWork[group][service],
                    group: group,
                    value: service
                  })
                }
              }
            }
          }
        }
      },

      changeFirstService(item) {
        this.firstService = item
        this.compareWorks()

      },

      changeSecondService(item) {
        this.secondService = item
        this.compareWorks()
      }
		},

    mounted() {
      this.$nextTick(() => {
        window.addEventListener('scroll', this.handleScroll)
      })

      this.activeMenu = this.menu[0]
      this.firstService = this.services[0]
      this.secondService = this.services[1]

      this.compareWorks()
    }
	}
</script>

<style scoped>
  @import "../../css/variables.css";

  .compare-work {
    background-color: #ffffff;

    &__wrap {
      padding-bottom: 40px;
      background-color: #ffffff;

      @media (--tablet) {
        box-sizing: border-box;
        width: 690px;
        margin: 0 auto;
        padding-left: 20px;
        padding-right: 20px;
      }

      @media (--desktop) {
        width: 920px;
        padding-left: 40px;
        padding-right: 40px;
      }
    }

    &__title {
      margin-bottom: 25px;
      padding-left: 25px;
      font-family: var(--base-font-family);
      text-align: left;
      font-size: 16px;
      line-height: 28px;
      font-weight: 400;
      color: #353535;

      @media (--tablet) {
        padding-left: 25px;
        font-size: 18px;
        line-height: 32px;
      }

      &--tablet-show {
        display: none;

        @media (--tablet) {
          display: block;
          padding-left: 0;
        }
      }
    }

    &__table {
      position: relative;
      margin-bottom: 35px;
      margin-top: 190px;
      background-color: #ffffff;

      @media(--tablet) {
        margin-bottom: 40px;
        margin-top: 115px;
      }
    }

    &__table-inner {
      @media(--tablet) {
        box-sizing: border-box;
        width: 100%;
        background-color: #ffffff;
      }
    }

    &__btn {
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: rgba(200, 0, 0, 0.0);
      outline: none;
      box-sizing: border-box;
      width: 135px;
      padding: 8px 37px;
      border-radius: 3px;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 19px;
      color: #ffffff;
      background-color: #ff5a19;

      @media (--tablet) {
        width: 160px;
        padding-left: 50px;
        padding-right: 50px;
      }
    }

    &__cell {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 50%;
      text-align: center;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 22px;
      color: #353535;

      @media (--tablet) {
        width: 28%;
        font-size: 16px;
      }

      @media (--desktop) {
        width: 27%;
        font-size: 16px;
      }

      &:last-child {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 22px;
          background-color: #cbc9c9;

          @media (--tablet) {
            display: none;
          }
        }
      }

      &--header {
        width: 135px;

        @media (--tablet) {
          width: 28%;
        }

        @media (--desktop) {
          width: 27%;
        }

        &:last-child {
          &::before {
            display: none;
          }
        }
      }

      &--wide {
        width: 100%;
        margin-bottom: 20px;
        font-size: 16px;
        line-height: 22px;

        @media (--tablet) {
          box-sizing: border-box;
          justify-content: flex-start;
          width: 44%;
          margin-bottom: 0;
          padding-left: 25px;
          text-align: left;
        }

        @media (--desktop) {
          width: 46%;
        }
      }

      &--hidden {
        display: none;

        @media(--tablet) {
          display: flex;
        }
      }
    }

    &__list {
      padding: 0 25px 0 40px;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 25px;
      min-height: 300px;

      @media (--tablet) {
        font-size: 16px;
        line-height: 27px;
      }
    }
  }

</style>

<style>
  .smartbanner {
    display: none;
  }

  .main-header__container .main-header__container-button {
    display: none;
  }
</style>
