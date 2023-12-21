import React, { useEffect, useRef, useState } from 'react'
import { Figures, Primitive, SlideObject } from '../../types/types'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'

interface PrimitiveBlock {
  primitiveBlockData: Primitive
  scale: number
  isSelected: boolean
  onClick?: React.MouseEventHandler<SVGSVGElement> | undefined
  updateObject?: (data: Primitive) => void
}

export const PrimitiveBlock = (props: PrimitiveBlock) => {
  const { primitiveType, outlineColor, fillColor, coordinates, width, height } = props.primitiveBlockData
  const scalePercent = props.scale / 100
  let shapeElement = null

  const refBlock = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({
    x: coordinates.x,
    y: coordinates.y,
  })

  const { isDragging } = useDragAndDrop(refBlock, setCoords, coords)

  useEffect(() => {
    if (props.updateObject) {
      props.updateObject({
        ...props.primitiveBlockData,
        coordinates: coords,
      })
    }
  }, [coords])

  switch (primitiveType) {
    case Figures.CIRCLE:
      shapeElement = (
        <circle
          cx={(width / 2) * scalePercent}
          cy={(height / 2) * scalePercent}
          r={(width / 2) * scalePercent}
          fill={fillColor.hex}
          stroke={outlineColor?.hex || 'transparent'}
          strokeWidth={2 * scalePercent}
        />
      )
      break
    case Figures.RECTANGLE:
      shapeElement = (
        <rect
          width={width * scalePercent}
          height={height * scalePercent}
          fill={fillColor.hex}
          stroke={outlineColor?.hex || 'transparent'}
          strokeWidth={2 * scalePercent}
        />
      )
      break
    case Figures.TRIANGLE:
      shapeElement = (
        <polygon
          points={`0,${height * scalePercent} ${(width / 2) * scalePercent},${0} ${width * scalePercent},${
            height * scalePercent
          }`}
          fill={fillColor.hex}
          stroke={outlineColor?.hex || 'transparent'}
          strokeWidth={2 * scalePercent}
        />
      )
      break
  }

  return (
    <div ref={refBlock}>
      <svg
        onClick={props.onClick}
        style={{
          position: 'absolute',
          left: coordinates.x * scalePercent,
          top: coordinates.y * scalePercent,
          width: width * scalePercent,
          height: height * scalePercent,
          outline: props.isSelected ? '1px solid blue' : 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        {shapeElement}
      </svg>
    </div>
  )
}
