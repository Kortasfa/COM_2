import { useState } from 'react'
import { Presentation, Slide } from '../../../types/types'

export function useMoveObject(
    presentationData: Presentation,
    updatePresentationData: (data: Presentation) => void,
    selectedObjectId?: string,
) {
    const [tempCoordinates, setTempCoordinates] = useState<{ x: number; y: number } | null>(null)

    const startMovingObject = (initialCoordinates: { x: number; y: number }) => {
        if (selectedObjectId) {
            setTempCoordinates(initialCoordinates)
        }
    }

    const moveObject = (newCoordinates: { x: number; y: number }) => {
        setTempCoordinates(newCoordinates)
    }

    const finalizeMovement = () => {
        if (!selectedObjectId || !tempCoordinates) {
            return
        }

        const updatedSlides = presentationData.slides.map((slide: Slide) => {
            if (slide.objects.some((object) => object.id === selectedObjectId)) {
                return {
                    ...slide,
                    objects: slide.objects.map((object) => {
                        if (object.id === selectedObjectId) {
                            return {
                                ...object,
                                coordinates: tempCoordinates,
                            }
                        }
                        return object
                    }),
                }
            }
            return slide
        })

        updatePresentationData({
            ...presentationData,
            slides: updatedSlides,
        })

        // Reset the temporary coordinates
        setTempCoordinates(null)
    }

    return { startMovingObject, moveObject, finalizeMovement }
}
