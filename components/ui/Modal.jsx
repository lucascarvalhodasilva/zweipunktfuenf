'use client'

import { useEffect, useRef } from 'react'

export default function Modal({ isOpen, onClose, children }) {
  const dialogRef = useRef(null)
  const previousActiveElementRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return () => {}
    }

    previousActiveElementRef.current = document.activeElement

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') {
        return
      }

      event.preventDefault()
      onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    dialogRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      if (
        previousActiveElementRef.current &&
        typeof previousActiveElementRef.current.focus === 'function'
      ) {
        previousActiveElementRef.current.focus()
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-5 py-10"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[rgba(10,10,10,0.72)] backdrop-blur-sm" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className="relative z-10 w-full max-w-lg rounded-[28px] border border-[var(--color-border)] bg-[rgba(10,10,10,0.94)] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] outline-none md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
