import { ACTIONS } from "./action"

const initialState = {
    allData: []
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_ALL_DATA:
            return {
                ...state,
                allData: action.payload
            }
        default:
            return state
    }
}

export default homeReducer