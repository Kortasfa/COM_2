import { useEffect, useRef, useState } from 'react'

export const useResize = (
  ref: React.RefObject<HTMLElement>,
  size: { width: number; height: number },
  setSize: React.Dispatch<React.SetStateAction<{ width: number; height: number }>>,
) => {
  const [isResizing, setIsResizing] = useState(false)
  const startSize = useRef<{ width: number; height: number } | null>(null)

  useEffect(() => {
    const isWithinBoundary = (event: MouseEvent): boolean => {
      if (!ref.current) return false
      const rect = ref.current.getBoundingClientRect()
      const offsetX = event.clientX - rect.left
      const offsetY = event.clientY - rect.top

      // Check if the cursor is within a certain range from the bottom right corner
      return offsetX > rect.width - 10 && offsetX < rect.width && offsetY > rect.height - 10 && offsetY < rect.height
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && startSize.current && ref.current) {
        const newWidth = startSize.current.width + e.pageX - startSize.current.width
        const newHeight = startSize.current.height + e.pageY - startSize.current.height
        setSize({ width: newWidth, height: newHeight })
      }
    }

    const handleMouseUp = () => {
      if (isResizing) {
        startSize.current = null
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        setIsResizing(false)
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (!isWithinBoundary(e)) return
      e.preventDefault()
      startSize.current = { width: size.width, height: size.height }
      setIsResizing(true)
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
  }, [ref, isResizing, size, setSize])

  return { isResizing }
}
