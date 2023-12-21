import React, { useEffect, useRef, useState } from 'react'

export const useDragAndDrop = (
  ref: React.RefObject<HTMLElement>,
  setPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
  initialPos: { x: number; y: number },
) => {
  const [isDragging, setIsDragging] = useState(false)
  const startPos = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && startPos.current) {
        const newSize = {
          x: initialPos.x + e.pageX - startPos.current.x,
          y: initialPos.y + e.pageY - startPos.current.y,
        }
        setPos(newSize)
      }
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
      }
      startPos.current = null
    }

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      startPos.current = { x: e.pageX, y: e.pageY }
      setIsDragging(true)
    }

    const handleEvents = (event: MouseEvent) => {
      if (ref.current) {
        if (event.type === 'mousedown') {
          handleMouseDown(event)
          document.addEventListener('mousemove', handleMouseMove)
          document.addEventListener('mouseup', handleMouseUp)
        } else if (event.type === 'mouseup') {
          document.removeEventListener('mousemove', handleMouseMove)
          document.removeEventListener('mouseup', handleMouseUp)
        }
      }
    }

    if (ref.current) {
      ref.current.addEventListener('mousedown', handleEvents)
      return () => {
        ref.current?.removeEventListener('mousedown', handleEvents)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [ref, isDragging])

  return { isDragging }
}
