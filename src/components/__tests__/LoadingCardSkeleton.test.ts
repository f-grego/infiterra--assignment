import { mount } from '@vue/test-utils'
import LoadingCardSkeleton from '../features/loading/LoadingCardSkeleton.vue'

describe('LoadingCardSkeleton.vue', () => {
  test('renders 8 skeleton cards', () => {
    const wrapper = mount(LoadingCardSkeleton)

    const cards = wrapper.findAll('.skeleton-card')
    expect(cards.length).toBe(8)
  })

  test('each card contains all skeleton elements', () => {
    const wrapper = mount(LoadingCardSkeleton)

    const firstCard = wrapper.find('.skeleton-card')

    expect(firstCard.find('.skeleton-image').exists()).toBe(true)
    expect(firstCard.find('.skeleton-title').exists()).toBe(true)
    expect(firstCard.find('.skeleton-text').exists()).toBe(true)
    expect(firstCard.find('.skeleton-price').exists()).toBe(true)
    expect(firstCard.find('.skeleton-button').exists()).toBe(true)
  })
})
