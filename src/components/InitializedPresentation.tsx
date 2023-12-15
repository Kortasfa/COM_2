import { Color, Slide, History, Presentation, Text, ObjectType } from '../types/types'

const defaultColor: Color = { hex: '#FFFFFF', opacity: 1 }

const color: Color = {
  hex: 'black',
  opacity: 0.5,
}

const textBlock2: Text = {
  id: 'textBlock2',
  coordinates: { x: 240, y: 410 },
  width: 100,
  height: 50,
  value: 'Text2',
  color: color,
  fontSize: 20,
  fontFamily: 'oxygen',
  type: ObjectType.TEXTBLOCK,
}

const textBlock: Text = {
  id: 'textBlock1',
  coordinates: { x: 140, y: 210 },
  width: 100,
  height: 50,
  value: 'Text',
  color: color,
  fontSize: 20,
  fontFamily: 'oxygen',
  type: ObjectType.TEXTBLOCK,
}

const defaultSlide: Slide = {
  id: '1',
  objects: [],
  background: { color: defaultColor },
}

const defaultHistory: History = {
  events: [],
}

const InitializedPresentation: Presentation = {
  id: 'presentation-id',
  name: 'New Presentation',
  history: defaultHistory,
  slides: [defaultSlide],
  selection: undefined,
}

export default InitializedPresentation
