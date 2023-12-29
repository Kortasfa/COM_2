import React from 'react'
import { ObjectType, Slide, SlideObject } from '../types/types'
import { TextBlock } from './Objects/TextBlock'
import { ImageBlock } from './Objects/ImageBlock'
import styles from './SlideView.module.css'
import { PrimitiveBlock } from './Objects/PrimitiveBlock'
import { useAppSelector, useAppDispatch } from '../store/store'
// import { selectObject, updateObject } from '../store/slide/slideActions'
import { getSlides, selectSelectedObjectId, selectSelectedSlideId } from '../store/slide/selector' // Import your actions

interface SlideViewProps {
  slide: Slide
}

export const SlideView: React.FC<SlideViewProps> = ({ slide }) => {
  const selectedObjectId = useAppSelector(selectSelectedObjectId)
  const selectedSlideId = useAppSelector(selectSelectedSlideId)
  // const dispatch = useAppDispatch()
  const isSelectedSlide = slide.id === selectedSlideId
  const { objects, background } = slide

  // const handleObjectClick = (objectId: string) => {
  //   dispatch(selectObject({ slideId: selectedSlideId, objectId }))
  // }
  //
  // const handleUpdateObject = (data: SlideObject) => {
  //   dispatch(updateObject({ slideId: selectedSlideId, objectId: selectedObjectId, updatedObject: data }))
  // }
  const handleObjectClick = (objectId: string) => {
    console.log(objectId)
  }

  const handleUpdateObject = (data: SlideObject) => {
    console.log(data)
  }
  if (!isSelectedSlide) return null
  return (
    <div>
      <div className={styles.selectionSlide}>
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
