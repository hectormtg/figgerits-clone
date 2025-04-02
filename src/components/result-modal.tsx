import { gameResultAtom, typedValuesAtom } from '@/atoms/atoms'
import { GAME_RESULT } from '@/types/game.type'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './ui/button'

interface Props {
  onClose?: () => void
  onClick: () => void
}

interface Data {
  text?: string
  buttonLabel?: string
  textClassName?: string
  animationSrc?: string
  buttonVariant?: string
  animationClassName?: string
  action?: () => void
}

type DataType = Record<GAME_RESULT, Data>

const ResultModal = ({ onClose, onClick }: Props) => {
  const setTypedValues = useSetAtom(typedValuesAtom)
  const gameResult = useAtomValue(gameResultAtom)

  const gameResultTrace = useRef(gameResult)

  useEffect(() => {
    setTimeout(() => {
      gameResultTrace.current = gameResult
    }, 250)
  }, [gameResult])

  const data: DataType = {
    [GAME_RESULT.ERROR]: {
      text: 'Tienes algunos errores',
      textClassName: 'text-red-600',
      action: handleReset,
      buttonLabel: 'Intentar de nuevo',
      animationSrc: 'https://lottie.host/c84c8acc-993d-4849-b563-469d70dc5020/57d1CtGS4u.lottie',
      buttonVariant: 'outlined',
      animationClassName: '-mt-6',
    },
    [GAME_RESULT.WIN]: {
      text: '¡Ganaste!',
      action: handleNewGame,
      buttonLabel: 'Juego nuevo',
      animationSrc: 'https://lottie.host/9ec57c45-ae1b-4e64-9e37-3420dae64f47/SJa62H2x94.lottie',
    },
    [GAME_RESULT.DEFAULT]: {},
  }

  const {
    text,
    textClassName,
    action,
    buttonLabel,
    animationSrc,
    buttonVariant,
    animationClassName,
  } = data[gameResultTrace.current]

  function handleNewGame() {
    onClose?.()
    onClick()
    setTypedValues({})
  }

  function handleReset() {
    onClose?.()
    setTypedValues({})
  }

  return (
    <div className='flex flex-col gap-4 items-center'>
      <span className={twMerge('font-medium text-2xl', textClassName)}>{text}</span>
      <DotLottieReact
        src={animationSrc}
        autoplay
        className={animationClassName}
      />
      <Button
        onClick={action}
        variant={buttonVariant}
      >
        {buttonLabel}
      </Button>
    </div>
  )
}

export default ResultModal
