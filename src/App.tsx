import React, { useState } from 'react'
import { Menu } from './components/Menu/Menu'
import { SideSlides } from './components/SideSlides'
import { Presentation, Slide, SlideObject } from './types/types'
import InitializedPresentation from './components/InitializedPresentation'
import styles from './styles/App.module.css'
import { SlideView } from './components/SlideView'

export const App = () => {
  const [presentation, setPresentation] = useState<Presentation>(InitializedPresentation)
  const [selectedSlideId, setSelectedSlideId] = useState<string>()
  const [selectedObjectId, setSelectedObjectId] = useState<string>()

  return (
    <div>
      <Menu
        selectedObjectId={selectedObjectId}
        setSelectedObjectId={setSelectedObjectId}
        selectedSlideId={selectedSlideId}
        setSelectedSlideId={setSelectedSlideId}
        presentationData={presentation}
        updatePresentationData={setPresentation}
      />
      <div className={styles.workField}>
        <SideSlides
          selectedSlideId={selectedSlideId}
          onSlideClick={setSelectedSlideId}
          presentationData={presentation}
          updatePresentationData={setPresentation}
        />
        <SlideView
          selectionSlideClass={styles.selectionSlide}
          selectedObjectId={selectedObjectId}
          onObjectClick={setSelectedObjectId}
          presentationData={presentation}
          updatePresentationData={setPresentation}
          selectedSlideId={selectedSlideId}
        ></SlideView>
      </div>
    </div>
  )
}
