import { mount } from '@vue/test-utils'
import ProductViewLoadingSkeleton from '../features/loading/ProductViewLoadingSkeleton.vue'

describe('ProductViewLoadingSkeleton.vue', () => {
  test('renders main layout containers', () => {
    const wrapper = mount(ProductViewLoadingSkeleton)

    expect(wrapper.find('.details').exists()).toBe(true)
    expect(wrapper.find('.image-box').exists()).toBe(true)
    expect(wrapper.find('.info').exists()).toBe(true)
  })

  test('renders image skeleton', () => {
    const wrapper = mount(ProductViewLoadingSkeleton)
    expect(wrapper.find('.img-skeleton').exists()).toBe(true)
  })

  test('renders title skeleton', () => {
    const wrapper = mount(ProductViewLoadingSkeleton)
    expect(wrapper.find('.title-skeleton').exists()).toBe(true)
  })

  test('renders two description skeletons', () => {
    const wrapper = mount(ProductViewLoadingSkeleton)
    const desc = wrapper.findAll('.desc-skeleton')
    expect(desc.length).toBe(2)
  })

  test('renders price skeleton', () => {
    const wrapper = mount(ProductViewLoadingSkeleton)
    expect(wrapper.find('.price-skeleton').exists()).toBe(true)
  })

  test('renders two variant skeletons', () => {
    const wrapper = mount(ProductViewLoadingSkeleton)
    const variants = wrapper.findAll('.variant-skeleton')
    expect(variants.length).toBe(2)
  })

  test('renders button skeleton', () => {
    const wrapper = mount(ProductViewLoadingSkeleton)
    expect(wrapper.find('.btn-skeleton').exists()).toBe(true)
  })
})
