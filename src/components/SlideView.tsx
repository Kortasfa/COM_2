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
  const [objectId, setObjectId] = useState<string>(selectedObjectId)
  const isSelectedSlide = slide.id === selectedSlideId
  const [isDraggingOrResizing, setIsDraggingOrResizing] = useState(false)
  const { objects, background } = slide

  const handleBackgroundClick = () => {
    if (!isDraggingOrResizing) {
      dispatch(selectObject(selectedSlideId, ''))
      setObjectId('')
    }
  }

  const handleObjectClick = (objectId: string, event: React.MouseEvent) => {
    dispatch(selectObject(selectedSlideId, objectId))
    setObjectId(objectId)
    event.stopPropagation()
  }

  const handleUpdateObject = (object: SlideObject) => {
    dispatch(updateSlideObject(selectedSlideId, selectedObjectId, object))
  }

  if (!isSelectedSlide) return null
  return (
    <div>
      <div
        className={styles.selectionSlide}
        onClick={handleBackgroundClick}
        style={{
          backgroundColor: background.color.hex,
        }}
      >
        {slide.objects.map((object: any) => {
          switch (object.type) {
            case ObjectType.TEXTBLOCK:
              return (
                <TextBlock
                  textBlockData={object}
                  key={object.id}
                  scale={100}
                  isSelected={object.id === selectedObjectId}
                  onClick={(e) => handleObjectClick(object.id, e)}
                  updateObject={handleUpdateObject}
                ></TextBlock>
              )
            case ObjectType.IMAGE:
              return (
                <ImageBlock
                  imageBlockData={object}
                  key={object.id}
                  scale={100}
                  isSelected={object.id === selectedObjectId}
                  onClick={(e) => handleObjectClick(object.id, e)}
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
                  onClick={(e) => handleObjectClick(object.id, e)}
                  updateObject={handleUpdateObject}
                  setIsDraggingOrResizing={setIsDraggingOrResizing}
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
