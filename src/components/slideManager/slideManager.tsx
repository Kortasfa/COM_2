import React, { useEffect, useState } from 'react'
import { Slide } from '../../types/types'
import { Menu } from '../Menu/Menu'
import styles from '../../styles/App.module.css'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getSlides, getSelectedSlideId, getPresentationData } from '../../store/slide/selector'
import { SideSlides } from '../SideSlides'
import { SlideView } from '../SlideView'
import { selectSlide, updatePresentaionData } from '../../store/slide/slideActions'

export const SlideManager = () => {
  const slides = useAppSelector(getSlides)
  const dispatch = useAppDispatch()
  const handleSlideClick = (slideId: string) => {
    dispatch(selectSlide(slideId))
  }

  return (
    <div>
      <Menu />
      {slides.map((slide: Slide) => (
        <div key={slide.id} className={styles.workField}>
          <SideSlides slide={slide} onClick={() => handleSlideClick(slide.id)} />
          <SlideView slide={slide} />
        </div>
      ))}
    </div>
  )
}
