import Payment from '@/components/Payment'
import Orders from '@/components/Orders'

export default [
  {
    path: '/adr:objectId',
    component: Orders
  },
  {
    path: '/psm:monthAsStringProp',
    component: Payment
  }
]
