import initialState from '../initialState'

export default function value_2(state = initialState.value_2, action: { type: any; value_2: any }) {
  let ACTION_2
  switch (action.type) {
    case ACTION_2:
      return action.value_2

    default:
      return state
  }
}
