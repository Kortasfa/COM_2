import { Text } from '../../types/types'
import React, { useEffect, useRef, useState } from 'react'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { useResize } from '../../hooks/useResize'
import styles from './Objects.module.css'

interface TextBlock {
  textBlockData: Text
  scale: number
  isSelected: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
  updateObject?: (data: Text) => void
  setIsDraggingOrResizing?: (data: boolean) => void
}

export const TextBlock = (props: TextBlock) => {
  const { value, color, fontSize, fontFamily, fontWeight, fontStyle, fontUnderline, x, y, width, height } =
    props.textBlockData
  const scalePercent = props.scale / 100

  const refBlock = useRef<HTMLDivElement>(null)
  const refSize1 = useRef<HTMLDivElement>(null)
  const refSize2 = useRef<HTMLDivElement>(null)
  const refSize3 = useRef<HTMLDivElement>(null)
  const refSize4 = useRef<HTMLDivElement>(null)

  const [posBlock, setPosBlock] = useState({
    x: x,
    y: y,
  })

  const [posSize, setPosSize] = useState({
    x: width,
    y: height,
  })

  const { isAction } = useDragAndDrop(refBlock, setPosBlock, posBlock)
  const resize1 = useResize(refSize1, setPosSize, posSize, posBlock, setPosBlock, { x: 1, y: 1 })
  const resize2 = useResize(refSize2, setPosSize, posSize, posBlock, setPosBlock, { x: -1, y: -1 })
  const resize3 = useResize(refSize3, setPosSize, posSize, posBlock, setPosBlock, { x: 1, y: -1 })
  const resize4 = useResize(refSize4, setPosSize, posSize, posBlock, setPosBlock, { x: -1, y: 1 })

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
    if (props.setIsDraggingOrResizing) {
      props.setIsDraggingOrResizing(isAction || resize1 || resize2 || resize3 || resize4)
    }
  }, [posBlock, posSize, isAction, resize1, resize2, resize3, resize4, textValue])

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
          cursor: isAction && props.isSelected ? 'grabbing' : 'grab',
          visibility: isEditing && props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
      <input
        onClick={handleClick}
        contentEditable={isEditing && props.isSelected}
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
          textDecoration: fontUnderline,
          lineHeight: (fontSize + 10) * scalePercent + 'px',
          top: y * scalePercent,
          left: x * scalePercent,
          opacity: color.opacity,
          outline: 'none',
          border: 'none',
        }}
      />
      <div
        className={styles.resize}
        ref={refSize1}
        style={{
          top: (y + height) * scalePercent - 10,
          left: (x + width) * scalePercent - 10,
          visibility: isEditing && props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
      <div
        className={styles.resize}
        ref={refSize2}
        style={{
          top: y * scalePercent - 6,
          left: x * scalePercent - 6,
          visibility: isEditing && props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
      <div
        className={styles.resize}
        ref={refSize3}
        style={{
          top: y * scalePercent - 6,
          left: (x + width) * scalePercent - 10,
          visibility: isEditing && props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
      <div
        className={styles.resize}
        ref={refSize4}
        style={{
          top: (y + height) * scalePercent - 10,
          left: x * scalePercent - 6,
          visibility: isEditing && props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
    </div>
  )
}
