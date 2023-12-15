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
  coordinates: {
    x: number
    y: number
  }
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
  type: ObjectType.TEXTBLOCK
}

type Primitive = SlideObject & {
  primitiveType: Figures
  outlineColor?: Color
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

type History = {
  events: string[]
}

type Selection = {
  slideId: string
  objectId?: string
}

type Presentation = {
  id: string
  name: string
  history: History
  slides: Array<Slide>
  selection?: Selection
}

export { Figures, ObjectType }
export type { Text, Image, Primitive, SlideObject, Presentation, Background, Slide, Color, History }
