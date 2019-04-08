import { createMutableEnum, createEnum, DataNumber } from '../src'

describe('testing mutable enumerations', () => {
 const redData = { red: 255 }
 const blueData = { blue: 255 }
 const greenData = { green: 255 }

  const COLORS = createMutableEnum(
    ['RED', 'A color in the red spectrum', redData],
    ['GREEN', 'A color in the green spectrum', greenData],
    ['BLUE', 'A color in the blue spectrum', blueData],
  )

  it('should bi-directionally map', () => {
    expect(COLORS.RED).not.toBe(0)
    expect(COLORS.RED == 0).toBeTruthy()
    expect(COLORS.RED === 0).toBeFalsy()
    expect(COLORS[COLORS.RED]).toBe('RED')

    expect(COLORS.GREEN).not.toBe(1)
    expect(COLORS.GREEN == 1).toBeTruthy()
    expect(COLORS.GREEN === 1).toBeFalsy()
    expect(COLORS[COLORS.GREEN]).toBe('GREEN')

    expect(COLORS.BLUE).not.toBe(2)
    expect(COLORS.BLUE == 2).toBeTruthy()
    expect(COLORS.BLUE === 2).toBeFalsy()
    expect(COLORS[COLORS.BLUE]).toBe('BLUE')
  })

  it('should allow data access', () => {
    expect(COLORS.data(COLORS.RED)).toBe(redData)
    expect(COLORS.data(COLORS[COLORS.RED])).toBe(redData)

    expect(COLORS.data(COLORS.GREEN)).toBe(greenData)
    expect(COLORS.data(COLORS[COLORS.GREEN])).toBe(greenData)

    expect(COLORS.data(COLORS.BLUE)).toBe(blueData)
    expect(COLORS.data(COLORS[COLORS.BLUE])).toBe(blueData)
  })

  it('should be mutable', () => {
    expect(() => {
      COLORS.test = true
      expect(COLORS.test).toBe(true)
      expect(delete COLORS.RED).toBe(true)
    }).not.toThrow()
  })
})

describe('testing mutable enumerations', () => {
 const redData = { red: 255 }
 const blueData = { blue: 255 }
 const greenData = { green: 255 }

  const COLORS = createEnum(
    ['RED', 'A color in the red spectrum', redData],
    ['GREEN', 'A color in the green spectrum', greenData],
    ['BLUE', 'A color in the blue spectrum', blueData],
  )


  it('should not be mutable', () => {
    expect(() => {
      COLORS.test = true
      expect(COLORS.test).toBe(undefined)
      expect(delete COLORS.RED).toBe(false)
    }).toThrow()
  })
})

describe('test DataNumber integration', () => {
  const d = new DataNumber(1, { prop: 'Value' })

  it('should be usable as a number', () => {
    let array = ['a', 'b', 'c']

    expect(array[d]).toBe('b')
    expect(d + 3).toBe(4)
    expect(d == 1).toBeTruthy()
  })

  it('data should be accessible via a dot operator', () => {
    expect(d.prop).toEqual('Value')
  })

  it('data should be extendable', () => {
    d.secondProp = true

    expect(d.secondProp).toBeTruthy()
  })

  it('should have data accessible via the symbol', () => {
    expect(d[DataNumber.DATA].prop).toEqual('Value')
  })
})
