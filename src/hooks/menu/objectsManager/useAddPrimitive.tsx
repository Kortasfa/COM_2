import { Color, Figures, ObjectType, Presentation, Primitive, Slide } from '../../../types/types'

export function useAddPrimitive(
    presentationData: Presentation,
    updatePresentationData: (data: Presentation) => void,
    selectedSlideId?: string,
) {
    return (
        primitiveType: Figures,
        initialPosition: { x: number; y: number },
        initialSize: { width: number; height: number },
        fillColor?: Color,
        outlineColor?: Color,
    ) => {
        const newPrimitive: Primitive = {
            id: `primitive-${Math.random().toString(36).substr(2, 9)}}`,
            coordinates: {
                x: initialPosition.x,
                y: initialPosition.y,
            },
            width: initialSize.width,
            height: initialSize.height,
            type: ObjectType.PRIMITIVE,
            primitiveType: primitiveType,
            fillColor: fillColor || { hex: 'red', opacity: 1 },
            outlineColor: outlineColor || { hex: '#000000', opacity: 1 },
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
