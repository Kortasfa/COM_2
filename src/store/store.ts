import { useDispatch, useSelector } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { slideReducer } from './slide/reducer'

export const rootReducer = combineReducers({
  pres: slideReducer,
})
export const store = createStore(rootReducer)
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector = (selector: (state: RootState) => any) => useSelector(selector)

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
