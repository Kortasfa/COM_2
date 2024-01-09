import React from 'react'
import { Image, ObjectType, Primitive, Slide, SlideObject, Text } from '../../types/types'
import { TextBlock } from '../Objects/TextBlock'
import { ImageBlock } from '../Objects/ImageBlock'
import styles from './SlideView.module.css'
import { PrimitiveBlock } from '../Objects/PrimitiveBlock'
import { useAppSelector } from '../../store/store'
import { getSelectedObjectId, getSelectedSlideId } from '../../store/slide/selector'

interface SideSlides {
  slide: Slide
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export const SideSlides = ({ slide, onClick }: SideSlides) => {
  const selectedSlideId = useAppSelector(getSelectedSlideId)
  const selectedObjectId = useAppSelector(getSelectedObjectId)
  const isSelected = slide.id === selectedSlideId
  const { objects, background } = slide

  return slide ? (
    <div>
      <div
        className={styles.sideSlide}
        style={{
          backgroundColor: background.color.hex,
          ...(isSelected && {
            outlineColor: '#3498db',
            outlineWidth: '3px',
          }),
        }}
        onClick={onClick}
      >
        {objects.map((object: Text | Primitive | Image) => {
          switch (object.type) {
            case ObjectType.TEXTBLOCK:
              return (
                <TextBlock
                  textBlockData={object}
                  key={object.id}
                  scale={15.7}
                  isSelected={object.id === selectedObjectId}
                ></TextBlock>
              )
            case ObjectType.IMAGE:
              return (
                <ImageBlock
                  imageBlockData={object}
                  key={object.id}
                  scale={15.7}
                  isSelected={object.id === selectedSlideId}
                ></ImageBlock>
              )
            case ObjectType.PRIMITIVE:
              return (
                <PrimitiveBlock
                  primitiveBlockData={object}
                  key={object.id}
                  scale={15.7}
                  isSelected={object.id === selectedObjectId}
                ></PrimitiveBlock>
              )
            default:
              return null
          }
        })}
      </div>
    </div>
  ) : (
    <div></div>
  )
}
