import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { fetchGameData } from './ai'
import './App.css'
import {
  cluesAtom,
  extraValuesAtom,
  gameResultAtom,
  phraseAtom,
  phraseValuesAtom,
  phraseWordsAtom,
  resetLastValue,
  typedValuesAtom,
} from './atoms/atoms'
import Clue from './components/clue'
import ResultModal from './components/result-modal'
import MainLoader from './components/ui/main-loader'
import Modal from './components/ui/modal'
import Word from './components/word'
import { objectsMatchExact, removeAttributes, reverseObject } from './helpers/helpers'
import { GAME_RESULT } from './types/game.type'

let fetched = false

function App() {
  const typedValues = useAtomValue(typedValuesAtom)
  const setPhrase = useSetAtom(phraseAtom)
  const phraseWords = useAtomValue(phraseWordsAtom)
  const values = useAtomValue(phraseValuesAtom)
  const [clues, setClues] = useAtom(cluesAtom)
  const [gameResult, setGameResult] = useAtom(gameResultAtom)
  const extraValues = useAtomValue(extraValuesAtom)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (fetched) return
    getInitData()
    fetched = true
  }, [])

  useEffect(() => {
    const reversed = reverseObject(extraValues)
    const validValues = removeAttributes(typedValues, reversed)
    const gameResult = objectsMatchExact(values, validValues)
    setGameResult(gameResult)
  }, [typedValues])

  async function getInitData() {
    try {
      resetLastValue()
      setLoading(true)
      const { phrase, clues } = await fetchGameData()
      setPhrase(phrase)
      setClues(clues)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  if (loading)
    return (
      <main className='h-svh flex items-center justify-center'>
        <MainLoader title='Generating content' />
      </main>
    )

  return (
    <>
      <main className='flex flex-col h-svh bg-yellow-50'>
        <section className='stamp top-shadow'>
          <section className='flex flex-wrap text-2xl gap-x-10 gap-y-2 justify-center uppercase max-h-[40vh] overflow-auto flex-shrink-0 p-10 bg-white'>
            {phraseWords.map((word, index) => (
              <Word
                word={word}
                key={index}
              />
            ))}
          </section>
        </section>

        <section className='flex flex-col overflow-auto p-10 divide-y-2'>
          {clues.map(clue => (
            <Clue
              clue={clue}
              key={clue.index}
            />
          ))}
        </section>
      </main>

      <Modal open={gameResult === GAME_RESULT.WIN || gameResult === GAME_RESULT.ERROR}>
        <ResultModal onClick={getInitData} />
      </Modal>
    </>
  )
}

export default App
