import { Clue as ClueType } from '../types/game.type'
import Word from './word'

interface Props {
  clue: ClueType
}

const Clue = ({ clue }: Props) => {
  const { statement, answer } = clue

  const answerWords = answer.split(' ')

  return (
    <div className='flex flex-col gap-4 p-6'>
      <p>{statement}</p>

      <div className='flex flex-wrap text-2xl justify-center uppercase'>
        {answerWords.map((word, index) => (
          <Word
            word={word}
            key={index}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default Clue
