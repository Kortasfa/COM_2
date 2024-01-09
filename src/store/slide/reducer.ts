import {
  Action,
  ADD_IMAGE,
  ADD_PRIMITIVE,
  ADD_SLIDE,
  ADD_TEXT,
  CHANGE_BACKGROUND_COLOR,
  CHANGE_FONT,
  CHANGE_PRIMITIVE_COLOR,
  DELETE_OBJECT,
  IMPORT_PARSED_DATA,
  REDO,
  REMOVE_SLIDE,
  SELECT_OBJECT,
  SELECT_SLIDE,
  UNDO,
  UPDATE_PRESENTATION_DATA,
  UPDATE_SLIDE_OBJECT,
} from './types'
import { ActionTypes, Background, Image, Primitive, Slide, SlideObject, Text } from '../../types/types'
import { initialState } from './initialState'
import { createNewSlide } from './createSlide'

export const presentationReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_IMAGE: {
      const { slideId, image } = action.payload
      const addObject = {
        objectId: image.id,
        id: slideId,
        type: ActionTypes.ADD_OBJECT,
      }
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
          history: [state.presentation.history, addObject],
        },
      }
    }

    case ADD_TEXT: {
      const { slideId, text } = action.payload
      const addObject = {
        objectId: text.id,
        id: slideId,
        type: ActionTypes.ADD_OBJECT,
      }
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
          history: [state.presentation.history, addObject],
        },
      }
    }

    case CHANGE_BACKGROUND_COLOR: {
      const { slideId, color } = action.payload
      let saveColor
      const updatedSlides = state.presentation.slides.map((slide) => {
        if (slide.id === slideId) {
          saveColor = slide.background.color
          return {
            ...slide,
            background: {
              ...slide.background,
              color: color,
            },
          }
        }
        return slide
      })

      const changeColor = {
        id: slideId,
        color: saveColor,
        type: ActionTypes.CHANGE_SLIDE_COLOR,
      }

      return {
        ...state,
        presentation: {
          ...state.presentation,
          slides: updatedSlides,
          history: [...state.presentation.history, changeColor],
        },
      }
    }

    case ADD_PRIMITIVE: {
      const { slideId, primitive } = action.payload

      const addObject = {
        objectId: primitive.id,
        id: slideId,
        type: ActionTypes.ADD_OBJECT,
      }

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
          history: [...state.presentation.history, addObject],
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
      let obj
      const updatedSlides = state.presentation.slides.map((slide: Slide) => {
        if (slide.id === slideId) {
          obj = slide.objects.find((object) => object.id == objectId)
          return {
            ...slide,
            objects: slide.objects.filter((object) => object.id !== objectId),
          }
        }
        return slide
      })
      const deleteObject = {
        object: obj,
        id: slideId,
        type: ActionTypes.REMOVE_OBJECT,
      }
      return {
        ...state,
        selectedObjectId: '',
        presentation: {
          ...state.presentation,
          slides: updatedSlides,
          history: [state.presentation.history, deleteObject],
        },
      }
    }

    case ADD_SLIDE: {
      const newSlide = createNewSlide()
      const addSlide = {
        id: newSlide.id,
        type: ActionTypes.ADD_SLIDE,
      }
      return {
        ...state,
        presentation: {
          ...state.presentation,
          slides: [...state.presentation.slides, newSlide],
          history: [...state.presentation.history, addSlide],
        },
      }
    }

    case REMOVE_SLIDE: {
      const slideId = action.payload.slideId
      const saveSlide = state.presentation.slides.find((slide: Slide) => slide.id === slideId)
      const index = state.presentation.slides.findIndex((slide: Slide) => slide.id === slideId)
      const deleteSlide = {
        slide: saveSlide,
        index: index,
        type: ActionTypes.DELETE_SLIDE,
      }
      const updatedSlides = state.presentation.slides.filter((slide: Slide) => slide.id !== slideId)
      return {
        ...state,
        presentation: {
          ...state.presentation,
          slides: updatedSlides,
          history: [...state.presentation.history, deleteSlide],
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
        presentation: action.payload.parsedData,
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

    case UNDO: {
      if (state.presentation.history.length > 0) {
        const lastAction = state.presentation.history[state.presentation.history.length - 1]
        state.presentation.history.pop()
        let updatedSlides
        let slideId: string, objectId: string
        let slideToInsert: Slide
        let indexToInsert: number
        let object: Text | Image | Primitive
        switch (lastAction.type) {
          case ActionTypes.ADD_SLIDE:
            slideId = lastAction.id
            updatedSlides = state.presentation.slides.filter((slide: Slide) => slide.id !== slideId)
            return {
              ...state,
              presentation: {
                ...state.presentation,
                slides: updatedSlides,
              },
            }
          case ActionTypes.DELETE_SLIDE:
            slideToInsert = lastAction.slide
            indexToInsert = lastAction.index

            updatedSlides = [...state.presentation.slides]
            updatedSlides.splice(indexToInsert, 0, slideToInsert)

            return {
              ...state,
              presentation: {
                ...state.presentation,
                slides: updatedSlides,
              },
            }
          case ActionTypes.CHANGE_SLIDE_COLOR:
            slideId = lastAction.id
            updatedSlides = state.presentation.slides.map((slide) => {
              if (slide.id === slideId) {
                return {
                  ...slide,
                  background: {
                    ...slide.background,
                    color: lastAction.color,
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
          case ActionTypes.ADD_OBJECT:
            slideId = lastAction.id
            objectId = lastAction.objectId
            updatedSlides = state.presentation.slides.map((slide: Slide) => {
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
          case ActionTypes.REMOVE_OBJECT:
            object = lastAction.object
            slideId = lastAction.id
            updatedSlides = state.presentation.slides.map((slide: Slide) => {
              if (slide.id === slideId) {
                console.log('123')
                return {
                  ...slide,
                  objects: [...slide.objects, object],
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
      }
      return state
    }

    case REDO: {
      return state
    }

    default:
      return state
  }
}
