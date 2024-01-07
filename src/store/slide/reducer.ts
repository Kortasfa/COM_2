import {
  ADD_IMAGE,
  ADD_PRIMITIVE,
  ADD_SLIDE,
  ADD_TEXT,
  CHANGE_BACKGROUND_COLOR,
  CHANGE_FONT,
  CHANGE_PRIMITIVE_COLOR,
  DELETE_OBJECT,
  IMPORT_PARSED_DATA,
  REMOVE_SLIDE,
  SELECT_OBJECT,
  SELECT_SLIDE,
  UPDATE_PRESENTATION_DATA,
  UPDATE_SLIDE_OBJECT,
} from './types'
import { Color, Slide } from '../../types/types'
import InitializedPresentation from '../../components/InitializedPresentation'

const INITIAL_SLIDE_ID = 0
export const initialState = {
  presentation: InitializedPresentation,
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
      const updatedSlides = state.presentation.slides.map((slide: Slide) => {
        if (slide.id === slideId) {
          return {
            ...slide,
            objects: [...slide.objects, image],
          }
        }
        return slide
      })
      return {
        ...state,
        selectedObjectId: '',
        presentation: {
          ...state.presentation,
          slides: updatedSlides,
        },
      }
    }

    case ADD_TEXT: {
      const { slideId, text } = action.payload
      const updatedSlides = state.presentation.slides.map((slide) => {
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
        selectedObjectId: '',
        presentation: {
          ...state.presentation,
          slides: updatedSlides,
        },
      }
    }

    case CHANGE_BACKGROUND_COLOR: {
      const { slideId, color } = action.payload
      const updatedSlides = state.presentation.slides.map((slide) => {
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
        presentation: {
          ...state.presentation,
          slides: updatedSlides,
        },
      }
    }

    case ADD_PRIMITIVE: {
      const { slideId, primitive } = action.payload
      const updatedSlides = state.presentation.slides.map((slide: Slide) => {
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
        selectedObjectId: '',
        presentation: {
          ...state.presentation,
          slides: updatedSlides,
        },
      }
    }

    case UPDATE_SLIDE_OBJECT: {
      const { slideId, objectId, object } = action.payload
      const updatedSlides = state.presentation.slides.map((slide: Slide) => {
        if (slide.id === slideId) {
          const updatedObjects = slide.objects.map((obj) => {
            if (obj.id === objectId) {
              return {
                ...obj,
                ...object,
              }
            }
            return obj
          })
          return {
            ...slide,
            objects: updatedObjects,
          }
        }
        return slide
      })
      return {
        ...state,
        presentation: {
          ...state.presentation,
          slides: updatedSlides,
        },
      }
    }

    case DELETE_OBJECT: {
      const { slideId, objectId } = action.payload
      const updatedSlides = state.presentation.slides.map((slide: Slide) => {
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
        selectedObjectId: '',
        presentation: {
          ...state.presentation,
          slides: updatedSlides,
        },
      }
    }

    case ADD_SLIDE: {
      const newSlide = createNewSlide()
      return {
        ...state,
        presentation: {
          ...state.presentation,
          slides: [...state.presentation.slides, newSlide],
        },
      }
    }

    case REMOVE_SLIDE: {
      const slideId = action.payload
      const updatedSlides = state.presentation.slides.filter((slide: Slide) => slide.id !== slideId)
      return {
        ...state,
        presentation: {
          ...state.presentation,
          slides: updatedSlides,
        },
      }
    }

    case SELECT_SLIDE:
      return {
        ...state,
        selectedSlideId: action.payload.selectedSlideId,
      }

    case SELECT_OBJECT:
      return {
        ...state,
        selectedObjectId: action.payload.selectedObjectId,
      }

    case IMPORT_PARSED_DATA:
      return {
        ...state,
        presentation: {
          ...state.presentation,
          slides: action.payload.parsedData,
        },
      }

    case UPDATE_PRESENTATION_DATA: {
      return {
        ...state.presentation,
        presentation: { slides: action.payload.slides },
      }
    }

    case CHANGE_FONT: {
      const { slideId, objectId, fontFamily, fontSize, color, fontWeight, fontStyle, fontUnderline } = action.payload
      const updatedSlides = state.presentation.slides.map((slide: Slide) => {
        if (slide.id === slideId) {
          const updatedObjects = slide.objects.map((obj) => {
            if (obj.id === objectId) {
              return {
                ...obj,
                fontFamily: fontFamily,
                fontSize: fontSize,
                color: color,
                fontWeight: fontWeight,
                fontStyle: fontStyle,
                fontUnderline: fontUnderline,
              }
            }
            return obj
          })
          return {
            ...slide,
            objects: updatedObjects,
          }
        }
        return slide
      })
      return {
        ...state,
        presentation: {
          ...state.presentation,
          slides: updatedSlides,
        },
      }
    }

    case CHANGE_PRIMITIVE_COLOR: {
      const { slideId, objectId, color } = action.payload
      console.log(color)
      const updatedSlides = state.presentation.slides.map((slide: Slide) => {
        if (slide.id === slideId) {
          const updatedObjects = slide.objects.map((obj) => {
            if (obj.id === objectId) {
              return {
                ...obj,
                fillColor: color,
              }
            }
            return obj
          })
          return {
            ...slide,
            objects: updatedObjects,
          }
        }
        return slide
      })
      return {
        ...state,
        presentation: {
          ...state.presentation,
          slides: updatedSlides,
        },
      }
    }

    default:
      return state
  }
}

