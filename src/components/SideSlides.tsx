import React from 'react'
import { ObjectType, Slide, SlideObject } from '../types/types'
import { TextBlock } from './Objects/TextBlock'
import { ImageBlock } from './Objects/ImageBlock'
import styles from './SlideView.module.css'
import { PrimitiveBlock } from './Objects/PrimitiveBlock'
import { useAppSelector, useAppDispatch } from '../store/store'
// import { selectObject, updateObject } from '../store/slide/slideActions'
import { getSlides, getSelectedObjectId, getSelectedSlideId } from '../store/slide/selector'
import { selectObject } from '../store/slide/slideActions' // Import your actions

interface SideSlides {
  slide: Slide
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export const SideSlides = ({ slide, onClick }: SideSlides) => {
  const selectedSlideId = useAppSelector(getSelectedSlideId)
  const selectedObjectId = useAppSelector(getSelectedObjectId)
  const isSelected = slide.id === selectedSlideId
  const { objects, background } = slide

  // const handleObjectClick = (objectId: string) => {
  //   dispatch(selectObject({ slideId: selectedSlideId, objectId }))
  // }
  //
  // const handleUpdateObject = (data: SlideObject) => {
  //   dispatch(updateObject({ slideId: selectedSlideId, objectId: selectedObjectId, updatedObject: data }))
  // }
  const handleObjectClick = (objectId: string) => {
  }

  const handleUpdateObject = (data: SlideObject) => {
    console.log(data)
  }
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
        {objects.map((object: any) => {
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
  ) : (
    <div></div>
  )
}
