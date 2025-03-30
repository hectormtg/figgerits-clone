import { atom } from 'jotai'
import { CluesList, GAME_RESULT, TypedValues, Values } from '../types/game.type'

let lastValue = 1
export let lettersCount = 0

export function increaseLettersCount() {
  lettersCount++
}

export function decreaseLettersCount() {
  lettersCount--
}

export function getAvailableValue() {
  lastValue++
  return lastValue
}

export function resetLastValue() {
  lastValue = 1
}

export const phraseAtom = atom<string>('')
export const phraseWordsAtom = atom(get => get(phraseAtom).split(' '))
export const phraseCharsAtom = atom(get => get(phraseAtom).split(''))
export const selectedValueAtom = atom<number>(0)
export const typedValuesAtom = atom<TypedValues>({})
export const cluesAtom = atom<CluesList>([])
export const phraseValuesAtom = atom<Values>(get => {
  const phraseChars = get(phraseCharsAtom)
  const values: Values = {}
  for (const letter of phraseChars) {
    if (!values[letter] && letter !== ' ') {
      values[letter.toLowerCase()] = lastValue
      lastValue++
    }
  }
  return values
})
export const extraValuesAtom = atom<Values>({})
export const gameResultAtom = atom<GAME_RESULT>(GAME_RESULT.DEFAULT)
export const allLettersSet = atom(false)
