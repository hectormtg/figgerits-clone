import { extraValuesAtom, phraseValuesAtom, typedValuesAtom } from '@/atoms/atoms'
import { OnChangeParams, Values } from '@/types/game.type'
import { useAtomValue } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import Letter from './letter'

interface Props {
  word: string
  index?: number
}

type EmptyLetters = Record<
  string,
  { hasValue: boolean; index: number; letter: string; letterNumber: number }
>

function getEmptyLetters(letters: Array<string>, values: Values) {
  const result: EmptyLetters = {}
  letters.forEach((_letter, index) => {
    const letter = _letter.toLowerCase()
    result[index] = {
      hasValue: false,
      index,
      letter,
      letterNumber: values[letter],
    }
  })
  return result
}

const Word = ({ word }: Props) => {
  const values = useAtomValue(phraseValuesAtom)
  const extraValues = useAtomValue(extraValuesAtom)
  const typedValues = useAtomValue(typedValuesAtom)

  const [nextIndex, setNextIndex] = useState<number | null>(null)

  const letters = word.split('')

  const emptyLetters = useRef<EmptyLetters>(getEmptyLetters(letters, { ...values, ...extraValues }))

  function handleChange({ letter, inputValue }: OnChangeParams) {
    Object.keys(emptyLetters.current).forEach(key => {
      if (emptyLetters.current[key].letter === letter.toLowerCase()) {
        emptyLetters.current[key].hasValue = inputValue !== ''
      }
    })
    const nextIndex = Object.values(emptyLetters.current).find(item => !item.hasValue)?.index
    setNextIndex(nextIndex ?? null)
  }

  useEffect(() => {
    Object.keys(emptyLetters.current).forEach(key => {
      const letterNumber = emptyLetters.current[key].letterNumber
      if (typedValues[letterNumber]) {
        emptyLetters.current[key].hasValue = true
      }
    })
  }, [typedValues])

  return (
    <div className='flex flex-shrink-0'>
      {letters.map((letter, index) => (
        <Letter
          letter={letter}
          key={index}
          index={index}
          onChange={handleChange}
          nextIndex={nextIndex}
        />
      ))}
    </div>
  )
}

export default Word
