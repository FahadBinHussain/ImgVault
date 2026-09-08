'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { motion, useAnimation } from 'motion/react'

const EASE = [0.4, 0, 0.2, 1]

export function useAnimatedIcon({ onMouseEnter, onMouseLeave } = {}) {
  const controls = useAnimation()
  const isControlledRef = useRef(false)

  const handleMouseEnter = (e) => {
    if (!isControlledRef.current) {
      controls.start('animate')
    } else {
      onMouseEnter?.(e)
    }
  }

  const handleMouseLeave = (e) => {
    if (!isControlledRef.current) {
      controls.start('normal')
    } else {
      onMouseLeave?.(e)
    }
  }

  const getImperativeHandle = () => {
    isControlledRef.current = true
    return {
      startAnimation: () => controls.start('animate'),
      stopAnimation: () => controls.start('normal'),
    }
  }

  return { controls, handleMouseEnter, handleMouseLeave, getImperativeHandle }
}

const svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function IconShell({ children, className, size = 28, onMouseEnter, onMouseLeave, ref, ...props }) {
  const { controls, handleMouseEnter, handleMouseLeave, getImperativeHandle } = useAnimatedIcon({
    onMouseEnter,
    onMouseLeave,
  })

  useImperativeHandle(ref, getImperativeHandle, [getImperativeHandle])

  return (
    <div className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
      <svg {...svgProps} width={size} height={size}>
        {children(controls)}
      </svg>
    </div>
  )
}

const boltVariants = {
  normal: { x: 0, y: 0, scale: 1, opacity: 1, transition: { duration: 0.3, ease: EASE } },
  animate: {
    x: [0, -1.5, 1.5, 0],
    y: [0, 1, -1, 0],
    scale: [1, 1.08, 0.95, 1],
    opacity: [1, 0.6, 1, 0.8, 1],
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

export const ZapIcon = forwardRef(function ZapIcon(props, ref) {
  return (
    <IconShell ref={ref} {...props}>
      {(controls) => (
        <motion.path
          d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
          animate={controls}
          variants={boltVariants}
        />
      )}
    </IconShell>
  )
})

const cloudVariants = {
  normal: { y: 0, transition: { duration: 0.3, ease: EASE } },
  animate: { y: [0, -1.5, 0], transition: { duration: 0.7, ease: 'easeInOut' } },
}

const dropVariants = {
  normal: { y: 0, opacity: 0, transition: { duration: 0.3, ease: EASE } },
  animate: {
    y: [-3, 5],
    opacity: [0, 1, 0],
    transition: { duration: 0.9, times: [0, 0.4, 1], ease: 'easeIn' },
  },
}

export const CloudIcon = forwardRef(function CloudIcon(props, ref) {
  return (
    <IconShell ref={ref} {...props}>
      {(controls) => (
        <>
          <motion.path
            d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
            animate={controls}
            variants={cloudVariants}
          />
          <motion.line x1="12" y1="19" x2="12" y2="22" animate={controls} variants={dropVariants} />
        </>
      )}
    </IconShell>
  )
})

const lensVariants = {
  normal: { x: 0, y: 0, transition: { duration: 0.3, ease: EASE } },
  animate: {
    x: [0, 1.5, 1.5, 0, 0, -1.5, -1.5, 0],
    y: [0, 0, 1.5, 1.5, 0, 0, -1.5, 0],
    transition: { duration: 0.9, ease: 'easeInOut' },
  },
}

export const SearchIcon = forwardRef(function SearchIcon(props, ref) {
  return (
    <IconShell ref={ref} {...props}>
      {(controls) => (
        <>
          <motion.circle cx="11" cy="11" r="8" animate={controls} variants={lensVariants} />
          <motion.line x1="21" y1="21" x2="16.65" y2="16.65" animate={controls} variants={lensVariants} />
        </>
      )}
    </IconShell>
  )
})

const shieldPath = 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'

const shieldVariants = {
  normal: { scale: 1, transition: { duration: 0.3, ease: EASE } },
  animate: { scale: [1, 1.1, 1], transition: { duration: 0.5, ease: EASE } },
}

const checkVariants = {
  normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3, ease: EASE } },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.5, delay: 0.1, ease: EASE },
  },
}

export const ShieldIcon = forwardRef(function ShieldIcon(props, ref) {
  return (
    <IconShell ref={ref} {...props}>
      {(controls) => (
        <>
          <motion.path d={shieldPath} animate={controls} variants={shieldVariants} />
          <motion.path d="m9 12 2 2 4-4" animate={controls} variants={checkVariants} />
        </>
      )}
    </IconShell>
  )
})

const chipCoreVariants = {
  normal: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: EASE } },
  animate: {
    scale: [1, 0.75, 1],
    opacity: [1, 0.5, 1],
    transition: { duration: 0.7, times: [0, 0.5, 1], ease: 'easeInOut' },
  },
}

export const CpuIcon = forwardRef(function CpuIcon(props, ref) {
  return (
    <IconShell ref={ref} {...props}>
      {(controls) => (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <motion.path d="M15 2v2" animate={controls} variants={chipCoreVariants} />
          <motion.path d="M15 20v2" animate={controls} variants={chipCoreVariants} />
          <motion.path d="M2 15h2" animate={controls} variants={chipCoreVariants} />
          <motion.path d="M20 15h2" animate={controls} variants={chipCoreVariants} />
          <motion.path d="M9 2v2" animate={controls} variants={chipCoreVariants} />
          <motion.path d="M9 20v2" animate={controls} variants={chipCoreVariants} />
          <motion.path d="M2 9h2" animate={controls} variants={chipCoreVariants} />
          <motion.path d="M20 9h2" animate={controls} variants={chipCoreVariants} />
        </>
      )}
    </IconShell>
  )
})

const shackleVariants = {
  normal: { x: 0, y: 0, rotate: 0, transition: { duration: 0.3, ease: EASE } },
  animate: {
    y: [0, -1.5, 0, 0],
    rotate: [0, -8, 6, 0],
    transition: { duration: 0.7, ease: 'easeInOut' },
  },
}

export const LockIcon = forwardRef(function LockIcon(props, ref) {
  return (
    <IconShell ref={ref} {...props}>
      {(controls) => (
        <>
          <motion.rect
            x="3"
            y="11"
            width="18"
            height="10"
            rx="2"
            ry="2"
            animate={controls}
            variants={{
              normal: { rotate: 0, transition: { duration: 0.3, ease: EASE } },
              animate: { rotate: [0, -3, 3, 0], transition: { duration: 0.7, ease: 'easeInOut' } },
            }}
          />
          <motion.path d="M7 11V7a5 5 0 0 1 10 0v4" animate={controls} variants={shackleVariants} />
          <motion.line x1="12" y1="15" x2="12" y2="17" animate={controls} variants={shackleVariants} />
        </>
      )}
    </IconShell>
  )
})
