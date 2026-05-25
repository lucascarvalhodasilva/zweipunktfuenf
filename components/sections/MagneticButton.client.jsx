'use client'

import { useRef } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

import Button from '@/components/ui/Button'

export default function MagneticButton({ children, href, buttonClassName }) {
  const prefersReducedMotion = useReducedMotion()
  const buttonRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (event) => {
    if (prefersReducedMotion || !buttonRef.current) {
      return
    }

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = event.clientX - centerX
    const distY = event.clientY - centerY
    const dist = Math.sqrt(distX ** 2 + distY ** 2)

    if (dist < 80) {
      x.set(distX * 0.25)
      y.set(distY * 0.25)
      return
    }

    x.set(0)
    y.set(0)
  }

  const handleMouseLeave = () => {
    if (prefersReducedMotion) {
      return
    }

    x.set(0)
    y.set(0)
  }

  const handleClick = () => {
    if (prefersReducedMotion || !buttonRef.current) {
      return
    }

    animate(
      buttonRef.current,
      { scale: [1, 0.94, 1] },
      {
        duration: 0.2,
        ease: 'easeInOut',
      },
    )
  }

  return (
    <motion.div
      ref={buttonRef}
      className="inline-flex"
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      onClick={prefersReducedMotion ? undefined : handleClick}
      onMouseLeave={prefersReducedMotion ? undefined : handleMouseLeave}
      onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
    >
      <Button href={href} variant="primary" className={buttonClassName}>
        {children}
      </Button>
    </motion.div>
  )
}
