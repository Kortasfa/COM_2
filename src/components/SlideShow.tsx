import React, { useState, useEffect } from 'react'
import { Slide } from '../types/types'
import { SlideView } from './SlideView'

interface SlideShowProps {
  slides: Slide[]
  onClose: () => void
}

export const SlideShow: React.FC<SlideShowProps> = ({ slides, onClose }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex < slides.length - 1 ? prevIndex + 1 : prevIndex))
  }

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
  }

  useEffect(() => {
    // Reset slide index when the component mounts
    setCurrentSlideIndex(0)
  }, [])

  return (
    <div className="slide-show">
      <div className="close-button" onClick={onClose}>
        Close
      </div>
      <div className="slide-show-content">
        <div className="prev-button" onClick={handlePrevSlide}>
          Previous
        </div>
        <SlideView slide={slides[currentSlideIndex]} />
        <div className="next-button" onClick={handleNextSlide}>
          Next
        </div>
      </div>
    </div>
  )
}
