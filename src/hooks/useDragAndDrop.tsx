import React, { useEffect, useRef, useState } from 'react'

interface Position {
  x: number
  y: number
}

const useDragAndDrop = (
  ref: React.RefObject<HTMLElement>,
  setPos: React.Dispatch<React.SetStateAction<Position>>,
  initialPos: Position,
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
          x: initialPos.x + delta.x,
          y: initialPos.y + delta.y,
        }

        setPos(newCoords)
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

    if (ref.current) {
      ref.current.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousedown', handleMouseDown)
      }
    }
  }, [ref, isAction])

  return isAction
}

export { useDragAndDrop }
