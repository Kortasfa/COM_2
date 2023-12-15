import React from 'react'
import { Image } from '../../types/types'

export function ImageBlock(props: {
  imageBlockData: Image
  scale: number
  isSelected: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
}) {
  const { coordinates, width, height, base64 } = props.imageBlockData
  const scalePercent = props.scale / 100

  return (
    <div
      onClick={props.onClick}
      style={{
        width: width * scalePercent,
        height: height * scalePercent,
        top: coordinates.y * scalePercent,
        left: coordinates.x * scalePercent,
        position: 'absolute',
        outline: props.isSelected ? '1px solid blue' : 'none',
      }}
    >
      <img
        src={base64}
        style={{
          width: width * scalePercent,
          height: height * scalePercent,
        }}
      />
    </div>
  )
}
