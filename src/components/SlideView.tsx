import React from 'react'
import { ObjectType, Slide } from '../types/types'
import { TextBlock } from './Objects/TextBlock'
import { ImageBlock } from './Objects/ImageBlock'
import styles from './SlideView.module.css'
import { PrimitiveBlock } from './Objects/PrimitiveBlock'
import { useDraggable } from '../hooks/useDragAndDrop'

function SlideView(props: {
    slideData: Slide
    selectionSlideClass?: string
    scale?: number
    index?: number
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
    isSlideSelected?: boolean
    selectedObjectId?: string
    onObjectClick?: (objectId: string) => void
    updateSlide?: (data: Slide) => void
}) {
    const { objects, background } = props.slideData
    const { position, onMouseDown: onMouseDownDrag, onMouseMove, onMouseUp } = useDraggable()

    return (
        <div>
            <div
                className={props.selectionSlideClass || styles.sideSlide}
                style={{
                    backgroundColor: background.color.hex,
                    ...(props.isSlideSelected && {
                        outlineColor: 'black',
                        outlineWidth: '1px',
                    }),
                }}
                onClick={props.onClick}
            >
                {objects.map((object) => {
                    switch (object.type) {
                        case ObjectType.TEXTBLOCK:
                            return (
                                <TextBlock
                                    textBlockData={object}
                                    key={object.id}
                                    scale={props.scale || 100}
                                    isSelected={object.id === props.selectedObjectId}
                                    onClick={() => props.onObjectClick && props.onObjectClick(object.id)}
                                ></TextBlock>
                            )
                        case ObjectType.IMAGE:
                            return (
                                <ImageBlock
                                    imageBlockData={object}
                                    key={object.id}
                                    scale={props.scale || 100}
                                    isSelected={object.id === props.selectedObjectId}
                                    onClick={() => props.onObjectClick && props.onObjectClick(object.id)}
                                ></ImageBlock>
                            )
                        case ObjectType.PRIMITIVE:
                            return (
                                <PrimitiveBlock
                                    primitiveBlockData={object}
                                    key={object.id}
                                    scale={props.scale || 100}
                                    isSelected={object.id === props.selectedObjectId}
                                    onClick={() => props.onObjectClick && props.onObjectClick(object.id)}
                                ></PrimitiveBlock>
                            )
                        default:
                            return null
                    }
                })}
            </div>
        </div>
    )
}

export { SlideView }
