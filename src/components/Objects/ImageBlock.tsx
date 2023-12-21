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
  const { coordinates, width, height, base64 } = props.imageBlockData
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
        ...props.imageBlockData,
        coordinates: coords,
      })
    }
  }, [coords])

  return (
    <div
      ref={refBlock}
      onClick={props.onClick}
      style={{
        width: width * scalePercent,
        height: height * scalePercent,
        top: coordinates.y * scalePercent,
        left: coordinates.x * scalePercent,
        position: 'absolute',
        outline: props.isSelected ? '1px solid blue' : 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <img
        src={base64}
        style={{
          width: width * scalePercent,
          height: height * scalePercent,
        }}
        alt={'image'}
      />
    </div>
  )
}
