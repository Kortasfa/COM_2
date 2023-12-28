import { Image, ObjectType, Presentation, Slide } from '../../../types/types'

export function useAddImage(
  presentationData: Presentation,
  updatePresentationData: (data: Presentation) => void,
  selectedSlideId?: string,
) {
  return (base64Image: string) => {
    const newImage: Image = {
      id: `image-${Math.random().toString(36).substr(2, 9)}`,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      type: ObjectType.IMAGE,
      base64: base64Image,
    }

    const updatedSlides = presentationData.slides.map((slide: Slide) => {
      if (slide.id === selectedSlideId) {
        return {
          ...slide,
          objects: [...slide.objects, newImage],
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
