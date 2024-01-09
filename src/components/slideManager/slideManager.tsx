import React, { useEffect, useState } from 'react'
import { Slide } from '../../types/types'
import { Menu } from '../Menu/Menu'
import styles from '../../styles/App.module.css'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getPresentationTheme, getSlides } from '../../store/slide/selector'
import { SideSlides } from '../SideSlides'
import { SlideView } from '../SlideView'
import { selectSlide, updatePresentationData } from '../../store/slide/slideActions'

type SlideShowProps = {
  slides: Slide[]
  onClose: () => void
}

const SlideShow: React.FC<SlideShowProps> = ({ slides, onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex < slides.length - 1 ? prevIndex + 1 : prevIndex))
  }

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        handlePrevSlide()
        break
      case 'ArrowRight':
        handleNextSlide()
        break
      case 'Escape':
        onClose() // Закрытие слайд-шоу при нажатии "Escape"
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentSlideIndex])

  useEffect(() => {
    // Reset slide index when the component mounts
    setCurrentSlideIndex(0)
  }, [])

  return (
    <div className={styles.slideShow}>
      <div className={styles.slideShowContent}>
        <SlideView slide={slides[currentSlideIndex]} />
      </div>
    </div>
  )
}

export const SlideManager = () => {
  const slides = useAppSelector(getSlides)
  const presentationTheme = useAppSelector(getPresentationTheme)
  const dispatch = useAppDispatch()
  const handleSlideClick = (slideId: string) => {
    dispatch(selectSlide(slideId))
  }

  const [draggedSlideId, setDraggedSlideId] = useState<string | null>(null)

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

  const [fullScreenSlideShow, setFullScreenSlideShow] = useState(false)

  const openFullScreenSlideShow = () => {
    setFullScreenSlideShow(true)
  }

  const closeFullScreenSlideShow = () => {
    setFullScreenSlideShow(false)
  }

  return (
    <div>
      <Menu />
      <div onDragOver={(e) => e.preventDefault()} onDragEnd={handleDragEnd}>
        {slides.map((slide: Slide) => (
          <div key={slide.id} className={styles.workField}>
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
        {fullScreenSlideShow && <SlideShow slides={slides} onClose={closeFullScreenSlideShow} />}
      </div>
      <div className="start-slide-show-button" onClick={openFullScreenSlideShow}>
        Start Slide Show
      </div>
    </div>
  )
}
