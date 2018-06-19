import { unwrapArray } from '../utils'

describe('unwrapArray', () => {
  it('sets to defaultValue', () => {
    const spy = jest.fn()
    const fn = unwrapArray(null, spy)
    fn && fn()

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
