import { Presentation } from '../../../types/types'

export const useDeleteSlide = (
  presentationData: Presentation,
  updatePresentationData: (arg0: Presentation) => void,
  setSelectedSlideId?: (arg0: string) => void,
  selectedSlideId?: string,
) => {
  return () => {
    if (!selectedSlideId) return

    const slideIndex = presentationData.slides.findIndex((slide) => slide.id === selectedSlideId)

    if (slideIndex === -1) return

    let previousSlideIndex = slideIndex - 1
    if (previousSlideIndex < 0) previousSlideIndex = 0

    const updatedSlides = [...presentationData.slides]
    updatedSlides.splice(slideIndex, 1)

    const previousSlideId = updatedSlides[previousSlideIndex]?.id

    updatePresentationData({
      ...presentationData,
      slides: updatedSlides,
    })

    if (setSelectedSlideId) {
      setSelectedSlideId(previousSlideId)
    }
  }
}

export default useDeleteSlide
