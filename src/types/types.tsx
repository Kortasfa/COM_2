enum Figures {
  TRIANGLE = 'triangle',
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
}

enum ObjectType {
  IMAGE = 'image',
  TEXTBLOCK = 'textBlock',
  PRIMITIVE = 'primitive',
}

type SlideObject = {
  id: string
  x: number
  y: number
  width: number
  height: number
}

type Color = {
  hex: string
  opacity: number
}

type Text = SlideObject & {
  value: string
  color: Color
  fontSize: number
  fontFamily: string
  fontWeight: string
  fontStyle: string
  fontUnderline: string
  type: ObjectType.TEXTBLOCK
}

type Primitive = SlideObject & {
  primitiveType: Figures
  fillColor: Color
  type: ObjectType.PRIMITIVE
}

type Image = SlideObject & {
  type: ObjectType.IMAGE
  base64: string
}

type Background = {
  color: Color
  base64?: string
}

type Slide = {
  id: string
  objects: Array<Image | Text | Primitive>
  background: Background
}

enum ActionTypes {
  ADD_SLIDE = 'addSlide',
  DELETE_SLIDE = 'deleteSlide',
  CHANGE_SLIDE_COLOR = 'changeSlideColor',
  ADD_OBJECT = 'addObject',
  REMOVE_OBJECT = 'removeObject',
}

type AddSlide = {
  id: string
  type: ActionTypes.ADD_SLIDE
}

type DeleteSlide = {
  slide: Slide
  index: number
  type: ActionTypes.DELETE_SLIDE
}

type ChangeSlideColor = {
  id: string
  color: Color
  type: ActionTypes.CHANGE_SLIDE_COLOR
}

type AddObject = {
  objectId: string
  id: string
  type: ActionTypes.ADD_OBJECT
}

type RemoveObject = {
  object: Text | Primitive | Image
  id: string
  type: ActionTypes.REMOVE_OBJECT
}

type Action = AddSlide | DeleteSlide | ChangeSlideColor | AddObject | RemoveObject

type Presentation = {
  id: string
  name: string
  slides: Array<Slide>
  selectedSlideId?: string
  selectedObjectId?: string
  presentationTheme: string
  history: Array<Action>
}

export { Figures, ObjectType, ActionTypes }
export type { Text, Image, Primitive, SlideObject, Presentation, Background, Slide, Color, AddSlide, DeleteSlide }
