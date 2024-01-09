import React, { useEffect, useRef, useState } from 'react'

interface Size {
  width: number
  height: number
}

interface Position {
  x: number
  y: number
}

const useResize = (
  size: React.RefObject<HTMLElement>,
  setSize: React.Dispatch<React.SetStateAction<Size>>,
  initialPos: Size,
  ref: Position,
  setPos: React.Dispatch<React.SetStateAction<Position>>,
  move: { x: number; y: number },
) => {
  const [isResize, setIsResize] = useState(false)
  const startPos = useRef<Size | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResize && startPos.current) {
        const delta = {
          x: e.pageX - startPos.current?.width,
          y: e.pageY - startPos.current?.height,
        }
        const newCoords = {
          width: initialPos.width + move.x * delta.x,
          height: initialPos.height + move.y * delta.y,
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
      if (isResize) {
        startPos.current = null
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        setIsResize(false)
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      startPos.current = { width: e.pageX, height: e.pageY }
      setIsResize(true)
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
  }, [size, isResize])

  return isResize
}

export { useResize }
