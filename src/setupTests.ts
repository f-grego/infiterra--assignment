import { beforeEach } from 'vitest'
import { config } from '@vue/test-utils'

config.global.stubs = {
  RouterLink: {
    template: '<a><slot /></a>',
  },
}

beforeEach(() => {
  document.body.innerHTML = ''
})

global.fetch = vi.fn()
