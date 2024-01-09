import React, { useState } from 'react'
import { Image, ObjectType, Primitive, Slide, SlideObject, Text } from '../../types/types'
import { TextBlock } from '../Objects/TextBlock'
import { ImageBlock } from '../Objects/ImageBlock'
import styles from './SlideView.module.css'
import { PrimitiveBlock } from '../Objects/PrimitiveBlock'
import { useAppSelector, useAppDispatch } from '../../store/store'
import { getSelectedObjectId, getSelectedSlideId } from '../../store/slide/selector'
import { selectObject, updateSlideObject } from '../../store/slide/slideActions'

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
  const { background } = slide

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
    <div id="slide-view" onClick={handleBackgroundClick}>
      <div
        className={styles.selectionSlide}
        style={{
          backgroundColor: background.color.hex,
        }}
      >
        {slide.objects.map((object: Text | Primitive | Image) => {
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
                  setIsDraggingOrResizing={setIsDraggingOrResizing}
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
                  setIsDraggingOrResizing={setIsDraggingOrResizing}
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
