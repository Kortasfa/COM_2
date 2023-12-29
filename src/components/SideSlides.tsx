import styles from '../styles/App.module.css'
import { Presentation, Slide } from '../types/types'
import React, { useState } from 'react'
import { SideSlide } from './SideSlide'

interface SideSlidesProps {
  selectedSlideId?: string
  onSlideClick: (slideId: string) => void
  presentationData: Presentation
  updatePresentationData: (data: Presentation) => void
}

export const SideSlides: React.FC<SideSlidesProps> = (props) => {
  const [draggedSlideId, setDraggedSlideId] = useState<string | null>(null)

  const handleDragStart = (slideId: string) => {
    setDraggedSlideId(slideId)
  }

  const handleDragEnd = () => {
    setDraggedSlideId(null)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, dropSlideId: string) => {
    event.preventDefault()
    if (draggedSlideId && draggedSlideId !== dropSlideId) {
      const newSlides = [...props.presentationData.slides]
      const draggedIndex = newSlides.findIndex((slide) => slide.id === draggedSlideId)
      const dropIndex = newSlides.findIndex((slide) => slide.id === dropSlideId)
      const [draggedSlide] = newSlides.splice(draggedIndex, 1)
      newSlides.splice(dropIndex, 0, draggedSlide)

      props.updatePresentationData({ ...props.presentationData, slides: newSlides })
    }
  }

  return (
    <div className={styles.slides} onDragOver={(e) => e.preventDefault()} onDragEnd={handleDragEnd}>
      {props.presentationData.slides.map((slide, index) => (
        <div
          key={slide.id}
          draggable
          onDragStart={() => handleDragStart(slide.id)}
          onDrop={(e) => handleDrop(e, slide.id)}
        >
          <SideSlide
            slide={slide}
            scale={16}
            index={index + 1}
            onClick={() => props.onSlideClick(slide.id)}
            isSlideSelected={props.selectedSlideId === slide.id}
          />
        </div>
      ))}
    </div>
  )
}
