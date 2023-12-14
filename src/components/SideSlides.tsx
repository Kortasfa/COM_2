import styles from '../App.module.css'
import { SlideView } from './SlideView'
import { Slide } from '../types/types'
import React from 'react'

function SideSlides(props: { slides: Slide[]; selectedSlideId?: string; onSlideClick: (slideId: string) => void }) {
    return (
        <div className={styles.slides}>
            {props.slides.map((slide, index) => (
                <SlideView
                    slideData={slide}
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

export { SideSlides }
