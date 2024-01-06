import React, { useEffect, useRef, useState } from 'react'

interface Position {
  x: number
  y: number
}

const useResize = (
  size: React.RefObject<HTMLElement>,
  setSize: React.Dispatch<React.SetStateAction<Position>>,
  initialPos: Position,
  ref: Position,
  setPos: React.Dispatch<React.SetStateAction<Position>>,
  move: { x: number; y: number },
) => {
  const [isAction, setIsAction] = useState(false)
  const startPos = useRef<Position | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isAction && startPos.current) {
        const delta = {
          x: e.pageX - startPos.current.x,
          y: e.pageY - startPos.current.y,
        }
        const newCoords = {
          x: initialPos.x + move.x * delta.x,
          y: initialPos.y + move.y * delta.y,
        }

        setSize(newCoords)
        const position = {
          x: ref.x + (move.x < 0 ? delta.x : 0),
          y: ref.y + (move.y < 0 ? delta.y : 0),
        }
        setPos(position)
      }
    }

    const handleMouseUp = () => {
      if (isAction) {
        startPos.current = null
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        setIsAction(false)
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      startPos.current = { x: e.pageX, y: e.pageY }
      setIsAction(true)
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    if (size.current) {
      size.current.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (size.current) {
        size.current.removeEventListener('mousedown', handleMouseDown)
      }
    }
  }, [size, isAction])

  return { isAction }
}

export { useResize }
