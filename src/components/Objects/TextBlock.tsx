import { Text } from '../../types/types'
import React, { useEffect, useRef, useState } from 'react'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'

interface TextBlock {
  textBlockData: Text
  scale: number
  isSelected: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
  updateObject?: (data: Text) => void
}

export const TextBlock = (props: TextBlock) => {
  const { value, color, fontSize, fontFamily, fontWeight, fontStyle, x, y, width, height } = props.textBlockData
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

  const handleInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTextValue(e.target.value)
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
          width: width * scalePercent + 4,
          height: height * scalePercent + 2,
          top: y * scalePercent - 4,
          left: x * scalePercent - 5,
          outline: '2px solid red',
          cursor: isDragging ? 'grabbing' : 'grab',
          visibility: isEditing && props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
      <input
        onClick={handleClick}
        contentEditable={isEditing}
        onChange={handleInputChange}
        suppressContentEditableWarning={true}
        value={textValue}
        style={{
          position: 'absolute',
          color: color.hex,
          width: width * scalePercent - 5,
          height: height * scalePercent - 5,
          fontSize: fontSize * scalePercent,
          fontFamily: fontFamily,
          fontWeight: fontWeight,
          fontStyle: fontStyle,
          lineHeight: (fontSize + 10) * scalePercent + 'px',
          top: y * scalePercent,
          left: x * scalePercent,
          opacity: color.opacity,
          outline: 'none',
          border: 'none',
        }}
      />
      <div
        ref={refSize}
        style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          top: (y + height) * scalePercent - 10,
          left: (x + width) * scalePercent - 10,
          background: 'red',
          cursor: 'nwse-resize',
          visibility: isEditing && props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
    </div>
  )
}
