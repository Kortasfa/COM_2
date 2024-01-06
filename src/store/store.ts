import { useDispatch, useSelector } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { initialState as slidesInitialState, slideReducer } from './slide/reducer'
import { Color } from '../types/types'

export const rootReducer = combineReducers({
  pres: slideReducer,
})
export const store = createStore(rootReducer)
export type RootState = {
  pres: {
    slides: { objects: any[]; id: string; background: string }[];
    namePres: string;
    idPres: string;
    selectedSlideId: string;
    selectedObjectId: null;

    fonts: {
      fontFamily: string;
      fontSize: number;
      color: Color;
      bold: boolean;
      italic: boolean;
    }
  }

export const useAppSelector = (selector: (state: RootState) => any) => useSelector(selector)

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
