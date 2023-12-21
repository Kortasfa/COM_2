import React from 'react'
import { ObjectType, Slide, SlideObject } from '../types/types'
import { TextBlock } from './Objects/TextBlock'
import { ImageBlock } from './Objects/ImageBlock'
import styles from './SlideView.module.css'
import { PrimitiveBlock } from './Objects/PrimitiveBlock'

interface SlideView {
    slide: Slide
    scale?: number
    index?: number
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
    isSlideSelected?: boolean
    selectedObjectId?: string
    onObjectClick?: (objectId: string) => void
    updateObject?: (data: SlideObject) => void
    selectionSlideClass?: string
}

export const SlideView = (props: SlideView) => {
    const { objects, background } = props.slide
    return (
        <div>
            <div
                className={props.selectionSlideClass || styles.sideSlide}
                style={{
                    backgroundColor: background.color.hex,
                    ...(props.isSlideSelected && {
                        outlineColor: '#3498db',
                        outlineWidth: '3px',
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
                                    updateObject={props.updateObject}
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
                                    updateObject={props.updateObject}
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
                                    updateObject={props.updateObject}
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
