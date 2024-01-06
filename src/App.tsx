import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { SlideManager } from './components/slideManager/slideManager'

export const App = () => {
  return (
    <Provider store={store}>
      <SlideManager />
    </Provider>
  )
}
