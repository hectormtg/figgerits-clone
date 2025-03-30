import Letter from './letter'

interface Props {
  word: string
}

const Word = ({ word }: Props) => {
  const letters = word.split('')

  return (
    <div className='flex flex-shrink-0'>
      {letters.map((letter, index) => (
        <Letter
          letter={letter}
          key={index}
        />
      ))}
    </div>
  )
}

export default Word
