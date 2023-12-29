import { createSelector } from 'reselect'
import { RootState } from '../store'

// const selectSlideState = (state: RootState) => state.slide

// export const getSlides = createSelector([selectSlideState], (slide) => slide.slides)

// export const selectSelectedSlideId = createSelector([selectSlideState], (slide) => slide.selectedSlideId)

// export const selectSelectedObjectId = createSelector([selectSlideState], (slide) => slide.selectedObjectId)
export const getSlides = (state: RootState) => state.pres.slides
export const getPresentationName = (state: RootState) => state.pres?.namePres
export const getSelectedSlideId = (state: RootState) => state.pres.selectedSlideId
// export const getSelectedSlideStatus = (state: RootState) => state.pres.isSlideSelected
export const getSelectedObjectId = (state: RootState) => state.pres.selectedObjectId

