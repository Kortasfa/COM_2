import React, { useState } from 'react'
import { ObjectType, Slide, SlideObject } from '../types/types'
import { TextBlock } from './Objects/TextBlock'
import { ImageBlock } from './Objects/ImageBlock'
import styles from './SlideView.module.css'
import { PrimitiveBlock } from './Objects/PrimitiveBlock'
import { useAppSelector, useAppDispatch } from '../store/store'
// import { selectObject, updateObject } from '../store/slide/slideActions'
import { getSlides, getSelectedObjectId, getSelectedSlideId } from '../store/slide/selector'
import { selectObject, updateSlideObject } from '../store/slide/slideActions' // Import your actions

interface SlideViewProps {
  slide: Slide
}

export const SlideView: React.FC<SlideViewProps> = ({ slide }) => {
  const dispatch = useAppDispatch()
  const selectedSlideId = useAppSelector(getSelectedSlideId)
  const selectedObjectId = useAppSelector(getSelectedObjectId)
  const slides = useAppSelector(getSlides)
  const selectedSlide = slides.find((s: any) => s.id === selectedSlideId)

  const backgroundColor = selectedSlide?.background?.color?.hex || '#FFFFFF'
  const [objectId, setObjectId] = useState<string>(selectedObjectId)
  const isSelectedSlide = slide.id === selectedSlideId
  // const { objects, background } = slide

  const handleObjectClick = (objectId: string) => {
    dispatch(selectObject(selectedSlideId, objectId))
    setObjectId(objectId)
  }

  const handleUpdateObject = (object: SlideObject) => {
    dispatch(updateSlideObject(selectedSlideId, selectedObjectId, object))
  }

  if (!isSelectedSlide) return null
  return (
    <div>
      <div className={styles.selectionSlide} style={{ backgroundColor: backgroundColor }}>
        {slide.objects.map((object: any) => {
          switch (object.type) {
            case ObjectType.TEXTBLOCK:
              return (
                <TextBlock
                  textBlockData={object}
                  key={object.id}
                  scale={100}
                  isSelected={object.id === selectedObjectId}
                  onClick={() => handleObjectClick(object.id)}
                  updateObject={handleUpdateObject}
                ></TextBlock>
              )
            case ObjectType.IMAGE:
              return (
                <ImageBlock
                  imageBlockData={object}
                  key={object.id}
                  scale={100}
                  isSelected={object.id === selectedSlideId}
                  onClick={() => handleObjectClick(object.id)}
                  updateObject={handleUpdateObject}
                ></ImageBlock>
              )
            case ObjectType.PRIMITIVE:
              return (
                <PrimitiveBlock
                  primitiveBlockData={object}
                  key={object.id}
                  scale={100}
                  isSelected={object.id === selectedObjectId}
                  onClick={() => handleObjectClick(object.id)}
                  updateObject={handleUpdateObject}
                ></PrimitiveBlock>
              )
            default:
              return null
          }
        })}
      </div>
    </div>
  )
}
