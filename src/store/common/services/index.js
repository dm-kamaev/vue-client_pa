import { state as objectServicesState } from './objectServices'
import { state as objectClassesState } from './objectClasses'
import { state as objectAdditionState } from './objectAddition'
import { state as servicesByTown } from './servicesByTown'
import { state as listServicesWorks } from './listServicesWorks'
import { state as namesServicesWorks } from './namesServicesWorks'

import { state as oldObjectServicesState } from './oldObjectServices'
import { state as oldObjectClassesState } from './oldObjectClasses'
import { state as oldServicesByTown } from './oldServicesByTown'

const state = {
  ...objectClassesState,
  ...objectServicesState,
  ...servicesByTown,
  ...oldObjectClassesState,
  ...oldObjectServicesState,
  ...objectAdditionState,
  ...oldServicesByTown,
  ...listServicesWorks,
  ...namesServicesWorks
}

export default {
  state
}
