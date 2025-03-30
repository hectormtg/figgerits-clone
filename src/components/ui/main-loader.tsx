import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface Props {
  title?: string
}

const MainLoader = ({ title }: Props) => {
  return (
    <div>
      <DotLottieReact
        src='https://lottie.host/f0304076-29ec-429c-b25d-00ae0446486b/KQuMcCMih9.lottie'
        loop
        autoplay
        className='-mt-32 h-auto w-[500px]'
      />

      {title && <span className='font-medium text-xl'>{title}</span>}
    </div>
  )
}

export default MainLoader
