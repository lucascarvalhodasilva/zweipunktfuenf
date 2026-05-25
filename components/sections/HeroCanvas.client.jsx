'use client'

import { useEffect } from 'react'

export default function HeroCanvas({
  sectionRef,
  canvasRef,
  gameApiRef,
  setGameStatus,
  setScore,
  setHighScores,
  prefersReducedMotion,
  highScores,
}) {
  useEffect(() => {
    const storedHighScores = window.localStorage.getItem(
      'hero-snake-highscores',
    )

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
  }, [prefersReducedMotion, setHighScores])

  useEffect(() => {
    window.localStorage.setItem(
      'hero-snake-highscores',
      JSON.stringify(highScores),
    )
  }, [highScores])

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
          baseY,
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

        return
      }

      if (!started || paused || gameOver) {
        return
      }

      paused = true
      setGameStatus('paused')
      saveGameSnapshot()
    }

    const handlePointerMove = (event) => {
      const rect = section.getBoundingClientRect()

      hasPointer = true
      pointerX = event.clientX - rect.left
      pointerY = event.clientY - rect.top
    }

    const handlePointerLeave = () => {
      hasPointer = false
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

    const render = (now) => {
      if (!isMobileMode) {
        const currentStepDuration =
          heldDirectionKey && heldDirectionKey === directionToKey(direction)
            ? acceleratedStepDuration
            : stepDuration

        if (
          started &&
          !paused &&
          !gameOver &&
          now - lastStepTime >= currentStepDuration
        ) {
          stepGame()
          lastStepTime = now
        }
      }

      renderGame()

      frameId = window.requestAnimationFrame(render)
    }

    frameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('scroll', pauseGameOnScroll)
      section.removeEventListener('pointermove', handlePointerMove)
      section.removeEventListener('pointerleave', handlePointerLeave)
      resizeObserver.disconnect()
      section.style.removeProperty('--surface-grid-cell-width')
      section.style.removeProperty('--surface-grid-cell-height')
      gameApiRef.current = {
        startGame: () => {},
        pauseGame: () => {},
      }
    }
  }, [
    sectionRef,
    canvasRef,
    gameApiRef,
    setGameStatus,
    setScore,
    setHighScores,
    prefersReducedMotion,
  ])

  return null
}
