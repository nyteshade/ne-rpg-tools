// @flow

require('./signature')

export { functionOrValue } from './fnOrVal'
export { createMutableEnum, createEnum, DataNumber } from './enumeration'
export { Matches, Matcher } from './matcher'
export { Operation, Modifier } from './modifier'
export { getVal, expand, compress, ObjectPath } from './object-path'
export {
  Random,
  isNumber,
  numericSort,

  STD_WEIGHT,
  DEF_STD_WEIGHT,
  GEN_RANGE,
  GEN_RANGE_VALS,
} from 'weighted-randoms'

export type { Pattern } from './matcher'
