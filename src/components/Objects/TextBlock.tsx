import { Text } from '../../types/types'
import React from 'react'

export const TextBlock = (props: {
  textBlockData: Text
  scale: number
  isSelected: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}) => {
  const { value, color, fontSize, fontFamily, coordinates, width, height } = props.textBlockData
  const scalePercent = props.scale / 100

  return (
    <div
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
      }}
    >
      {value}
    </div>
  )
}
