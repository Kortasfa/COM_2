import React, { useEffect, useRef, useState } from 'react'
import { Image, SlideObject } from '../../types/types'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'

interface ImageBlock {
  imageBlockData: Image
  scale: number
  isSelected: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
  updateObject?: (data: Image) => void
}

export const ImageBlock = (props: ImageBlock) => {
  const { x, y, width, height, base64 } = props.imageBlockData
  const scalePercent = props.scale / 100

  const refBlock = useRef<HTMLDivElement>(null)
  const refSize = useRef<HTMLDivElement>(null)
  // const { isDragging } = useDragAndDrop(refBlock, setCoords, coords)

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

  useEffect(() => {
    if (props.updateObject) {
      props.updateObject({
        ...props.imageBlockData,
        x: posBlock.x,
        y: posBlock.y,
        width: posSize.x,
        height: posSize.y,
      })
    }
  }, [posBlock, posSize])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scalePercent === 1) {
      setIsEditing(true)
      if (props.onClick && !props.isSelected) {
        props.onClick(e)
      }
    }
  }

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
      <img
        onClick={handleClick}
        src={base64}
        style={{
          position: 'absolute',
          width: width * scalePercent - 4,
          height: height * scalePercent - 5,
          top: posBlock.y * scalePercent,
          left: posBlock.x * scalePercent,
        }}
        alt={'image'}
      />
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
