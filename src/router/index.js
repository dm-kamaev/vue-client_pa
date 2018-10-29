import Vue from 'vue'
import Router from 'vue-router'
import TwoColumns from '@/components/layouts/TwoColumns'
import InviteFriend from '@/components/InviteFriend'
import Profile from '@/components/Profile'
import NewFullApplication from '@/components/NewFullApplication'
import WorkRating from '@/components/WorkRating'
import ApplicationContacts from '@/components/NewFullApplication/sections/ApplicationContacts'
import ApplicationTown from "@/components/NewFullApplication/sections/ApplicationTown"
import ApplicationServices from "@/components/NewFullApplication/sections/ApplicationServices"
import ApplicationHistory from "@/components/NewFullApplication/sections/ApplicationHistory"
import ApplicationService from "@/components/NewFullApplication/sections/ApplicationService"
import ApplicationTime from "@/components/NewFullApplication/sections/ApplicationTime"
import ApplicationAddress from '@/components/NewFullApplication/sections/ApplicationAddress'
import ApplicationInfo from '@/components/NewFullApplication/sections/ApplicationInfo'
import ApplicationAddition from "@/components/NewFullApplication/sections/ApplicationAddition"
import ApplicationDryCleaning from "@/components/NewFullApplication/sections/ApplicationDryCleaning"
import ApplicationWashWindow from '@/components/NewFullApplication/sections/ApplicationWashWindow'



Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: '/private/',
  routes: [
    {
      path: '/share/cln:clientId',
      component: InviteFriend
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/order',
      component: NewFullApplication,
      props: route => ({
        path: route.query.path,
        service: route.query.service,
        town: route.query.town,
      }),
      children: [
        {
          path: 'contacts',
          component: ApplicationContacts
        },
        {
          path: 'town',
          component: ApplicationTown
        },
        {
          path: 'history',
          component: ApplicationHistory
        },
        {
          path: 'services',
          component: ApplicationServices
        },
        {
          path: 'service',
          component: ApplicationService
        },
        {
          path: 'addition',
          component: ApplicationAddition
        },
        {
          path: 'window',
          component: ApplicationWashWindow
        },
        {
          path: 'time',
          component: ApplicationTime
        },
        {
          path: 'address',
          component: ApplicationAddress
        },
        {
          path: 'info',
          component: ApplicationInfo
        },
        {
          path: '*',
          component: ApplicationTown
        },
      ],
    },
    {
      path: '/:left/:right?',
      component: TwoColumns,
      props: route => ({
        leftPath: route.params.left,
        rightPath: route.params.right
      })
    }
  ]
})

export default router
