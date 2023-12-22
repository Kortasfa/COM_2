import { Text } from '../../types/types'
import React, { useEffect, useRef, useState } from 'react'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { useResizable } from '../../hooks/useResizable'

interface TextBlock {
  textBlockData: Text
  scale: number
  isSelected: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
  updateObject?: (data: Text) => void
}

export const TextBlock = (props: TextBlock) => {
  const { value, color, fontSize, fontFamily, coordinates, width, height } = props.textBlockData
  const scalePercent = props.scale / 100

  const refBlock = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({
    x: coordinates.x,
    y: coordinates.y,
  })
  const [size, setSize] = useState({
    width: coordinates.x,
    height: coordinates.y,
  })
  //const [textValue, setTextValue] = useState(value)

  const { isDragging } = useDragAndDrop(refBlock, setCoords, coords)
  const { isResizing } = useResizable(refBlock, size, setSize)

  useEffect(() => {
    if (props.updateObject) {
      props.updateObject({
        ...props.textBlockData,
        coordinates: coords,
        width: size.width,
        height: size.height,
      })
    }
  }, [coords])

  return (
    <div
      //ref={refBlock}
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
        //cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {value}
      {props.isSelected && (
        <div
          style={{
            width: 10 * scalePercent + 'px',
            height: 10 * scalePercent + 'px',
            position: 'absolute',
            bottom: 0,
            right: 0,
            cursor: 'nwse-resize',
            backgroundColor: 'blue',
          }}
        />
      )}
    </div>
  )
}
