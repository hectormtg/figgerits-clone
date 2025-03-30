import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'

interface ModalProps {
  open: boolean
  onClose?: () => void
  title?: string
  children: ReactNode
  className?: string
  backdropClassName?: string
}

const Modal = ({ open, onClose, title, children, className, backdropClassName }: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Handle mounting/unmounting and visibility
  useEffect(() => {
    setIsMounted(true)

    // When open changes, update visibility with a slight delay for exit animations
    if (open) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300) // Match this with your animation duration
      return () => clearTimeout(timer)
    }
  }, [open])

  // Handle escape key and scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [open, onClose])

  // Handle focus trap
  useEffect(() => {
    if (!open) return

    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => {
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [open])

  // Don't render on server
  if (!isMounted) return null

  // Don't render anything if not visible
  if (!isVisible && !open) return null

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300',
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Backdrop with blur effect - only visible when modal is open */}
      <div
        className={cn(
          'fixed inset-0 transition-all duration-300',
          open ? 'backdrop-blur-md bg-black/40' : 'backdrop-blur-none bg-black/0',
          backdropClassName
        )}
        onClick={onClose}
        aria-hidden='true'
      />

      {/* Modal */}
      <div
        className={cn(
          'relative z-50 max-h-[90vh] w-[90vw] max-w-md overflow-auto rounded-lg border bg-background p-6 shadow-lg transition-all duration-300',
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          className
        )}
        role='dialog'
        aria-modal='true'
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        <div
          className={twMerge(
            'flex items-center justify-between',
            !title && 'flex-row-reverse',
            !!title && !!onClose && 'mb-4'
          )}
        >
          {title && (
            <h2
              className='text-lg font-semibold'
              id='modal-title'
            >
              {title}
            </h2>
          )}
          {!!onClose && (
            <button
              onClick={onClose}
              className='rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors'
              aria-label='Close modal'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
