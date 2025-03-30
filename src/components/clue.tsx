import { Clue as ClueType } from '../types/game.type'
import Letter from './letter'

interface Props {
  clue: ClueType
}

const Clue = ({ clue }: Props) => {
  const { statement, answer } = clue

  const answerChars = answer.split('')

  return (
    <div className='flex flex-col gap-4 p-6'>
      <p>{statement}</p>

      <div className='flex flex-wrap text-2xl justify-center uppercase'>
        {answerChars.map((letter, index) => (
          <Letter
            letter={letter}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default Clue
