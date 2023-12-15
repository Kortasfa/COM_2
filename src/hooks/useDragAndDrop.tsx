import { useState, useEffect, useRef } from 'react'

export function useDraggable(ref: any) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const dragRef = useRef(null)

  useEffect(() => {
    const draggableElement = ref.current
    const dragElement = dragRef.current

    let initialX: number
    let initialY: number
    let offsetX = 0
    let offsetY = 0

    function handleMouseDown(event: { clientX: number; clientY: number }) {
      initialX = event.clientX - offsetX
      initialY = event.clientY - offsetY

      setIsDragging(true)
    }

    function handleMouseUp() {
      setIsDragging(false)
    }

    function handleMouseMove(event: { preventDefault: () => void; clientX: number; clientY: number }) {
      if (isDragging) {
        event.preventDefault()

        offsetX = event.clientX - initialX
        offsetY = event.clientY - initialY

        setPosition({
          x: offsetX,
          y: offsetY,
        })
      }
    }

    if (draggableElement) {
      draggableElement.addEventListener('mousedown', handleMouseDown)
      draggableElement.addEventListener('mouseup', handleMouseUp)
      draggableElement.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (draggableElement) {
        draggableElement.removeEventListener('mousedown', handleMouseDown)
        draggableElement.removeEventListener('mouseup', handleMouseUp)
        draggableElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [ref, isDragging])

  return { dragRef, position }
}
