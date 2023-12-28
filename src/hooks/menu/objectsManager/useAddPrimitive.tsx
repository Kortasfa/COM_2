import { Figures, ObjectType, Presentation, Primitive, Slide } from '../../../types/types'

export function useAddPrimitive(
  presentationData: Presentation,
  updatePresentationData: (data: Presentation) => void,
  selectedSlideId?: string,
) {
  return (primitiveType: Figures) => {
    const newPrimitive: Primitive = {
      id: `primitive-${Math.random().toString(36).substr(2, 9)}}`,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      type: ObjectType.PRIMITIVE,
      primitiveType: primitiveType,
      fillColor: { hex: 'red', opacity: 1 },
      outlineColor: { hex: '#000000', opacity: 1 },
    }

    const updatedSlides = presentationData.slides.map((slide: Slide) => {
      if (slide.id === selectedSlideId) {
        return {
          ...slide,
          objects: [...slide.objects, newPrimitive],
        }
      }
      return slide
    })

    const updatedPresentationData = {
      ...presentationData,
      slides: updatedSlides,
    }

    updatePresentationData(updatedPresentationData)
  }
}
