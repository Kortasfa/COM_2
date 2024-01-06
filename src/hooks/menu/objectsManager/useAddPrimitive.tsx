import { Figures, ObjectType, Primitive } from '../../../types/types'

export const addNewPrimitive = (primitiveType: Figures): Primitive => {
  return {
    id: `primitive-${Math.random().toString(36).substr(2, 9)}}`,
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    type: ObjectType.PRIMITIVE,
    primitiveType: primitiveType,
    fillColor: { hex: 'red', opacity: 1 },
    outlineColor: { hex: '#000000', opacity: 1 },
  }
}
