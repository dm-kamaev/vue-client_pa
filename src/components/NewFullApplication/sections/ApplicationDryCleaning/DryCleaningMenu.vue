<template>
  <div>

  </div>
</template>

<script>
  import LinearMenu from "vue_components/src/components/LinearMenu"
  import CardsRadio from "vue_components/src/components/CardsRadio"
  import CustomSelect from "../NewFullApplication/CustomSelect";

	export default {
		name: 'DryCleaningMenu',

    components: {
      CustomSelect,
      LinearMenu,
      CardsRadio
    },

    props: {
      activeServiceGroupId: {
        type: String
      }
    },

		data: () => ({
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
      selectServiceGroup(item) {
        this.activeServiceGroup = item
        this.activeService = this.activeServiceGroup.services[0]
      },
    },

    watch: {
      activeClassItem() {
        this.$emit('input', this.activeClassItem.classId)
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
    }
	}
</script>
<style scoped>
  @import "../../css/variables.css";

  .service-menu {
    margin-bottom: 15px;

    @media (--tablet) {
      margin-bottom: 25px;
    }

    &__select {
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

      @media (--desktop) {
        font-size: 16px;
        line-height: 22px;
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
        border-color: #353535;
        color: #ffffff;
        background-color: #353535;

        &:first-child {
          border-color: #353535;
        }

        &:last-child {
          border-color: #353535;
        }
      }
    }
  }
</style>
