import { ObjectType, Presentation, Slide, Text } from '../../../types/types'

export function useAddText(
    presentationData: Presentation,
    updatePresentationData: (data: Presentation) => void,
    selectedSlideId?: string,
) {
    return (
        textValue: string,
        initialPosition: { x: number; y: number },
        initialSize: { width: number; height: number },
    ) => {
        const newTextBlock: Text = {
            id: `text-${Math.random().toString(36).substr(2, 9)}`,
            coordinates: {
                x: initialPosition.x,
                y: initialPosition.y,
            },
            width: initialSize.width,
            height: initialSize.height,
            type: ObjectType.TEXTBLOCK,
            value: textValue,
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
