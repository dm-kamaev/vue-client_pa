import Vue from 'vue'
import Loader from '@/components/common/Loader'

describe('Loader.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Loader)
    const vm = new Constructor().$mount()

    expect(vm.$el.classList.contains('loader')).to.equal(true)
  })
})
