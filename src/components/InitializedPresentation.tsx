import { Color, Slide, Presentation } from '../types/types'

const defaultColor: Color = { hex: '#FFFFFF', opacity: 1 }

const defaultSlide: Slide = {
  id: '1',
  objects: [],
  background: { color: defaultColor },
}

const InitializedPresentation: Presentation = {
  id: 'presentation-id',
  name: 'New Presentation',
  presentationTheme: 'light',
  slides: [defaultSlide],
  history: [],
}

export default InitializedPresentation
