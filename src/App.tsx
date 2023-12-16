import React, { useState } from 'react'
import { Menu } from './components/Menu/Menu'
import { SideSlides } from './components/SideSlides'
import { Presentation, Slide } from './types/types'
import InitializedPresentation from './components/InitializedPresentation'
import styles from './styles/App.module.css'
import { SlideView } from './components/SlideView'

export const App = () => {
  const [presentation, setPresentation] = useState<Presentation>(InitializedPresentation)
  const [selectedSlideId, setSelectedSlideId] = useState<string>()
  const [selectedObjectId, setSelectedObjectId] = useState<string>()
  const selectedSlide = presentation.slides.find((slide: { id: string }) => slide.id === selectedSlideId)

  const updateSlide = (updatedSlide: Slide) => {
    const updatedSlides = presentation.slides.map((slide) => {
      if (slide.id === updatedSlide.id) {
        return { ...slide, ...updatedSlide }
      }
      return slide
    })

    setPresentation((prevPresentation) => ({
      ...prevPresentation,
      slides: updatedSlides,
    }))
  }

  return (
    <div>
      <Menu
        selectedObjectId={selectedObjectId}
        selectedSlideId={selectedSlideId}
        setSelectedSlideId={setSelectedSlideId}
        presentationData={presentation}
        updatePresentationData={setPresentation}
      />
      <div className={styles.workField}>
        <SideSlides slides={presentation.slides} selectedSlideId={selectedSlideId} onSlideClick={setSelectedSlideId} />
        {selectedSlide && (
          <SlideView
            selectionSlideClass={styles.selectionSlide}
            slide={selectedSlide}
            key={selectedSlide?.id}
            selectedObjectId={selectedObjectId}
            onObjectClick={setSelectedObjectId}
            updateSlide={updateSlide}
          ></SlideView>
        )}
      </div>
    </div>
  )
}
