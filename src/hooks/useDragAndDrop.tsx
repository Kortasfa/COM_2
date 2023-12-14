import { useState, useCallback, useEffect } from 'react'

export const useDraggable = () => {
    const [isDragging, setIsDragging] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [offset, setOffset] = useState({ x: 0, y: 0 })

    const onMouseDown = useCallback(
        (e: { preventDefault: () => void; clientX: number; clientY: number; shiftKey: boolean }) => {
            if (e.shiftKey) {
                e.preventDefault()
                setIsDragging(true)
                setOffset({
                    x: e.clientX - position.x,
                    y: e.clientY - position.y,
                })
            }
        },
        [position],
    )

    const onMouseMove = useCallback(
        (e: { clientX: number; clientY: number }) => {
            if (!isDragging) return
            requestAnimationFrame(() => {
                setPosition({
                    x: e.clientX - offset.x,
                    y: e.clientY - offset.y,
                })
            })
        },
        [isDragging, offset],
    )

    const onMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove)
            window.addEventListener('mouseup', onMouseUp)
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [isDragging, onMouseMove, onMouseUp])

    return {
        position,
        onMouseDown,
        onMouseMove,
        onMouseUp,
    }
}
