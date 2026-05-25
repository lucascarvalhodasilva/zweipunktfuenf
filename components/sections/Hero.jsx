'use client'

import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

import Button from '@/components/ui/Button'
import HeroButtonGroup from '@/components/ui/HeroButtonGroup'

// [3] MAGNETIC BUTTON
function MagneticButton({
  children,
  href,
  prefersReducedMotion,
  buttonClassName,
}) {
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
      }
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

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const gameApiRef = useRef({
    startGame: () => {},
    pauseGame: () => {},
  })
  const [gameStatus, setGameStatus] = useState('idle')
  const [score, setScore] = useState(0)
  const [highScores, setHighScores] = useState([0, 0, 0])
  const isGameForeground = gameStatus !== 'idle'
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const heroGlowOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.18])
  const heroGlowShift = useTransform(scrollYProgress, [0, 0.7], [0, 48])
  const heroBlendOpacity = useTransform(scrollYProgress, [0, 0.6], [0.2, 1])
  const contentTargetY = useTransform(scrollYProgress, [0.1, 0.8], [0, 12])
  const contentY = useSpring(contentTargetY, {
    stiffness: 90,
    damping: 20,
    mass: 0.8,
  })
  const contentTargetOpacity = useTransform(scrollYProgress, [0.2, 0.85], [1, 0.92])
  const contentOpacity = useSpring(contentTargetOpacity, {
    stiffness: 120,
    damping: 24,
    mass: 0.7,
  })
  const effectiveContentOpacity = useTransform(contentOpacity, (value) =>
    value * (gameStatus === 'running' ? 0.62 : 1)
  )

  useEffect(() => {
    const storedHighScores = window.localStorage.getItem('hero-snake-highscores')

    if (!storedHighScores) {
      return
    }

    try {
      const parsedHighScores = JSON.parse(storedHighScores)

      if (Array.isArray(parsedHighScores) && parsedHighScores.length > 0) {
        setHighScores(parsedHighScores.slice(0, 3))
      }
    } catch {
      window.localStorage.removeItem('hero-snake-highscores')
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    window.localStorage.setItem(
      'hero-snake-highscores',
      JSON.stringify(highScores)
    )
  }, [highScores])

  // [2] STAGGER REVEAL
  const containerVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0, delayChildren: 0 },
        },
      }
    : {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: 0 },
        },
      }

  const itemVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0 },
        },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
        },
      }

  // [1] CANVAS GRID GLOW
  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current

    if (!section || !canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return undefined
    }

    let cellWidth = 36
    let cellHeight = 36
    const gridLineWidth = 1
    let frameId = 0
    let lastStepTime = 0
    let width = 0
    let height = 0
    let columns = 0
    let rows = 0
    let started = false
    let paused = false
    let gameOver = false
    let direction = { x: 1, y: 0 }
    let pendingDirection = { x: 1, y: 0 }
    let heldDirectionKey = null
    let snake = []
    let food = null
    let currentScore = 0
    let hasPointer = false
    let pointerX = 0
    let pointerY = 0
    let hasInitialized = false
    let isVisible = true
    let loopRunning = false
    let singleFrameId = 0
    let isIntersecting = true
    let isTabVisible = true

    const SNAPSHOT_KEY = 'hero-snake-snapshot'
    const SNAPSHOT_VERSION = 1

    const stepDuration = 120
    const acceleratedStepDuration = 75
    const gravityRadius = 160

    // Mobile scroll-driven snake state
    let isMobileMode = false
    let scrollAccumulator = 0
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0
    const scrollPixelsPerStep = 60

    const isSameCell = (leftCell, rightCell) =>
      leftCell.column === rightCell.column && leftCell.row === rightCell.row

    const directionToKey = (nextDirection) => {
      if (nextDirection.x === 1) {
        return 'd'
      }

      if (nextDirection.x === -1) {
        return 'a'
      }

      if (nextDirection.y === 1) {
        return 's'
      }

      return 'w'
    }

    const saveGameSnapshot = () => {
      try {
        const snapshot = {
          version: SNAPSHOT_VERSION,
          timestamp: Date.now(),
          gameStatus: 'paused',
          score: currentScore,
          snake,
          food,
          direction,
          pendingDirection,
          columns,
          rows,
        }

        window.localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshot))
      } catch {
        // Ignore storage errors
      }
    }

    const clearGameSnapshot = () => {
      window.localStorage.removeItem(SNAPSHOT_KEY)
    }

    const tryRestoreSnapshot = () => {
      const stored = window.localStorage.getItem(SNAPSHOT_KEY)

      if (!stored) {
        return false
      }

      try {
        const snapshot = JSON.parse(stored)

        const isValidDirection = (dir) =>
          dir &&
          typeof dir.x === 'number' &&
          typeof dir.y === 'number' &&
          [-1, 0, 1].includes(dir.x) &&
          [-1, 0, 1].includes(dir.y)

        const isValidCell = (cell) =>
          cell &&
          typeof cell.column === 'number' &&
          typeof cell.row === 'number' &&
          cell.column >= 0 &&
          cell.column < columns &&
          cell.row >= 0 &&
          cell.row < rows

        if (
          !snapshot ||
          snapshot.version !== SNAPSHOT_VERSION ||
          snapshot.gameStatus !== 'paused' ||
          snapshot.columns !== columns ||
          snapshot.rows !== rows ||
          !Array.isArray(snapshot.snake) ||
          snapshot.snake.length === 0 ||
          typeof snapshot.score !== 'number' ||
          !isValidDirection(snapshot.direction) ||
          !isValidDirection(snapshot.pendingDirection) ||
          !snapshot.snake.every(isValidCell) ||
          !isValidCell(snapshot.food)
        ) {
          clearGameSnapshot()

          return false
        }

        snake = snapshot.snake
        food = snapshot.food
        direction = snapshot.direction
        pendingDirection = snapshot.pendingDirection
        currentScore = snapshot.score
        started = true
        paused = true
        gameOver = false
        setScore(snapshot.score)
        setGameStatus('paused')

        return true
      } catch {
        clearGameSnapshot()

        return false
      }
    }

    const createInitialSnake = () => {
      const centerColumn = Math.max(2, Math.floor(columns / 2))
      const centerRow = Math.max(2, Math.floor(rows / 2))

      return [
        { column: centerColumn, row: centerRow },
        { column: centerColumn - 1, row: centerRow },
        { column: centerColumn - 2, row: centerRow },
      ]
    }

    const spawnFood = (occupiedSnake) => {
      const openCells = []

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const cell = { column, row }

          if (occupiedSnake.some((segment) => isSameCell(segment, cell))) {
            continue
          }

          openCells.push(cell)
        }
      }

      if (openCells.length === 0) {
        return null
      }

      return openCells[Math.floor(Math.random() * openCells.length)]
    }

    const getDirectionTowardFood = () => {
      if (!food || snake.length === 0) {
        return direction
      }

      const head = snake[0]
      const deltaColumn = food.column - head.column
      const deltaRow = food.row - head.row

      const candidates = []

      if (deltaColumn > 0) candidates.push({ x: 1, y: 0 })
      if (deltaColumn < 0) candidates.push({ x: -1, y: 0 })
      if (deltaRow > 0) candidates.push({ x: 0, y: 1 })
      if (deltaRow < 0) candidates.push({ x: 0, y: -1 })

      if (candidates.length === 0) {
        candidates.push(direction)
      }

      for (const candidate of candidates) {
        const isReverse =
          snake.length > 1 &&
          candidate.x === -direction.x &&
          candidate.y === -direction.y

        if (isReverse) {
          continue
        }

        const nextHead = {
          column: head.column + candidate.x,
          row: head.row + candidate.y,
        }

        const hitWall =
          nextHead.column < 0 ||
          nextHead.column >= columns ||
          nextHead.row < 0 ||
          nextHead.row >= rows

        const hitSelf = snake.some((segment) => isSameCell(segment, nextHead))

        if (!hitWall && !hitSelf) {
          return candidate
        }
      }

      return direction
    }

    const stepMobileSnake = () => {
      if (snake.length === 0 || !food) {
        return
      }

      direction = getDirectionTowardFood()
      pendingDirection = direction

      const nextHead = {
        column: snake[0].column + direction.x,
        row: snake[0].row + direction.y,
      }

      const hitWall =
        nextHead.column < 0 ||
        nextHead.column >= columns ||
        nextHead.row < 0 ||
        nextHead.row >= rows

      const hitSelf = snake.some((segment) => isSameCell(segment, nextHead))

      if (hitWall || hitSelf) {
        snake = createInitialSnake()
        direction = { x: 1, y: 0 }
        pendingDirection = { x: 1, y: 0 }
        food = spawnFood(snake)
        return
      }

      snake = [nextHead, ...snake]

      if (isSameCell(nextHead, food)) {
        food = spawnFood(snake)
        return
      }

      snake.pop()
    }

    const resetGame = () => {
      snake = createInitialSnake()
      direction = { x: 1, y: 0 }
      pendingDirection = { x: 1, y: 0 }
      heldDirectionKey = null
      food = spawnFood(snake)
      currentScore = 0
      paused = false
      gameOver = false
      lastStepTime = 0
      setScore(0)
    }

    const updateHighScores = (nextScore) => {
      setHighScores((previousHighScores) => {
        const nextHighScores = [...previousHighScores, nextScore]
          .sort((leftScore, rightScore) => rightScore - leftScore)
          .slice(0, 3)

        return nextHighScores
      })
    }

    const isGravityActive = () =>
      !prefersReducedMotion && hasPointer && !gameOver && (!started || paused)

    const isGameRunning = () => started && !paused && !gameOver

    const needsContinuousLoop = () => isVisible && isGameRunning()

    const requestSingleFrame = () => {
      if (loopRunning || !isVisible) {
        return
      }

      window.cancelAnimationFrame(singleFrameId)
      singleFrameId = window.requestAnimationFrame(() => {
        singleFrameId = 0
        renderGame()
      })
    }

    const startLoop = () => {
      if (loopRunning) {
        return
      }

      loopRunning = true
      window.cancelAnimationFrame(singleFrameId)
      singleFrameId = 0

      const tick = (now) => {
        if (!needsContinuousLoop()) {
          loopRunning = false
          renderGame()
          return
        }

        if (!isMobileMode) {
          const currentStepDuration =
            heldDirectionKey && heldDirectionKey === directionToKey(direction)
              ? acceleratedStepDuration
              : stepDuration

          if (now - lastStepTime >= currentStepDuration) {
            stepGame()
            lastStepTime = now
          }
        }

        renderGame()
        frameId = window.requestAnimationFrame(tick)
      }

      frameId = window.requestAnimationFrame(tick)
    }

    const stopLoop = () => {
      loopRunning = false
      window.cancelAnimationFrame(frameId)
      window.cancelAnimationFrame(singleFrameId)
      frameId = 0
      singleFrameId = 0
    }

    const ensureCorrectLoopState = () => {
      if (needsContinuousLoop()) {
        startLoop()
      } else if (loopRunning) {
        stopLoop()
        renderGame()
      }
    }

    const getCellRect = (cell, offsetX = 0, offsetY = 0) => ({
      x: cell.column * cellWidth + gridLineWidth + offsetX,
      y: cell.row * cellHeight + gridLineWidth + offsetY,
      width: Math.max(0, cellWidth - gridLineWidth),
      height: Math.max(0, cellHeight - gridLineWidth),
    })

    const getGravityDisplacementAtPoint = (pointX, pointY) => {
      if (!isGravityActive()) {
        return { offsetX: 0, offsetY: 0, influence: 0 }
      }

      const deltaX = pointerX - pointX
      const deltaY = pointerY - pointY
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

      if (distance === 0 || distance > gravityRadius) {
        return { offsetX: 0, offsetY: 0, influence: 0 }
      }

      const influence = 1 - distance / gravityRadius
      const maxOffset = Math.min(cellWidth, cellHeight) * 0.18
      const pull = influence * maxOffset

      return {
        offsetX: (deltaX / distance) * pull,
        offsetY: (deltaY / distance) * pull,
        influence,
      }
    }

    const getGravityOffset = (cell) => {
      const centerX = cell.column * cellWidth + cellWidth / 2
      const centerY = cell.row * cellHeight + cellHeight / 2

      return getGravityDisplacementAtPoint(centerX, centerY)
    }

    const drawCell = (cell, fillStyle, offsetX = 0, offsetY = 0) => {
      const cellRect = getCellRect(cell, offsetX, offsetY)

      context.fillStyle = fillStyle
      context.fillRect(cellRect.x, cellRect.y, cellRect.width, cellRect.height)
    }

    const drawBaseGrid = () => {
      context.save()
      context.strokeStyle = 'rgba(245, 242, 235, 0.03)'
      context.lineWidth = 1

      for (let column = 0; column <= columns; column += 1) {
        const x = Math.min(width, column * cellWidth) + 0.5

        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x, height)
        context.stroke()
      }

      for (let row = 0; row <= rows; row += 1) {
        const y = Math.min(height, row * cellHeight) + 0.5

        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(width, y)
        context.stroke()
      }

      context.restore()
    }

    const drawGravityField = () => {
      if (!isGravityActive()) {
        return
      }

      const radiusInColumns = Math.max(3, Math.ceil(gravityRadius / cellWidth))
      const radiusInRows = Math.max(3, Math.ceil(gravityRadius / cellHeight))
      const centerColumn = Math.floor(pointerX / cellWidth)
      const centerRow = Math.floor(pointerY / cellHeight)

      const minColumn = Math.max(0, centerColumn - radiusInColumns)
      const maxColumn = Math.min(columns, centerColumn + radiusInColumns + 1)
      const minRow = Math.max(0, centerRow - radiusInRows)
      const maxRow = Math.min(rows, centerRow + radiusInRows + 1)

      const createPoint = (column, row) => {
        const baseX = column * cellWidth
        const baseY = row * cellHeight
        const { offsetX, offsetY, influence } = getGravityDisplacementAtPoint(
          baseX,
          baseY
        )

        return {
          x: baseX + offsetX,
          y: baseY + offsetY,
          influence,
        }
      }

      const drawCurve = (points) => {
        if (points.length < 2) {
          return
        }

        context.beginPath()
        context.moveTo(points[0].x, points[0].y)

        for (let index = 1; index < points.length; index += 1) {
          const previousPoint = points[index - 1]
          const currentPoint = points[index]
          const controlX = previousPoint.x
          const controlY = previousPoint.y
          const targetX = (previousPoint.x + currentPoint.x) / 2
          const targetY = (previousPoint.y + currentPoint.y) / 2

          context.quadraticCurveTo(controlX, controlY, targetX, targetY)
        }

        const lastPoint = points[points.length - 1]
        context.lineTo(lastPoint.x, lastPoint.y)
        context.stroke()
      }

      context.save()
      context.strokeStyle = 'rgba(245, 242, 235, 0.03)'
      context.lineWidth = 1

      for (let row = minRow; row <= maxRow; row += 1) {
        const points = []

        for (let column = minColumn; column <= maxColumn; column += 1) {
          const point = createPoint(column, row)

          if (point.influence > 0 || points.length > 0) {
            points.push(point)
          }
        }

        drawCurve(points)
      }

      for (let column = minColumn; column <= maxColumn; column += 1) {
        const points = []

        for (let row = minRow; row <= maxRow; row += 1) {
          const point = createPoint(column, row)

          if (point.influence > 0 || points.length > 0) {
            points.push(point)
          }
        }

        drawCurve(points)
      }

      context.restore()
    }

    const drawInstruction = (message, subMessage) => {
      context.save()
      context.fillStyle = 'rgba(10, 10, 10, 0.72)'
      context.fillRect(20, height - 88, 280, 60)
      context.font = "12px 'Space Mono', monospace"
      context.fillStyle = 'rgba(200, 255, 0, 0.95)'
      context.fillText(message, 36, height - 54)
      context.fillStyle = 'rgba(245, 242, 235, 0.68)'
      context.fillText(subMessage, 36, height - 34)
      context.restore()
    }

    const renderGame = () => {
      context.clearRect(0, 0, width, height)

      drawBaseGrid()
      drawGravityField()

      if (food) {
        const { offsetX, offsetY } = getGravityOffset(food)
        drawCell(food, 'rgba(247, 147, 26, 0.9)', offsetX, offsetY)
      }

      snake.forEach((segment, index) => {
        const fillStyle =
          index === 0 ? 'rgba(200, 255, 0, 0.95)' : 'rgba(200, 255, 0, 0.28)'
        const { offsetX, offsetY } = getGravityOffset(segment)
        drawCell(segment, fillStyle, offsetX, offsetY)
      })

      const shouldShowGameInstructions = width >= 1024

      if (shouldShowGameInstructions) {
        if (!started) {
          drawInstruction('Start im Menue', 'Danach steuerst du mit WASD.')
        } else if (paused) {
          drawInstruction('Pausiert', 'Weiter im Menue oder per WASD.')
        } else if (!gameOver) {
          drawInstruction('Snake aktiv', 'Pause mit Taste P.')
        } else if (gameOver) {
          drawInstruction('Game Over', 'Starte im Menue eine neue Runde.')
        }
      }
    }

    const stepGame = () => {
      direction = pendingDirection

      const nextHead = {
        column: snake[0].column + direction.x,
        row: snake[0].row + direction.y,
      }

      const hitWall =
        nextHead.column < 0 ||
        nextHead.column >= columns ||
        nextHead.row < 0 ||
        nextHead.row >= rows

      const hitSelf = snake.some((segment) => isSameCell(segment, nextHead))

      if (hitWall || hitSelf) {
        gameOver = true
        started = false
        paused = false
        setGameStatus('game-over')
        updateHighScores(currentScore)
        clearGameSnapshot()
        return
      }

      snake = [nextHead, ...snake]

      if (food && isSameCell(nextHead, food)) {
        currentScore += 1
        setScore(currentScore)
        food = spawnFood(snake)
        return
      }

      snake.pop()
    }

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase()

      if (key === 'p') {
        if (!started || gameOver) {
          return
        }

        paused = !paused
        setGameStatus(paused ? 'paused' : 'running')

        if (paused) {
          saveGameSnapshot()
        } else {
          clearGameSnapshot()
        }

        ensureCorrectLoopState()
        event.preventDefault()
        return
      }

      const nextDirectionMap = {
        w: { x: 0, y: -1 },
        a: { x: -1, y: 0 },
        s: { x: 0, y: 1 },
        d: { x: 1, y: 0 },
      }
      const nextDirection = nextDirectionMap[key]

      if (!nextDirection) {
        return
      }

      if (!started || gameOver) {
        return
      }

      const isReverse =
        snake.length > 1 &&
        nextDirection.x === -direction.x &&
        nextDirection.y === -direction.y

      if (isReverse) {
        return
      }

      heldDirectionKey = key
      pendingDirection = nextDirection

      if (paused) {
        paused = false
        setGameStatus('running')
        clearGameSnapshot()
        ensureCorrectLoopState()
      }

      event.preventDefault()
    }

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase()

      if (heldDirectionKey === key) {
        heldDirectionKey = null
      }
    }

    const startGame = () => {
      if (gameOver || !started) {
        resetGame()
      }

      started = true
      paused = false
      gameOver = false
      clearGameSnapshot()
      setGameStatus('running')
      ensureCorrectLoopState()
    }

    const pauseGame = () => {
      if (!started) {
        return
      }

      paused = !paused
      setGameStatus(paused ? 'paused' : 'running')

      if (paused) {
        saveGameSnapshot()
      } else {
        clearGameSnapshot()
      }

      ensureCorrectLoopState()
    }

    const pauseGameOnScroll = () => {
      if (isMobileMode) {
        const currentScrollY = window.scrollY
        const delta = currentScrollY - lastScrollY
        lastScrollY = currentScrollY

        scrollAccumulator += Math.abs(delta)

        while (scrollAccumulator >= scrollPixelsPerStep) {
          scrollAccumulator -= scrollPixelsPerStep
          stepMobileSnake()
        }

        requestSingleFrame()
        return
      }

      if (!started || paused || gameOver) {
        return
      }

      paused = true
      setGameStatus('paused')
      saveGameSnapshot()
      ensureCorrectLoopState()
    }

    const handlePointerMove = (event) => {
      const rect = section.getBoundingClientRect()

      hasPointer = true
      pointerX = event.clientX - rect.left
      pointerY = event.clientY - rect.top
      requestSingleFrame()
    }

    const handlePointerLeave = () => {
      hasPointer = false
      requestSingleFrame()
    }

    const resizeCanvas = () => {
      const nextWidth = section.clientWidth
      const nextHeight = section.clientHeight
      const dpr = window.devicePixelRatio || 1
      const targetCellSize = 36

      width = nextWidth
      height = nextHeight
      columns = Math.max(1, Math.round(width / targetCellSize))
      rows = Math.max(1, Math.round(height / targetCellSize))
      cellWidth = width / columns
      cellHeight = height / rows

      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      section.style.setProperty('--surface-grid-cell-width', `${cellWidth}px`)
      section.style.setProperty('--surface-grid-cell-height', `${cellHeight}px`)

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      resetGame()

      isMobileMode = nextWidth < 1024

      if (isMobileMode) {
        started = false
        paused = false
        lastScrollY = window.scrollY
        scrollAccumulator = 0
        setGameStatus('idle')
      } else {
        started = false
        paused = false
        setGameStatus('idle')
      }

      renderGame()
    }

    resizeCanvas()

    if (!hasInitialized) {
      hasInitialized = true

      if (tryRestoreSnapshot()) {
        renderGame()
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
    })

    resizeObserver.observe(section)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('scroll', pauseGameOnScroll, { passive: true })
    section.addEventListener('pointermove', handlePointerMove)
    section.addEventListener('pointerleave', handlePointerLeave)
    gameApiRef.current = { startGame, pauseGame }

    // Visibility tracking: IntersectionObserver + visibilitychange
    const updateVisibility = () => {
      const wasVisible = isVisible
      isVisible = isIntersecting && isTabVisible

      if (isVisible && !wasVisible) {
        ensureCorrectLoopState()

        if (!loopRunning) {
          requestSingleFrame()
        }
      } else if (!isVisible && wasVisible) {
        stopLoop()
      }
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting
        updateVisibility()
      },
      { threshold: 0 }
    )

    intersectionObserver.observe(section)

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState !== 'hidden'
      updateVisibility()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Start the loop only if the game is actively running; otherwise render a single frame
    ensureCorrectLoopState()

    if (!loopRunning) {
      requestSingleFrame()
    }

    return () => {
      stopLoop()
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('scroll', pauseGameOnScroll)
      section.removeEventListener('pointermove', handlePointerMove)
      section.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      section.style.removeProperty('--surface-grid-cell-width')
      section.style.removeProperty('--surface-grid-cell-height')
      gameApiRef.current = {
        startGame: () => {},
        pauseGame: () => {},
      }
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative z-0 h-screen"
    >
      <div
        className="surface-grid surface-grid-canvas fixed inset-x-0 top-0 z-0 isolate h-screen w-full overflow-hidden"
      >
        <motion.canvas
          ref={canvasRef}
          className={`pointer-events-none absolute inset-0 ${
            isGameForeground ? 'z-[3]' : 'z-[1]'
          }`}
        />
        <div>
          <HeroButtonGroup
            gameStatus={gameStatus}
            score={score}
            highScores={highScores}
            onStartGame={() => gameApiRef.current.startGame()}
            onPauseGame={() => gameApiRef.current.pauseGame()}
            scrollYProgress={scrollYProgress}
          />
        </div>
        <motion.div
          className="absolute left-[8%] top-20 h-40 w-40 rounded-full border border-[rgba(200,255,0,0.35)] bg-[rgba(200,255,0,0.08)] blur-3xl"
          style={
            prefersReducedMotion
              ? undefined
              : { opacity: heroGlowOpacity, y: heroGlowShift }
          }
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent via-[rgba(10,10,10,0.45)] to-[rgba(26,26,26,0.98)]"
          style={prefersReducedMotion ? undefined : { opacity: heroBlendOpacity }}
        />
        <motion.div
          className="relative z-[2] mx-auto flex h-full max-w-7xl flex-col justify-center gap-10 px-5 py-20 md:px-8 md:py-28"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={
            prefersReducedMotion
              ? undefined
              : { y: contentY, opacity: effectiveContentOpacity }
          }
        >
          <div className="max-w-5xl space-y-6 sm:space-y-6">
            <motion.div variants={itemVariants}>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)] sm:text-xs sm:tracking-[0.35em] md:text-sm">
                Ihre Webseite verdient ein Upgrade
              </p>
            </motion.div>
            <h1 className="text-[2.75rem] font-black leading-[0.92] tracking-[-0.04em] min-[375px]:text-[3.25rem] min-[480px]:text-6xl md:text-7xl lg:text-[6.5rem]">
              <motion.div variants={itemVariants}>
                <span className="block">Wir bauen</span>
              </motion.div>
              <motion.div variants={itemVariants}>
                <span className="block text-outline">Webseiten</span>
              </motion.div>
              <motion.div variants={itemVariants}>
                <span className="block">die funktionieren.</span>
              </motion.div>
            </h1>
            <motion.div variants={itemVariants}>
              <p className="max-w-2xl font-mono text-sm leading-6 text-[var(--color-text)]/72 sm:leading-7 md:text-base">
                <span className="block">Design. Chatbots. Crypto-Payment.</span>
                <span className="block">Keine Buzzwords — nur Ergebnisse.</span>
              </p>
            </motion.div>
          </div>
          <motion.div variants={itemVariants}>
            <div className="flex w-full max-w-xl flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:gap-4">
              <MagneticButton
                href="#services"
                prefersReducedMotion={prefersReducedMotion}
                buttonClassName="w-full sm:w-auto"
              >
                Leistungen ansehen
              </MagneticButton>
              <Button href="#kontakt" variant="ghost" className="w-full sm:w-auto">
                Unverbindlich anfragen
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
