import { Color, Slide } from '../../types/types'

function createNewSlide(): Slide {
  const defaultColor: Color = { hex: '#FFFFFF', opacity: 1 }
  return {
    id: `slide-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
    objects: [],
    background: { color: defaultColor },
  }
}

export { createNewSlide }
