import { GAME_RESULT } from '@/types/game.type'
import { useAtom, useAtomValue } from 'jotai'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  extraValuesAtom,
  gameResultAtom,
  getAvailableValue,
  phraseValuesAtom,
  selectedValueAtom,
  typedValuesAtom,
} from '../atoms/atoms'
import REG_EX from '../constants/regex'

interface Props {
  letter: string
}

const Letter = ({ letter }: Props) => {
  const [selectedValue, setSelectedValue] = useAtom(selectedValueAtom)
  const [typedValues, setTypedValues] = useAtom(typedValuesAtom)
  const values = useAtomValue(phraseValuesAtom)
  const [extraValues, setExtraValues] = useAtom(extraValuesAtom)
  const gameResult = useAtomValue(gameResultAtom)

  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const isValid = letter !== ' '
  const letterNumber = values[letter.toLowerCase()] || extraValues[letter.toLowerCase()]

  const inputRef = useRef<HTMLInputElement>(null)
  const prevValue = useRef('')

  useEffect(() => {
    assignValue()
  }, [])

  useEffect(() => {
    setInputValue(typedValues[letterNumber])
  }, [typedValues[letterNumber]])

  useEffect(() => {
    if (gameResult === GAME_RESULT.ERROR) {
      setInputValue('')
      prevValue.current = ''
    }
  }, [gameResult])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.at(-1) || ''
    if (REG_EX.LETTERS.test(value) || value === '') {
      setInputValue(value)
      prevValue.current = value
      setTypedValues(prev => {
        prev[letterNumber] = value
        return { ...prev }
      })
      inputRef.current?.blur()
    }
  }

  function toggleEditing() {
    setEditing(prev => !prev)
  }

  function handleClick() {
    if (!isValid) return
    toggleEditing()
    setSelectedValue(letterNumber)
    if (editing) {
      if (inputValue === '') {
        setInputValue(prevValue.current)
      }
      setSelectedValue(0)
    }
  }

  function assignValue() {
    if (isValid && !letterNumber && !values[letter] && !extraValues[letter]) {
      setExtraValues(prev => ({ ...prev, [letter.toLowerCase()]: getAvailableValue() }))
    }
  }

  return (
    <div
      className={twMerge(
        'p-2 rounded-md min-w-[43px] min-h-[56px] font-medium',
        isValid && 'border-2 border-transparent hover:border-green-300 cursor-pointer',
        editing || selectedValue === letterNumber
          ? 'border-green-600 hover:border-green-600 bg-green-100'
          : ''
      )}
      onClick={handleClick}
    >
      <div className='relative overflow-hidden min-h-[38px]'>
        {editing ? (
          <input
            value={inputValue}
            onChange={handleChange}
            onBlur={handleClick}
            ref={inputRef}
            type='text'
            autoFocus
          />
        ) : (
          typedValues[letterNumber]
        )}
      </div>

      {isValid && (
        <>
          <hr />

          <span className='text-sm'>{letterNumber}</span>
        </>
      )}
    </div>
  )
}

export default Letter
