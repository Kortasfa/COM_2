import {
  ADD_IMAGE,
  ADD_PRIMITIVE,
  ADD_SLIDE,
  ADD_TEXT,
  CHANGE_BACKGROUND_COLOR,
  DELETE_OBJECT,
  MOVE_OBJECT,
  REMOVE_SLIDE, SELECT_OBJECT,
  SELECT_SLIDE,
} from './types'
import { Color, Slide } from '../../types/types'
import InitializedPresentation from '../../components/InitializedPresentation'
import { actions } from './slideActions'
const INITIAL_SLIDE_ID = 0
export const initialState = {
  slides: InitializedPresentation.slides,
  namePres: InitializedPresentation.name,
  idPres: InitializedPresentation.id,
  selectedSlideId: InitializedPresentation.slides[INITIAL_SLIDE_ID].id,
  selectedObjectId: InitializedPresentation.slides[INITIAL_SLIDE_ID].objects,
}

function createNewSlide(): Slide {
  const defaultColor: Color = { hex: '#FFFFFF', opacity: 1 }
  return {
    id: `slide-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
    objects: [],
    background: { color: defaultColor },
  }
}
export const slideReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_IMAGE: {
      const { slideId, image } = action.payload
      console.log('slideId', slideId)
      const updatedSlides = state.slides.map((slide: Slide) => {
        if (slide.id === slideId) {
          console.log(image)
          return {
            ...slide,
            objects: [...slide.objects, image],
          }
        }
        return slide
      })
      return {
        ...state,
        slides: updatedSlides,
      }
    }

    case ADD_TEXT: {
      const { slideId, text } = action.payload
      console.log(action)
      const updatedSlides = state.slides.map((slide) => {
        if (slide.id === slideId) {
          return {
            ...slide,
            objects: [...slide.objects, text],
          }
        }
        return slide
      })

      return {
        ...state,
        slides: updatedSlides,
      }
    }

    case CHANGE_BACKGROUND_COLOR: {
      const { slideId, color } = action.payload
      const updatedSlides = state.slides.map((slide) => {
        if (slide.id === slideId) {
          return {
            ...slide,
            background: {
              ...slide.background,
              color: { hex: color, opacity: 1 },
            },
          }
        }
        return slide
      })

      return {
        ...state,
        slides: updatedSlides,
      }
    }

    case ADD_PRIMITIVE: {
      const { slideId, primitive } = action.payload
      const updatedSlides = state.slides.map((slide: Slide) => {
        if (slide.id === slideId) {
          return {
            ...slide,
            objects: [...slide.objects, primitive],
          }
        }
        return slide
      })
      return {
        ...state,
        slides: updatedSlides,
      }
    }

    case MOVE_OBJECT: {
      const { slideId, objectId, coordinates } = action.payload
      const updatedSlides = state.slides.map((slide: Slide) => {
        if (slide.id === slideId) {
          return {
            ...slide,
            objects: slide.objects.map((object) => {
              if (object.id === objectId) {
                return {
                  ...object,
                  coordinates,
                }
              }
              return object
            }),
          }
        }
        return slide
      })
      return {
        ...state,
        slides: updatedSlides,
      }
    }

    case DELETE_OBJECT: {
      const { slideId, objectId } = action.payload
      const updatedSlides = state.slides.map((slide: Slide) => {
        if (slide.id === slideId) {
          return {
            ...slide,
            objects: slide.objects.filter((object) => object.id !== objectId),
          }
        }
        return slide
      })
      return {
        ...state,
        slides: updatedSlides,
      }
    }
    case ADD_SLIDE: {
      const newSlide = createNewSlide()
      return {
        ...state,
        slides: [...state.slides, newSlide],
      }
    }
    case REMOVE_SLIDE: {
      const slideId = action.payload
      const updatedSlides = state.slides.filter((slide: Slide) => slide.id !== slideId)
      return {
        ...state,
        slides: updatedSlides,
      }
    }

    case SELECT_SLIDE:
      return {
        ...state,
        selectedSlideId: action.payload.selectedSlideId,
      }

    case SELECT_OBJECT:
      console.log('action.payload.selectedObjectId', action.payload.selectedObjectId)
      return {
        ...state,
        selectedObjectId: action.payload.selectedObjectId,
      }
    default:
      return state
  }
}

export default slideReducer
