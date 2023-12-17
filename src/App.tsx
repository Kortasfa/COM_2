import React, { useState } from 'react'
import { Menu } from './components/Menu/Menu'
import { SideSlides } from './components/SideSlides'
import { ObjectType, Presentation, Slide, SlideObject } from './types/types'
import InitializedPresentation from './components/InitializedPresentation'
import styles from './styles/App.module.css'
import { SlideView } from './components/SlideView'

export const App = () => {
  const [presentation, setPresentation] = useState<Presentation>(InitializedPresentation)
  const [selectedSlideId, setSelectedSlideId] = useState<string>()
  const [selectedObjectId, setSelectedObjectId] = useState<string>()
  const selectedSlide = presentation.slides.find((slide: { id: string }) => slide.id === selectedSlideId)
  const updateObject = (updatedObject: SlideObject) => {
    const updatedObjects = selectedSlide?.objects.map((obj) => {
      if (obj.id === selectedObjectId) {
        return {
          ...obj,
          ...updatedObject,
        }
      }
      return obj
    })
    const updatedSlides = presentation.slides.map((slide: Slide) => {
      if (slide.id === selectedSlideId) {
        return {
          ...slide,
          objects: updatedObjects ? updatedObjects : slide.objects,
        }
      }
      return slide
    })

    const updatedPresentationData = {
      ...presentation,
      slides: updatedSlides,
    }

    setPresentation(updatedPresentationData)
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
            updateObject={updateObject}
          ></SlideView>
        )}
      </div>
    </div>
  )
}
