import { RootState } from '../store'

export const getSlides = (state: RootState) => state.pres?.presentation.slides
export const getSelectedSlideId = (state: RootState) => state.pres?.selectedSlideId
export const getSelectedObjectId = (state: RootState) => state.pres?.selectedObjectId
export const getPresentationData = (state: RootState) => state.pres.presentation
