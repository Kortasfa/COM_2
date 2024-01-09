import { Background, Presentation, Slide } from '../../../types/types'

export const useChangeColor = (
  presentationData: Presentation,
  updatePresentationData: (data: Presentation) => void,
  selectedSlideId?: string,
) => {
  return (color: string) => {
    if (!selectedSlideId) return
    const updatedSlides = presentationData.slides.map((slide: Slide) => {
      const newBackground: Background = { color: { hex: color, opacity: 1 } }
      if (slide.id === selectedSlideId) {
        return {
          ...slide,
          background: newBackground,
        }
      }
      return slide
    })
    updatePresentationData({
      ...presentationData,
      slides: updatedSlides,
    })
  }
}
