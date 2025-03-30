import { GAME_RESULT, TypedValues, Values } from '@/types/game.type'

export function objectsMatchExact(
  initValues: Record<string, number>,
  typedValues: Record<number, string>
): GAME_RESULT {
  if (Object.keys(initValues).length === 0 || Object.keys(typedValues).length === 0) {
    return GAME_RESULT.DEFAULT
  }
  if (Object.keys(typedValues).length < Object.keys(initValues).length) {
    return GAME_RESULT.DEFAULT // Objects must have the same number of keys
  }

  for (const initKey in initValues) {
    const initValue = initValues[initKey]

    if (typedValues[initValue] !== initKey) {
      return GAME_RESULT.ERROR // String values don't match for the corresponding number key
    }
  }

  return GAME_RESULT.WIN // All matching number keys have matching string values
}

export function reverseObject(obj: Values): TypedValues {
  if (!obj || typeof obj !== 'object') {
    return {} // Return an empty object for invalid input
  }

  const reversedObj: TypedValues = {}

  for (const key in obj) {
    const value = obj[key]
    reversedObj[value] = key
  }

  return reversedObj
}

export function removeAttributes(obj: TypedValues, attributesToRemove: TypedValues) {
  if (
    !obj ||
    typeof obj !== 'object' ||
    !attributesToRemove ||
    typeof attributesToRemove !== 'object'
  ) {
    return {} // Return an empty object for invalid inputs
  }

  const newObj = { ...obj }

  for (const key in attributesToRemove) {
    if (key in newObj) {
      delete newObj[key]
    }
  }

  return newObj
}
