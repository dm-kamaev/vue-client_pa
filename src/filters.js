import moment from 'moment'
import Vue from 'vue'

function formatNumber(value, accuracy, keep, spacingThousands) {
  if (typeof value !== 'number') return value;

  const fixed = value.toFixed(accuracy)

  const result = keep ? fixed : +fixed

  if (spacingThousands) {
    const parts = result.split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    return parts.join(".")
  }

  return result
}

Vue.filter('date', (date, format) => moment(date).format(format))
Vue.filter('firstLetterToUpperCase', s => s ? s[0].toUpperCase() + s.slice(1) : s)
Vue.filter('formatNumber', formatNumber)
Vue.filter('currency', n => formatNumber(n, 2, true, true))
