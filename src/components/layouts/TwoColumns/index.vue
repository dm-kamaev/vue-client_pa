<template>
  <div class="main-content">
    <div class="main-content__wrap">
      <column :path="leftPath" :routes="leftRoutes"></column>
      <column :path="rightPath" :routes="rightRoutes"></column>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
  import types from '@/store/types'
  import Column from './Column'
  import leftRoutes from '@/router/left'
  import rightRoutes from '@/router/right'

  export default {
    name: 'TwoColumn',

    components: {
      Column
    },

    props:  {
      leftPath: {
        type: String
      },

      rightPath: {
        type: String
      }
    },

    data: () => ({
      leftRoutes: leftRoutes,
      rightRoutes: rightRoutes
    }),

    methods: {
      ...mapMutations({
        showMenu: types.SHOW_MENU
      }),

      ...mapActions(['setPageOldView']),
    },

    created() {
      this.showMenu()
      this.setPageOldView(true)
    }
  }
</script>

<style scoped>
  @import "../../../css/variables.css";
  @import "../../../css/reset.css";

  .main-content {
    height: 100%;

    &__wrap {
      height: 100%;
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      @media (--tablet) {
        flex-grow: 1;
        flex-direction: row;
        background-color: var(--bg-dark);
      }
    }
  }
</style>
