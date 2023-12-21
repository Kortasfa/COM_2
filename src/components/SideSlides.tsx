import styles from '../styles/App.module.css'
import { SlideView } from './SlideView'
import { Slide } from '../types/types'
import React from 'react'

interface SideSlides {
    slides: Slide[]
    selectedSlideId?: string
    onSlideClick: (slideId: string) => void
}

export const SideSlides = (props: SideSlides) => {
    return (
        <div className={styles.slides}>
            {props.slides.map((slide, index) => (
                <SlideView
                    slide={slide}
                    key={slide.id}
                    scale={20}
                    index={index + 1}
                    onClick={() => props.onSlideClick(slide.id)}
                    isSlideSelected={props.selectedSlideId === slide.id}
                ></SlideView>
            ))}
        </div>
    )
}
