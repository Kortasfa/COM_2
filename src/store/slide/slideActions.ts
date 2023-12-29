import {
  ADD_SLIDE,
  REMOVE_SLIDE,
  UPDATE_SLIDE_OBJECT,
  ADD_IMAGE,
  ADD_PRIMITIVE,
  ADD_TEXT,
  DELETE_OBJECT,
  MOVE_OBJECT,
  SELECT_SLIDE,
  CHANGE_BACKGROUND_COLOR,
} from './types'
import { SlideObject } from '../../types/types'

export const addSlide = () => ({
  type: ADD_SLIDE,
})

export const deleteSlide = (slideId: string) => ({
  type: REMOVE_SLIDE,
  payload: slideId,
})

export const updateSlideObject = (slideId: string, objectId: string, updatedData: any) => ({
  type: UPDATE_SLIDE_OBJECT,
  payload: { slideId, objectId, updatedData },
})

export const addImage = (slideId: string, image: string) => ({
  type: ADD_IMAGE,
  payload: { slideId, image },
})

export const selectSlide = (selectedSlideId: string) => ({
  type: SELECT_SLIDE,
  payload: { selectedSlideId },
})

// export const isSlideSelected = (status: boolean) => ({
//   type: IS_SLIDE_SELECTED,
//   payload: { status },
// })

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

export const moveObject = (slideId: string, objectId: any, coordinates: any) => ({
  type: MOVE_OBJECT,
  payload: { slideId, objectId, coordinates },
})

export const deleteObject = (slideId: string, objectId: any) => ({
  type: DELETE_OBJECT,
  payload: { slideId, objectId },
})

export type actions =
  | ReturnType<typeof addSlide>
  | ReturnType<typeof deleteSlide>
  | ReturnType<typeof updateSlideObject>
  | ReturnType<typeof addImage>
  | ReturnType<typeof selectSlide>
  | ReturnType<typeof addText>
  | ReturnType<typeof addPrimitive>
  | ReturnType<typeof moveObject>
  | ReturnType<typeof deleteObject>
