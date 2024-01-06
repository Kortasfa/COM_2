interface FontsState {
  fontFamily: string
  fontSize: number
  color: { hex: string; opacity: number }
  bold: boolean
  italic: boolean
}

const initialState: FontsState = {
  fontFamily: 'Arial',
  fontSize: 16,
  color: { hex: 'black', opacity: 1 },
  bold: false,
  italic: false,
}

const fontsReducer = (state: FontsState = initialState, action: any): FontsState => {
  switch (action.type) {
    case 'CHANGE_FONT_FAMILY':
      return { ...state, fontFamily: action.payload }

    case 'CHANGE_FONT_SIZE':
      return { ...state, fontSize: action.payload }

    case 'CHANGE_FONT_COLOR':
      return { ...state, color: action.payload }

    case 'SELECTED_BOLD':
      return { ...state, bold: !state.bold }

    case 'SELECTED_ITALIC':
      return { ...state, italic: !state.italic }

    default:
      return state
  }
}

export default fontsReducer
