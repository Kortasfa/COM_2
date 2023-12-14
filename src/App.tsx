import React, { useEffect, useState } from 'react'
import { Menu } from './components/Menu/Menu'
import { SideSlides } from './components/SideSlides'
import { Presentation, Slide } from './types/types'
import InitializedPresentation from './components/InitializedPresentation'
import styles from './App.module.css'
import { SlideView } from './components/SlideView'

const App = () => {
    const [presentation, setPresentation] = useState<Presentation>(InitializedPresentation)
    const { name, slides } = presentation
    const [selectedSlideId, setSelectedSlideId] = useState(presentation.selection?.slideId)
    const [selectedObjectId, setSelectedObjectId] = useState(presentation.selection?.objectId)
    const selectedSlide = slides.find((slide: { id: string }) => slide.id === selectedSlideId)

    useEffect(() => {
        document.title = name
    }, [name])

    const updateSlide = (updatedSlide: Slide) => {
        const updatedSlides = slides.map((slide) => {
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
            <title>{name}</title>
            <Menu
                selectedObjectId={selectedObjectId}
                selectedSlideId={selectedSlideId}
                setSelectedSlideId={setSelectedSlideId}
                presentationData={presentation}
                updatePresentationData={setPresentation}
            />
            <div className={styles.workField}>
                <SideSlides slides={slides} selectedSlideId={selectedSlideId} onSlideClick={setSelectedSlideId} />
                {selectedSlide && (
                    <SlideView
                        selectionSlideClass={styles.selectionSlide}
                        slideData={selectedSlide}
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

export { App }
