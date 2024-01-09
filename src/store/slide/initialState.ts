import InitializedPresentation from '../../components/InitializedPresentation'
const INITIAL_SLIDE_ID = 0

export const initialState = {
  presentation: InitializedPresentation,
  selectedSlideId: InitializedPresentation.slides[INITIAL_SLIDE_ID].id,
  selectedObjectId: InitializedPresentation.slides[INITIAL_SLIDE_ID].objects,
  presentationTheme: InitializedPresentation.presentationTheme,
}
