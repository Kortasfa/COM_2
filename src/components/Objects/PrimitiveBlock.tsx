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
  const { primitiveType, outlineColor, fillColor, x, y, width, height } = props.primitiveBlockData
  const scalePercent = props.scale / 100
  let shapeElement = null

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

  const handleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
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
        ...props.primitiveBlockData,
        x: posBlock.x,
        y: posBlock.y,
        width: posSize.x,
        height: posSize.y,
      })
    }
  }, [posBlock, posSize])

  switch (primitiveType) {
    case Figures.CIRCLE:
      shapeElement = (
        <ellipse
          cx={(width / 2) * scalePercent}
          cy={(height / 2) * scalePercent}
          rx={(width / 2) * scalePercent}
          ry={(height / 2) * scalePercent}
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
    <div>
      <div
        style={{
          position: 'absolute',
          width: width * scalePercent,
          height: height * scalePercent,
          top: y * scalePercent,
          left: x * scalePercent,
          outline: '2px solid red',
          visibility: isEditing && props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
      <div ref={refBlock}>
        <svg
          onClick={handleClick}
          style={{
            position: 'absolute',
            left: x * scalePercent,
            top: y * scalePercent,
            width: width * scalePercent,
            height: height * scalePercent,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {shapeElement}
        </svg>
      </div>
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
