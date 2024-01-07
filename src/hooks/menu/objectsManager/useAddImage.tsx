import { Image, ObjectType } from '../../../types/types'

export const addNewImage = (base64Image: string, width: number, height: number): Image => {
  return {
    id: `image-${Math.random().toString(36).substr(2, 9)}`,
    x: 0,
    y: 0,
    width: width,
    height: height,
    type: ObjectType.IMAGE,
    base64: base64Image,
  }
}
