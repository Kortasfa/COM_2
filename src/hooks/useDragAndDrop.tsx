import React, { Ref, useEffect, useState } from 'react'

export const useDragAndDrop = (
  ref: React.RefObject<HTMLElement>,
  setCoords: (coords: { x: number; y: number }) => any,
  initialCoords: {
    x: number
    y: number
  },
) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartCoords, setDragStartCoords] = useState(initialCoords)

  useEffect(() => {
    const handleMouseDown = (event: { button: number; clientX: number; clientY: number }) => {
      if (ref.current && event.button === 0) {
        setIsDragging(true)
        setDragStartCoords({
          x: event.clientX - dragStartCoords.x,
          y: event.clientY - dragStartCoords.y,
        })
      }
    }

    const handleMouseMove = (event: { clientX: number; clientY: number }) => {
      if (isDragging) {
        setCoords({
          x: event.clientX - dragStartCoords.x,
          y: event.clientY - dragStartCoords.y,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, ref, setCoords, dragStartCoords])

  return { isDragging }
}
