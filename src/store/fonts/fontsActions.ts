export const changeFont = (fontData: {
  fontFamily: string
  fontSize: number
  color: { hex: string; opacity: number }
  fontWeight: string
  fontStyle: string
}) => ({
  type: 'CHANGE_FONT',
  payload: fontData,
})

export const changeFontFamily = (fontFamily: string) => ({
  type: 'CHANGE_FONT_FAMILY',
  payload: fontFamily,
})

export const changeFontSize = (fontSize: number) => ({
  type: 'CHANGE_FONT_SIZE',
  payload: fontSize,
})

export const changeFontColor = (color: { hex: string; opacity: number }) => ({
  type: 'CHANGE_FONT_COLOR',
  payload: color,
})

export const selectBold = () => ({
  type: 'SELECT_BOLD',
})

export const selectItalic = () => ({
  type: 'SELECT_ITALIC',
})
