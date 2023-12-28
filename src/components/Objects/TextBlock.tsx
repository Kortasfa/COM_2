import { Text } from '../../types/types'
import React, { useEffect, useRef, useState } from 'react'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { useResize } from '../../hooks/useResize'

interface TextBlock {
  textBlockData: Text
  scale: number
  isSelected: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
  updateObject?: (data: Text) => void
}

export const TextBlock = (props: TextBlock) => {
  const { value, color, fontSize, fontFamily, x, y, width, height } = props.textBlockData
  const scalePercent = props.scale / 100

  const refBlock = useRef<HTMLDivElement>(null)
  const refSize = useRef<HTMLDivElement>(null)

  const [posBlock, setPosBlock] = useState({
    x: x,
    y: y,
  })

  const [posSize, setPosSize] = useState({
    x: width,
    y: height,
  })

  const { isDragging } = useDragAndDrop(refBlock, setPosBlock, posBlock, 'pos')
  useDragAndDrop(refSize, setPosSize, posSize, 'size')

  const [isEditing, setIsEditing] = useState(false)
  const [textValue, setTextValue] = useState(value)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scalePercent === 1) {
      setIsEditing(true)
      if (props.onClick && !props.isSelected) {
        props.onClick(e)
      }
    }
  }

  useEffect(() => {
    if (props.updateObject) {
      props.updateObject({
        ...props.textBlockData,
        x: posBlock.x,
        y: posBlock.y,
        value: textValue,
        width: posSize.x,
        height: posSize.y,
      })
    }
  }, [posBlock, posSize, textValue])

  return (
    <div>
      <div
        ref={refBlock}
        style={{
          position: 'absolute',
          width: posSize.x * scalePercent + 4,
          height: posSize.y * scalePercent + 2,
          top: posBlock.y * scalePercent - 4,
          left: posBlock.x * scalePercent - 5,
          border: '4px solid blue',
          cursor: isDragging ? 'grabbing' : 'grab',
          visibility: isEditing ? 'visible' : 'hidden',
        }}
      ></div>
      <div
        onClick={handleClick}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        style={{
          position: 'absolute',
          color: color.hex,
          width: posSize.x * scalePercent + 4,
          height: posSize.y * scalePercent + 2,
          fontSize: fontSize * scalePercent,
          fontFamily: fontFamily,
          lineHeight: (fontSize + 10) * scalePercent + 'px',
          top: posBlock.y * scalePercent,
          left: posBlock.x * scalePercent,
          opacity: color.opacity,
        }}
      >
        {textValue}
      </div>
      <div
        ref={refSize}
        style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          top: (posBlock.y + posSize.y) * scalePercent - 7,
          left: (posBlock.x + posSize.x) * scalePercent - 8,
          background: 'blue',
          cursor: 'nwse-resize',
          border: '1px solid white',
          visibility: isEditing ? 'visible' : 'hidden',
        }}
      ></div>
    </div>
  )
}
