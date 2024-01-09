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
  CHANGE_FONT,
  CHANGE_PRIMITIVE_COLOR,
  CHANGE_THEME,
  UNDO,
  REDO,
} from './types'
import { Color, Image, Presentation, Text, Primitive, Slide, SlideObject } from '../../types/types'

export const addSlide = () =>
  ({
    type: ADD_SLIDE,
  }) as const

export const removeSlide = (slideId: string) =>
  ({
    type: REMOVE_SLIDE,
    payload: { slideId },
  }) as const
export const updateSlideObject = (slideId: string, objectId: string, object: SlideObject) =>
  ({
    type: UPDATE_SLIDE_OBJECT,
    payload: { slideId, objectId, object },
  }) as const

export const addImage = (slideId: string, image: Image) =>
  ({
    type: ADD_IMAGE,
    payload: {
      slideId,
      image,
    },
  }) as const

export const selectSlide = (selectedSlideId: string) =>
  ({
    type: SELECT_SLIDE,
    payload: { selectedSlideId },
  }) as const

export const selectObject = (selectedSlideId: string, selectedObjectId: string) =>
  ({
    type: SELECT_OBJECT,
    payload: {
      selectedSlideId,
      selectedObjectId,
    },
  }) as const

export const addText = (slideId: string, text: Text) =>
  ({
    type: ADD_TEXT,
    payload: {
      slideId,
      text,
    },
  }) as const

export const changeBackgroundColor = (slideId: string, color: Color) =>
  ({
    type: CHANGE_BACKGROUND_COLOR,
    payload: {
      slideId,
      color,
    },
  }) as const

export const addPrimitive = (slideId: string, primitive: Primitive) =>
  ({
    type: ADD_PRIMITIVE,
    payload: {
      slideId,
      primitive,
    },
  }) as const

export const deleteObject = (slideId: string, objectId: string) =>
  ({
    type: DELETE_OBJECT,
    payload: { slideId, objectId },
  }) as const

export const importParsedData = (parsedData: Presentation) =>
  ({
    type: IMPORT_PARSED_DATA,
    payload: { parsedData },
  }) as const

export const updatePresentationData = (slides: Slide[]) =>
  ({
    type: UPDATE_PRESENTATION_DATA,
    payload: { slides },
  }) as const

export const changeFont = (
  slideId: string,
  objectId: string,
  fontFamily: string,
  color: Color,
  fontSize: number,
  fontWeight: string,
  fontStyle: string,
  fontUnderline: string,
) =>
  ({
    type: CHANGE_FONT,
    payload: {
      slideId,
      objectId,
      fontFamily,
      color,
      fontSize,
      fontWeight,
      fontStyle,
      fontUnderline,
    },
  }) as const

export const changePrimitiveColor = (slideId: string, objectId: string, color: Color) =>
  ({
    type: CHANGE_PRIMITIVE_COLOR,
    payload: {
      slideId,
      objectId,
      color,
    },
  }) as const

export const changeTheme = (presTheme: string) =>
  ({
    type: CHANGE_THEME,
    payload: { presTheme },
  }) as const

export const undoAction = () =>
  ({
    type: UNDO,
  }) as const

export const redoAction = () =>
  ({
    type: REDO,
  }) as const
