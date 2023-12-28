import styles from '../styles/App.module.css'
import { Slide } from '../types/types'
import React from 'react'
import { SideSlide } from './SideSlide'

interface SideSlides {
  slides: Slide[]
  selectedSlideId?: string
  onSlideClick: (slideId: string) => void
}

export const SideSlides = (props: SideSlides) => {
  return (
    <div className={styles.slides}>
      {props.slides.map((slide, index) => (
        <SideSlide
          slide={slide}
          key={slide.id}
          scale={16}
          index={index + 1}
          onClick={() => props.onSlideClick(slide.id)}
          isSlideSelected={props.selectedSlideId === slide.id}
        ></SideSlide>
      ))}
    </div>
  )
}
