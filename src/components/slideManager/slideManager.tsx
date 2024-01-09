import React, { useRef } from 'react'
import { Slide } from '../../types/types'
import { Menu } from '../Menu/Menu'
import styles from '../../styles/App.module.css'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getPresentationTheme, getSlides } from '../../store/slide/selector'
import { SideSlides } from './SideSlides'
import { SlideView } from './SlideView'
import { selectSlide, updatePresentationData } from '../../store/slide/slideActions'

export const SlideManager = () => {
  const slides = useAppSelector(getSlides)
  const presentationTheme = useAppSelector(getPresentationTheme)
  const dispatch = useAppDispatch()
  const handleSlideClick = (slideId: string) => {
    dispatch(selectSlide(slideId))
  }

  const [draggedSlideId, setDraggedSlideId] = React.useState<string | null>(null)

  const handleDragStart = (slideId: string) => {
    setDraggedSlideId(slideId)
  }

  const handleDragEnd = () => {
    setDraggedSlideId(null)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, dropSlideId: string) => {
    event.preventDefault()
    if (draggedSlideId && draggedSlideId !== dropSlideId) {
      const newSlides = [...slides]
      const draggedIndex = newSlides.findIndex((slide) => slide.id === draggedSlideId)
      const dropIndex = newSlides.findIndex((slide) => slide.id === dropSlideId)
      const [draggedSlide] = newSlides.splice(draggedIndex, 1)
      newSlides.splice(dropIndex, 0, draggedSlide)

      dispatch(updatePresentationData(newSlides))
    }
  }

  return (
    <div className={presentationTheme === 'light' ? styles.lightTheme : styles.darkTheme}>
      <Menu />
      <div id="pdf-export" onDragOver={(e) => e.preventDefault()} onDragEnd={handleDragEnd}>
        {slides.map((slide: Slide) => (
          <div id="workfield" key={slide.id} className={styles.workField}>
            <div
              key={slide.id}
              draggable
              onDragStart={() => handleDragStart(slide.id)}
              onDrop={(e) => handleDrop(e, slide.id)}
            >
              <SideSlides slide={slide} onClick={() => handleSlideClick(slide.id)} />
            </div>
            <SlideView slide={slide} />
          </div>
        ))}
      </div>
    </div>
  )
}
