import { ACTIONS } from "./action"

const initialState = {
  savedEntry: {
    uid: '',
    keyboards: [],
    keycaps: [],
    switches: []
  },
  allSavedEntry: []
}

export const savedEntryReducer = (state=initialState, action) => {
  switch (action.type){
    case ACTIONS.SET_SAVED_ENTRY:
      return{
        ...state,
        savedEntry: action.payload
      }
    case ACTIONS.SET_ALL_SAVED_ENTRY:
      return{
        ...state,
        allSavedEntry: action.payload
      }
    default:
      return state
  }
}