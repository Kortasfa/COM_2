import React from 'react'
import { ObjectType, Presentation, Slide, SlideObject } from '../types/types'
import { TextBlock } from './Objects/TextBlock'
import { ImageBlock } from './Objects/ImageBlock'
import styles from './SlideView.module.css'
import { PrimitiveBlock } from './Objects/PrimitiveBlock'

interface SlideView {
  scale?: number
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
  isSlideSelected?: boolean
  selectedObjectId?: string
  onObjectClick?: (objectId: string) => void
  updateObject?: (data: SlideObject) => void
  selectionSlideClass?: string
  presentationData: Presentation
  updatePresentationData: (data: Presentation) => void
  selectedSlideId?: string
}

export const SlideView = (props: SlideView) => {
  const selectedSlide = props.presentationData.slides.find(
    (slide: { id: string }) => slide.id === props.selectedSlideId,
  )
  const updateObject = (updatedObject: SlideObject) => {
    const updatedObjects = selectedSlide?.objects.map((obj) => {
      if (obj.id === props.selectedObjectId) {
        return {
          ...obj,
          ...updatedObject,
        }
      }
      return obj
    })
    const updatedSlides = props.presentationData.slides.map((slide: Slide) => {
      if (slide.id === props.selectedSlideId) {
        return {
          ...slide,
          objects: updatedObjects ? updatedObjects : slide.objects,
        }
      }
      return slide
    })

    const updatedPresentationData = {
      ...props.presentationData,
      slides: updatedSlides,
    }

    props.updatePresentationData(updatedPresentationData)
  }

  return selectedSlide ? (
    <div>
      <div
        className={props.selectionSlideClass || styles.sideSlide}
        style={{
          backgroundColor: selectedSlide.background.color.hex,
          ...(props.isSlideSelected && {
            outlineColor: '#3498db',
            outlineWidth: '3px',
          }),
        }}
        onClick={props.onClick}
      >
        {selectedSlide.objects.map((object) => {
          switch (object.type) {
            case ObjectType.TEXTBLOCK:
              return (
                <TextBlock
                  textBlockData={object}
                  key={object.id}
                  scale={props.scale || 100}
                  isSelected={object.id === props.selectedObjectId}
                  onClick={() => props.onObjectClick && props.onObjectClick(object.id)}
                  updateObject={updateObject}
                ></TextBlock>
              )
            case ObjectType.IMAGE:
              return (
                <ImageBlock
                  imageBlockData={object}
                  key={object.id}
                  scale={props.scale || 100}
                  isSelected={object.id === props.selectedObjectId}
                  onClick={() => props.onObjectClick && props.onObjectClick(object.id)}
                  updateObject={updateObject}
                ></ImageBlock>
              )
            case ObjectType.PRIMITIVE:
              return (
                <PrimitiveBlock
                  primitiveBlockData={object}
                  key={object.id}
                  scale={props.scale || 100}
                  isSelected={object.id === props.selectedObjectId}
                  onClick={() => props.onObjectClick && props.onObjectClick(object.id)}
                  updateObject={updateObject}
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
