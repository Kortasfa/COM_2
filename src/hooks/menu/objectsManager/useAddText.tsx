import { ObjectType, Presentation, Slide, Text } from '../../../types/types'

export function useAddText(
  presentationData: Presentation,
  updatePresentationData: (data: Presentation) => void,
  selectedSlideId?: string,
) {
  return () => {
    const newTextBlock: Text = {
      id: `text-${Math.random().toString(36).substr(2, 9)}`,
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      type: ObjectType.TEXTBLOCK,
      value: 'New Text',
      color: { hex: '#000000', opacity: 1 },
      fontSize: 16,
      fontFamily: 'Arial',
    }

    const updatedSlides = presentationData.slides.map((slide: Slide) => {
      if (slide.id === selectedSlideId) {
        return {
          ...slide,
          objects: [...slide.objects, newTextBlock],
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
