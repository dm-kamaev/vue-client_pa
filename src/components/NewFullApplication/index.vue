<template>
  <application-container :showSideBar="showSideBar">

    <div slot="content">
      <loader v-if="newOrderLoading"/>

      <router-view v-if="!newOrderLoading && !newOrderError"/>

      <error-fetch v-if="newOrderError"/>
    </div>

    <application-sidebar v-if="params.service.sidebar" slot="sidebar" :params="params" @showNotification="showNotification"/>

    <popup v-if="isPopupOpen" @close="hidePopup" :coordinate="coordinate" slot="popup">
      <application-sidebar-notification />
    </popup>
  </application-container>
</template>

<script>
  import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
  import transform from '@/utils/transform'
  import api from 'vue_components/src/api/index'
  import router from '@/router'
  import types from '@/store/types'
  import analytic from '@/store/common/analytic'

  import Loader from '@/components/common/Loader'
  import ErrorFetch from '@/components/common/Error/ErrorFetch'
  import ApplicationContainer from './ApplicationContainer'
  import ApplicationSidebar from "./ApplicationSidebar"
  import Popup from "../common/Popup/index"
  import ApplicationSidebarNotification from "./ApplicationSidebar/ApplicationSidebarNotification"

	export default {
		name: 'NewFullApplication',

    components: {
      ApplicationSidebarNotification,
      Popup,
      Loader,
      ErrorFetch,
      ApplicationContainer,
      ApplicationSidebar
    },

    props: {
		  path: {
		    type: String
      },

      town: {
		    type: String
      },

      service: {
        type: String
      }
    },

		data: () => ({
      params: {
        service: {
          id: null,
          details: null,
          defaultValue: {
            service: {
              controllers: {},
              addition: {}
            },
            addition: {},
            washwindow: {},
            dryCleaning: {}
          },
          sidebar: {}
        },
        orderId: null,
        objectId: null,
        requestJson: null,
        address: null,
        price: null,
        services: null,
        buttonOrder: false,
        pathSuccess: null,
        getContactOrder: false,
        phone: ''
      },
      newOrderLoading: false,
      newOrderError: false,
      isPopupOpen: false,
      coordinate: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100vw',
        height: '100vh'
      }
    }),

		computed: {
      ...mapState({
        clientInit: state => state.client.isInitialized,
        clientId: state => state.client.clientId,
        mobile: state => state.common.isMobile,
        date: state => state.order.date,
        timeZone: state => state.order.timeZone,
        currentView: state => state.order.currentView,
        objectId: state => state.order.objectId,
        address: state => state.order.address
      }),

      showSideBar() {
        return !(this.currentView === 'town' || this.currentView === 'services' || this.currentView === 'history' || this.currentView === 'info' || this.currentView === 'contacts')
      },

      objects() {
        const list = []

        for (let key in this.$store.state.client.objects) {
          list.push(this.$store.state.client.objects[key])
        }

        return list
      },

      viewList() {
        return this.$store.state.order.viewList
      }
    },

		methods: {
      ...mapMutations({
        hideMenu: types.HIDE_MENU,
        setViewList: types.ORDER_SET_VIEW_LIST,
        setTown: types.ORDER_SET_TOWN,
        setServiceId: types.ORDER_SET_SERVICE_ID,
        setCurrentView: types.ORDER_SET_CURRENT_VIEW,
        singOut: types.SIGN_OUT
      }),

      ...mapActions(['setPageOldView', 'defineError', 'initOrderRoute']),

      next(params) {
        if (params) {
          const arr = [ 'history' ]
          this.setViewList(arr.concat(...params))
        }

        if (this.currentView) {
          if (this.viewList.length !== this.viewList.indexOf(this.currentView) + 1) {
            this.setCurrentView(this.viewList[this.viewList.indexOf(this.currentView) + 1])
          }

          if (this.viewList.length === this.viewList.indexOf(this.currentView) + 2) {
            this.params.buttonOrder = true
          }

          if (this.viewList.length === this.viewList.indexOf(this.currentView) + 1) {
            this.addOrder()
          }
        } else {
          this.setCurrentView(this.viewList[this.viewList.indexOf(this.viewList[0])])
        }

        window.scrollTo(0, 0)
      },

      nextAfterAuth() {
        this.setViewList(this.getViewList())
        this.currentView = this.viewList[0]
      },

      showNotification() {
        this.isPopupOpen = true
      },

      hidePopup() {
        this.isPopupOpen = false
      }
    },

    created() {
      this.hideMenu()
      this.setPageOldView(false)

      this.initOrderRoute({
        path: this.$route.path,
        town: this.town,
        service: this.service
      })
    }
	}
</script>
