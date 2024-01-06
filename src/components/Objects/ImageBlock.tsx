import React, { useEffect, useRef, useState } from 'react'
import { Image } from '../../types/types'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import styles from './Objects.module.css'
import { useResize } from '../../hooks/useResize'

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
  useResize(refSize1, setPosSize, posSize, posBlock, setPosBlock, { x: 1, y: 1 })
  useResize(refSize2, setPosSize, posSize, posBlock, setPosBlock, { x: -1, y: -1 })
  useResize(refSize3, setPosSize, posSize, posBlock, setPosBlock, { x: 1, y: -1 })
  useResize(refSize4, setPosSize, posSize, posBlock, setPosBlock, { x: -1, y: 1 })

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
      if (props.onClick && !props.isSelected) {
        props.onClick(e)
      }
    }
  }

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          width: width * scalePercent + 4,
          height: height * scalePercent + 2,
          top: y * scalePercent - 4,
          left: x * scalePercent - 5,
          outline: '2px solid red',
          visibility: props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
      <div
        ref={refBlock}
        style={{
          cursor: props.isSelected ? (isAction ? 'grabbing' : 'grab') : 'default',
        }}
      >
        <img
          onClick={handleClick}
          src={base64}
          style={{
            position: 'absolute',
            width: width * scalePercent - 4,
            height: height * scalePercent - 5,
            top: y * scalePercent,
            left: x * scalePercent,
          }}
          alt={'image'}
        />
      </div>
      <div
        className={styles.resize}
        ref={refSize1}
        style={{
          top: (y + height) * scalePercent - 10,
          left: (x + width) * scalePercent - 10,
          visibility: props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
      <div
        className={styles.resize}
        ref={refSize2}
        style={{
          top: y * scalePercent - 6,
          left: x * scalePercent - 6,
          visibility: props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
      <div
        className={styles.resize}
        ref={refSize3}
        style={{
          top: y * scalePercent - 6,
          left: (x + width) * scalePercent - 10,
          visibility: props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
      <div
        className={styles.resize}
        ref={refSize4}
        style={{
          top: (y + height) * scalePercent - 10,
          left: x * scalePercent - 6,
          visibility: props.isSelected ? 'visible' : 'hidden',
        }}
      ></div>
    </div>
  )
}
