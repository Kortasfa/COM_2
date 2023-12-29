import React, { useEffect, useState } from 'react'
import { Slide, SlideObject } from '../../types/types'
import { Menu } from '../Menu/Menu'
import styles from '../../styles/App.module.css'
import { useAppDispatch, useAppSelector } from '../../store/store'
// import { addSlide, updateSlidleObject } from '../../store/slide/slideActions'
import { getSlides, selectSelectedSlideId } from '../../store/slide/selector'
import { SideSlides } from '../SideSlides'
import { SlideView } from '../SlideView'
import { selectSlide } from '../../store/slide/slideActions'

export const SlideManager = () => {
  const slides = useAppSelector(getSlides)
  const dispatch = useAppDispatch()
  const initSelectedSlideId = useAppSelector(selectSelectedSlideId)

  const [selectedSlideId, setSelectedSlideId] = useState<any>(initSelectedSlideId)

  const handleSlideClick = (slideId: string) => {
    setSelectedSlideId(slideId)
  }

  useEffect(() => {
    dispatch(selectSlide(selectedSlideId))
  }, [selectedSlideId])

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
