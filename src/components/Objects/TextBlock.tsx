import { SlideObject, Text } from '../../types/types'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'

interface TextBlock {
  textBlockData: Text
  scale: number
  isSelected: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
  updateObject?: (data: SlideObject) => void
}

export const TextBlock = (props: TextBlock) => {
  const { value, color, fontSize, fontFamily, coordinates, width, height } = props.textBlockData
  const scalePercent = props.scale / 100

  const refBlock = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({
    x: coordinates.x,
    y: coordinates.y,
  })

  const { isDragging } = useDragAndDrop(refBlock, setCoords, coords)

  useEffect(() => {
    if (props.updateObject) {
      props.updateObject({
        ...props.textBlockData,
        coordinates: coords,
      })
    }
  }, [coords])

  return (
    <div
      ref={refBlock}
      onClick={props.onClick}
      style={{
        position: 'absolute',
        color: color.hex,
        width: width * scalePercent,
        height: height * scalePercent,
        fontSize: fontSize * scalePercent,
        fontFamily: fontFamily,
        lineHeight: (fontSize + 10) * scalePercent + 'px',
        top: coordinates.y * scalePercent,
        left: coordinates.x * scalePercent,
        opacity: color.opacity,
        outline: props.isSelected ? '1px solid blue' : 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {value}
    </div>
  )
}
