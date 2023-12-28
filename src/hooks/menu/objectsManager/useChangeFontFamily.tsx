import { Presentation, Slide, ObjectType, Color } from '../../../types/types'

export function useChangeFont(
  presentationData: Presentation,
  updatePresentationData: (data: Presentation) => void,
  selectedObjectId?: string | null,
  selectedSlideId?: string,
) {
  return ({ fontFamily, fontSize, color }: { fontFamily: string; fontSize: number; color: Color }) => {
    const updatedSlides = presentationData.slides.map((slide: Slide) => {
      if (slide.id === selectedSlideId) {
        const updatedObjects = slide.objects.map((obj) => {
          if (obj.id === selectedObjectId && obj.type === ObjectType.TEXTBLOCK) {
            return {
              ...obj,
              fontFamily: fontFamily ? fontFamily : obj.fontFamily,
              fontSize: fontSize ? fontSize : obj.fontSize,
              color: color ? color : obj.color,
            }
          }
          return obj
        })
        return {
          ...slide,
          objects: updatedObjects,
        }
      }
      return slide
    })

    const updatedPresentationData: Presentation = {
      ...presentationData,
      slides: updatedSlides,
    }

    updatePresentationData(updatedPresentationData)
  }
}
