import { functionOrValue } from '../src'

describe('putting functionOrValue through its paces', () => {
  it('should pass through numbers', () => {
    expect(functionOrValue(3)).toBe(3)
    expect(functionOrValue(Number(3))).toBe(3)
  })

  it('should pass through strings', () => {
    expect(functionOrValue('hello')).toBe('hello')
    expect(functionOrValue('world'.toString())).toBe('world')
  })

  it('should pass through regexp', () => {
    let regexp = /something/

    expect(functionOrValue(regexp)).toBe(regexp)
  })

  it('should not pass through functions', () => {
    let fn = function() {}

    expect(functionOrValue(fn)).not.toBe(fn)
  })

  it('should execute function and extract value', () => {
    let fn = delta => (5 + (delta || 0))

    expect(functionOrValue(fn)).toBe(5)
    expect(functionOrValue(fn, 3)).toBe(8)
  })
})
