import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export const startDate = new Date(2017, 0, 1)
export const endDate = moment(Date.now()).startOf('month').toDate()

export const paymentsHistoryMixin = {
  mounted() {
    this.checkAndLoad()
  },

  data() {
    return {
      month: null,
      isMonthCorrect: false
    }
  },

  methods: {
    checkAndLoad() {
      const momentDate = moment(this.monthAsString, 'YYYYMM')

      this.isMonthCorrect = this.monthAsString.length === 6 &&
        momentDate.isValid() &&
        startDate.valueOf() <= momentDate.valueOf() && momentDate.valueOf() <= endDate.valueOf()

      this.month = momentDate.toDate()

      if (this.prepareData)
        this.prepareData()

      if (!this.loaded && !this.loading)
        this.fetchPaymentsHistory(this.month)
    },

    ...mapActions(['fetchPaymentsHistory'])
  },

  computed: {
    ..._.mapValues(mapGetters({
      loading: 'paymentsHistoryLoading',
      loaded: 'paymentsHistoryLoaded',
      error: 'paymentsHistoryError',
      history: 'paymentsHistory'
    }), item => function (...rest) {
      return item.call(this, rest)(this.month)
    })
  },

  watch: {
    monthAsString() {
      this.checkAndLoad()
    }
  }
}
