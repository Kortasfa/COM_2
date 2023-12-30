import {
  ADD_SLIDE,
  REMOVE_SLIDE,
  UPDATE_SLIDE_OBJECT,
  ADD_IMAGE,
  ADD_PRIMITIVE,
  ADD_TEXT,
  DELETE_OBJECT,
  SELECT_SLIDE,
  CHANGE_BACKGROUND_COLOR,
  SELECT_OBJECT,
  IMPORT_PARSED_DATA,
  UPDATE_PRESENTATION_DATA,
} from './types'
import { Image, ObjectType, Presentation, Slide, SlideObject } from '../../types/types'
import initializedPresentation from '../../components/InitializedPresentation'

export const addSlide = () => ({
  type: ADD_SLIDE,
})

export const deleteSlide = (slideId: string) => ({
  type: REMOVE_SLIDE,
  payload: slideId,
})

export const updateSlideObject = (slideId: string, objectId: string, object: SlideObject) => ({
  type: UPDATE_SLIDE_OBJECT,
  payload: { slideId, objectId, object },
})

export const addImage = (slideId: string, image: Image) => ({
  type: ADD_IMAGE,
  payload: {
    slideId,
    image,
  },
})

export const selectSlide = (selectedSlideId: string) => ({
  type: SELECT_SLIDE,
  payload: { selectedSlideId },
})

export const selectObject = (selectedSlideId: string, selectedObjectId: string) => ({
  type: SELECT_OBJECT,
  payload: {
    selectedSlideId,
    selectedObjectId,
  },
})

export const addText = (slideId: string, text: any) => ({
  type: ADD_TEXT,
  payload: {
    slideId,
    text,
  },
})

export const changeBackgroundColor = (slideId: string, color: string) => ({
  type: CHANGE_BACKGROUND_COLOR,
  payload: {
    slideId,
    color,
  },
})

export const addPrimitive = (slideId: string, primitive: any) => ({
  type: ADD_PRIMITIVE,
  payload: {
    slideId,
    primitive,
  },
})

export const deleteObject = (slideId: string, objectId: string) => ({
  type: DELETE_OBJECT,
  payload: { slideId, objectId },
})

export const importParsedData = (parsedData: Presentation) => ({
  type: IMPORT_PARSED_DATA,
  payload: { parsedData },
})

export const updatePresentationData = (slides: Slide[]) => ({
  type: UPDATE_PRESENTATION_DATA,
  payload: { slides },
})

export type actions =
  | ReturnType<typeof addSlide>
  | ReturnType<typeof deleteSlide>
  | ReturnType<typeof updateSlideObject>
  | ReturnType<typeof addImage>
  | ReturnType<typeof selectSlide>
  | ReturnType<typeof addText>
  | ReturnType<typeof addPrimitive>
  | ReturnType<typeof deleteObject>
