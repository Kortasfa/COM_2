import React, { useEffect, useRef, useState } from 'react'
import { Figures, Primitive } from '../../types/types'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import styles from './Objects.module.css'
import { useResize } from '../../hooks/useResize'

interface PrimitiveBlock {
  primitiveBlockData: Primitive
  scale: number
  isSelected: boolean
  onClick?: React.MouseEventHandler<SVGSVGElement> | undefined
  updateObject?: (data: Primitive) => void
  setIsDraggingOrResizing?: (data: boolean) => void
}

export const PrimitiveBlock = (props: PrimitiveBlock) => {
  const { primitiveType, fillColor, x, y, width, height } = props.primitiveBlockData
  const scalePercent = props.scale / 100
  let shapeElement = null

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
    if (props.setIsDraggingOrResizing) {
      props.setIsDraggingOrResizing(isAction || resize1 || resize2 || resize3 || resize4)
    }
  }, [posBlock, posSize, isAction, resize1, resize2, resize3, resize4])

  switch (primitiveType) {
    case Figures.CIRCLE:
      shapeElement = (
        <ellipse
          cx={(width / 2) * scalePercent}
          cy={(height / 2) * scalePercent}
          rx={(width / 2) * scalePercent}
          ry={(height / 2) * scalePercent}
          fill={fillColor.hex}
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
            cursor: isEditing && props.isSelected ? (isAction ? 'grabbing' : 'grab') : 'default',
          }}
        >
          {shapeElement}
        </svg>
      </div>
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
          top: y * scalePercent - 2,
          left: x * scalePercent - 2,
          visibility: isEditing && props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
      <div
        className={styles.resize}
        ref={refSize3}
        style={{
          top: y * scalePercent - 2,
          left: (x + width) * scalePercent - 10,
          visibility: isEditing && props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
      <div
        className={styles.resize}
        ref={refSize4}
        style={{
          top: (y + height) * scalePercent - 10,
          left: x * scalePercent - 2,
          visibility: isEditing && props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
    </div>
  )
}
