import PaymentDetails from '@/components/Payment/PaymentDetails'
import Order from '@/components/Order'

export default [
  {
    path: '/ord:orderId',
    component: Order
  },
  {
    path: '/pdm:monthAsStringProp',
    component: PaymentDetails
  }
]
