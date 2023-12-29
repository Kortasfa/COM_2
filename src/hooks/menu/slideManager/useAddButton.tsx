import { Color, Presentation, Slide } from '../../../types/types'

function createNewSlide(): Slide {
  const defaultColor: Color = { hex: '#FFFFFF', opacity: 1 }
  return {
    id: `slide-${Math.random().toString(36).substr(2, 9)}`,
    objects: [],
    background: { color: defaultColor },
  }
}

export const useAddSlide = (presentationData: Presentation, updatePresentationData: (data: Presentation) => void) => {
  return () => {
    const newSlide = createNewSlide()
    const updatedSlides = [...presentationData.slides, newSlide]
    updatePresentationData({
      ...presentationData,
      slides: updatedSlides,
    })
  }
}
