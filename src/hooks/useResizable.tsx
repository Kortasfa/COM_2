import React, { useEffect, useRef, useState } from 'react'

export const useResizable = (
  ref: React.RefObject<HTMLElement>,
  size: { width: number; height: number },
  setSize: React.Dispatch<React.SetStateAction<{ width: number; height: number }>>,
) => {
  const [isResizing, setIsResizing] = useState(false)
  const startSize = useRef<{ width: number; height: number } | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && startSize.current) {
        const newWidth = startSize.current.width + e.pageX - startSize.current.width
        const newHeight = startSize.current.height + e.pageY - startSize.current.height
        setSize({ width: newWidth, height: newHeight })
      }
    }

    const handleMouseUp = () => {
      if (isResizing) {
        setIsResizing(false)
      }
      startSize.current = null
    }

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      startSize.current = { width: size.width, height: size.height }
      setIsResizing(true)
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
  }, [ref, isResizing])

  return { isResizing }
}
