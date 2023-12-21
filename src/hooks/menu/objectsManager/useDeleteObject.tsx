import { Presentation, Slide } from '../../../types/types'

export function useDeleteObject(
    presentationData: Presentation,
    updatePresentationData: (data: Presentation) => void,
    selectedObjectId?: string,
) {
    return () => {
        if (!selectedObjectId) {
            return
        }

        const updatedSlides = presentationData.slides.map((slide: Slide) => {
            const filteredObjects = slide.objects.filter((object: { id: string }) => object.id !== selectedObjectId)
            return {
                ...slide,
                objects: filteredObjects,
            }
        })

        const updatedPresentationData = {
            ...presentationData,
            slides: updatedSlides,
        }

        updatePresentationData(updatedPresentationData)
    }
}
