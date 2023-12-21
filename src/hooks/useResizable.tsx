import { useCallback, useEffect, useState } from 'react'

const useResizable = (initialWidth = 100, initialHeight = 100) => {
  const [isResizing, setIsResizing] = useState(false)
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  })
  const [initialSize, setInitialSize] = useState({
    width: initialWidth,
    height: initialHeight,
  })
  const [initialMousePosition, setInitialMousePosition] = useState({
    x: 0,
    y: 0,
  })

  const onMouseDownResize = useCallback(
    (e: { preventDefault: () => void; clientX: any; clientY: any }) => {
      e.preventDefault()
      setIsResizing(true)
      setInitialMousePosition({ x: e.clientX, y: e.clientY })
      setInitialSize(size)
    },
    [size],
  )

  const onMouseMoveResize = useCallback(
    (e: { clientX: number; clientY: number }) => {
      if (!isResizing) return
      const dx = e.clientX - initialMousePosition.x
      const dy = e.clientY - initialMousePosition.y
      requestAnimationFrame(() => {
        setSize({
          width: Math.max(10, initialSize.width + dx),
          height: Math.max(10, initialSize.height + dy),
        })
      })
    },
    [isResizing, initialMousePosition, initialSize],
  )

  const onMouseUpResize = useCallback(() => {
    setIsResizing(false)
  }, [])

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', onMouseMoveResize)
      window.addEventListener('mouseup', onMouseUpResize)
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMoveResize)
      window.removeEventListener('mouseup', onMouseUpResize)
    }
  }, [isResizing, onMouseMoveResize, onMouseUpResize])

  return { size, onMouseDownResize }
}

export default useResizable
