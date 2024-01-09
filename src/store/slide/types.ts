import { Color, Image, Presentation, Primitive, Slide, SlideObject } from '../../types/types'

export const REMOVE_SLIDE = 'REMOVE_SLIDE'
export const CHANGE_BACKGROUND_COLOR = 'CHANGE_BACKGROUND_COLOR'
export const SELECT_SLIDE = 'SELECT_SLIDE'
export const SELECT_OBJECT = 'SELECT_OBJECT'
export const ADD_SLIDE = 'ADD_SLIDE'
export const ADD_IMAGE = 'ADD_IMAGE'
export const ADD_TEXT = 'ADD_TEXT'
export const ADD_PRIMITIVE = 'ADD_PRIMITIVE'
export const MOVE_OBJECT = 'MOVE_OBJECT'
export const DELETE_OBJECT = 'DELETE_OBJECT'
export const UPDATE_SLIDE_OBJECT = 'UPDATE_SLIDE_OBJECT'
export const IMPORT_PARSED_DATA = 'IMPORT_PARSED_DATA'
export const UPDATE_PRESENTATION_DATA = 'UPDATE_PRESENTATION_DATA'
export const CHANGE_FONT = 'CHANGE_FONT'
export const CHANGE_PRIMITIVE_COLOR = 'CHANGE_PRIMITIVE_COLOR'
export const CHANGE_THEME = 'CHANGE_THEME'

interface AddImagePayload {
  slideId: string
  image: Image
}

interface AddTextPayload {
  slideId: string
  text: SlideObject
}

interface ChangeBackgroundColorPayload {
  slideId: string
  color: Color
}

interface AddPrimitivePayload {
  slideId: string
  primitive: Primitive
}

interface UpdateSlideObjectPayload {
  slideId: string
  objectId: string
  object: SlideObject
}

interface DeleteObjectPayload {
  slideId: string
  objectId: string
}

interface RemoveSlidePayload {
  slideId: string
}

interface SelectSlidePayload {
  selectedSlideId: string
}

interface SelectObjectPayload {
  selectedSlideId: string
  selectedObjectId: string
}

interface ImportParsedDataPayload {
  parsedData: Presentation
}

interface UpdatePresentationDataPayload {
  slides: Slide[]
}

interface ChangeFontPayload {
  slideId: string
  objectId: string
  fontFamily: string
  fontSize: number
  color: Color
  fontWeight: string
  fontStyle: string
  fontUnderline: string
}

interface ChangePrimitiveColorPayload {
  slideId: string
  objectId: string
  color: Color
}

interface ChangeThemePayload
{
  presTheme: string
}

export type Action =
  | { type: typeof ADD_IMAGE; payload: AddImagePayload }
  | { type: typeof ADD_TEXT; payload: AddTextPayload }
  | { type: typeof CHANGE_BACKGROUND_COLOR; payload: ChangeBackgroundColorPayload }
  | { type: typeof ADD_PRIMITIVE; payload: AddPrimitivePayload }
  | { type: typeof UPDATE_SLIDE_OBJECT; payload: UpdateSlideObjectPayload }
  | { type: typeof DELETE_OBJECT; payload: DeleteObjectPayload }
  | { type: typeof ADD_SLIDE }
  | { type: typeof REMOVE_SLIDE; payload: RemoveSlidePayload }
  | { type: typeof SELECT_SLIDE; payload: SelectSlidePayload }
  | { type: typeof SELECT_OBJECT; payload: SelectObjectPayload }
  | { type: typeof IMPORT_PARSED_DATA; payload: ImportParsedDataPayload }
  | { type: typeof UPDATE_PRESENTATION_DATA; payload: UpdatePresentationDataPayload }
  | { type: typeof CHANGE_FONT; payload: ChangeFontPayload }
  | { type: typeof CHANGE_PRIMITIVE_COLOR; payload: ChangePrimitiveColorPayload }
  | { type: typeof CHANGE_THEME; payload: ChangeThemePayload }