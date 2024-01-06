import { ObjectType, Text } from '../../../types/types'

export const addNewText = (): Text => {
  return {
    id: `text-${Math.random().toString(36).substr(2, 9)}`,
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    type: ObjectType.TEXTBLOCK,
    value: 'New Text',
    color: { hex: '#000000', opacity: 1 },
    fontSize: 16,
    fontFamily: 'Arial',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontUnderline: 'normal',
  }
}
