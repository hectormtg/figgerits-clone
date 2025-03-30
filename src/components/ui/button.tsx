import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Variant = 'filled' | 'outlined' | 'text' | unknown

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
}

const Button = ({ children, variant = 'filled', ...allProps }: Props) => {
  const { className, ...props } = allProps

  return (
    <button
      {...props}
      className={twMerge(
        'transition-colors',
        variant === 'filled' && 'bg-blue-500 text-white hover:bg-blue-600',
        variant === 'outlined' && 'border border-blue-500 text-blue-500 hover:bg-blue-100',
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
