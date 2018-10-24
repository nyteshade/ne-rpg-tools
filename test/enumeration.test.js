import { createMutableEnum, createEnum } from '../src'

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
    expect(COLORS.RED).toBe(0)
    expect(COLORS[COLORS.RED]).toBe('RED')

    expect(COLORS.GREEN).toBe(1)
    expect(COLORS[COLORS.GREEN]).toBe('GREEN')

    expect(COLORS.BLUE).toBe(2)
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
