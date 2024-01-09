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
        const res = {
          x: e.pageX - startPos.current?.width,
          y: e.pageY - startPos.current?.height,
        }
        const newCoords = {
          width: initialPos.width + move.x * res.x,
          height: initialPos.height + move.y * res.y,
        }

        setSize(newCoords)
        const position = {
          x: ref.x + (move.x < 0 ? res.x : 0),
          y: ref.y + (move.y < 0 ? res.y : 0),
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
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      size.current.addEventListener('mousedown', handleMouseDown)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        size.current?.removeEventListener('mousedown', handleMouseDown)
      }
    }
  }, [size, isResize])

  return isResize
}

export { useResize }
