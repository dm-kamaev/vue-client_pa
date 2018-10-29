<template>
   <div class="calc">

     <!--<linear-menu-->
       <!--:list="menuItems"-->
       <!--:active="selectedMenuItemId"-->
       <!--@select="selectItem"-->
     <!--&gt;-->
     <!--</linear-menu>-->

     <div class="calc__inner">
       <div class="calc__tab"
            v-if="selectedMenuItemId === 0">
         <calc-radio-btns
           :sofa-radio-btns="sofaRadioBtns">
         </calc-radio-btns>
         <div class="calc__subtitle">Количество посадочных мест</div>
         <scroll-bar></scroll-bar>
       </div>

       <div class="calc__tab" v-for="menuItem in menuItems" v-if="menuItem.id === selectedMenuItemId">

         <div class="calc__calc-counter-wrapper" v-if="menuItem.furniture">

           <calc-counter
             v-for="furnitureItem in menuItem.furniture"
             :key="furnitureItem.id"
             @set="setValue"
             @decrease-value="decreaseValue"
             :img="furnitureItem.img"
             :title="furnitureItem.title"
             :id="furnitureItem.id"
             :number="furnitureItem.number"
             :max-number="furnitureItem.maxNumber"
             :min-number="furnitureItem.minNumber">
           </calc-counter>

         </div>
       </div>

       <footer class="calc__footer">
         <p class="calc__price">2 000
           <span class="calc__price">&#x20bd;</span>
         </p>
         <p class="calc__text">Наш менеджер перезвонит Вам в течении 10 минут.</p>
         <button class="calc__btn" type="submit">Оформить</button>
       </footer>

     </div>
   </div>
</template>

<script>
  import CalcCounter from "@/components/Himchistka/CalcCounter"
  import LinearMenu from "vue_components/src/components/LinearMenu"
  import ScrollBar from "@/components/Himchistka/ScrollBar"
  import CalcRadioBtns from "@/components/Himchistka/CalcRadioBtns"
  import armchair1 from './img/armchair-1.svg'
  import armchair2 from './img/armchair-2.svg'
  import armchair3 from './img/armchair-3.svg'
  import chair1 from './img/chair-1.svg'
  import chair2 from './img/chair-2.svg'
  import chair3 from './img/chair-3.svg'
  import chair4 from './img/chair-4.svg'
  import other1 from './img/other-1.svg'
  import other2 from './img/other-2.svg'

	export default {
		name: 'Himchistka',

    components: {
      ScrollBar,
      LinearMenu,
      CalcCounter,
      CalcRadioBtns
    },

    data: () => ({
      menuItems: [
        {
          id: 0,
          title: 'Диван'
        },
        {
          id: 1,
          title: 'Кресло',
          furniture: [
            {
              img: armchair1,
              title: 'Кресло',
              number: 0,
              maxNumber: 100,
              minNumber: 0,
              id: 0
            },
            {
              img: armchair2,
              title: 'Полукресло',
              number: 0,
              maxNumber: 100,
              minNumber: 0,
              id: 2
            },
            {
              img: armchair3,
              title: 'Кресло кровать',
              number: 0,
              maxNumber: 100,
              minNumber: 0,
              id: 3
            },
          ]
        },
        {
          id: 2,
          title: 'Стул',
          furniture: [
            {
              img: chair1,
              title: 'Без тканевой спинки',
              number: 0,
              maxNumber: 100,
              minNumber: 0,
              id: 3
            },
            {
              img: chair2,
              title: 'С тканевой спинкой',
              number: 0,
              maxNumber: 100,
              minNumber: 0,
              id: 4
            },
            {
              img: chair3,
              title: 'Офисный',
              number: 0,
              maxNumber: 100,
              minNumber: 0,
              id: 5
            },
            {
              img: chair4,
              title: 'Пуфик',
              number: 0,
              maxNumber: 100,
              minNumber: 0,
              id: 6
            }
          ]
        },
        {
          id: 3,
          title: 'Другое',
          furniture: [
            {
              img: other1,
              title: 'Каркас кровати',
              number: 0,
              maxNumber: 100,
              minNumber: 0,
              id: 7
            },
            {
              img: other2,
              title: 'Кухонный уголок',
              number: 0,
              maxNumber: 100,
              minNumber: 0,
              id: 8
            },
          ]
        }
      ],
      sofaRadioBtns: [
        {
          id: 0,
          text: 'Ткань'
        },
        {
          id: 1,
          text: 'Кожа'
        },
      ],
      selectedMenuItemId: 0
		}),

		methods: {
      setValue: function (id, value) {
        for (let i = 0; i < this.menuItems.length; i++) {
          let menuItem = this.menuItems[i];
          let furniture = menuItem.furniture;

          if (menuItem.id === this.selectedMenuItemId && furniture) {
            for (let j = 0; j < furniture.length; j++) {
              let item = furniture[j];

              if (item.id === id && item.number < 100) {
                item.number = value
                break;
              }
            }
            break;
          }
        }
      },

      decreaseValue: function (id) {
        for (let i = 0; i < this.menuItems.length; i++) {
          let menuItem = this.menuItems[i];
          let furniture = menuItem.furniture;

          if (menuItem.id === this.selectedMenuItemId && furniture) {
            for (let j = 0; j < furniture.length; j++) {
              let item = furniture[j];

              if (item.id === id && item.number > 0) {
                item.number--;
                break;
              }
            }
            break;
          }
        }
      },

      selectItem(index) {
        this.selectedMenuItemId = this.menuItems[index]
      }
    }
	}
</script>

<style scoped>
  @import "../../css/variables.css";

  .calc {
    margin-top: 100px;
    padding: 65px 3%;
    background-color: #f5f5f5;
    &__inner {
      padding: 40px 15px;
      background-color: #ffffff;

      @media (--tablet) {
        padding: 50px 55px;
      }

      @media (--desktop) {
        padding-left: 85px;
        padding-right: 85px;
      }
    }

    &__subtitle {
      margin-bottom: 30px;
      font-family: var(--base-font-family);
      font-size: 18px;
      line-height: 20px;
      font-weight: 400;
      color: #353535;
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
    }

    &__text {
      margin-bottom: 40px;
      font-family: var(--base-font-family);
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      letter-spacing: 0.14px;
      color: #353535;
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

    }
  }
</style>
