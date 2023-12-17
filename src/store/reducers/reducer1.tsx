import initialState from '../initialState'
import ACTION_1 from '../actions/action1'

export default function value_1(state = initialState.value_1, action: { type: any; value_1: any }) {
  switch (action.type) {
    case ACTION_1:
      return action.value_1

    default:
      return state
  }
}
