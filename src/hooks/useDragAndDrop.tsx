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
  const [isDragging, setIsDragging] = useState(false)
  const startPos = useRef<Position | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !startPos.current) return

      const drag = {
        x: e.pageX - startPos.current.x,
        y: e.pageY - startPos.current.y,
      }
      const newCoords = {
        x: initialPos.x + drag.x,
        y: initialPos.y + drag.y,
      }

      setPos(newCoords)
    }

    const handleMouseUp = () => {
      if (isDragging) {
        startPos.current = null
        setIsDragging(false)
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      startPos.current = { x: e.pageX, y: e.pageY }
      setIsDragging(true)
    }

    if (ref.current) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      ref.current.addEventListener('mousedown', handleMouseDown)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        ref.current?.removeEventListener('mousedown', handleMouseDown)
      }
    }
  }, [ref, isDragging])

  return isDragging
}

export { useDragAndDrop }
