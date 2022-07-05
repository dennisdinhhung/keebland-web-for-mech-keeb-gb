import { ACTIONS } from "./action"

const initialState = {
    keycaps: {
        imgUrls: [],
        name: '',
        tag: {
            status: '',
            type: 'keycaps'
        },
        startDate: '',
        endDate: '',
        basePrice: '',

        vendors: [],
        geekhack: ''
    },
    keycapsInfo: {},
    keycapsData: [],   
}

const keycapsReducer = (state=initialState, action) => {
    switch (action.type){
        case ACTIONS.SET_KEYCAPS_STATE:
            return{
                ...state,
                keycaps: action.payload
            }
        case ACTIONS.SET_KEYCAPS_DATA:
            return {
                ...state,
                keycapsData: action.payload
            }
        case ACTIONS.SET_KEYCAPS_INFO:
            return {
                ...state,
                keycapsInfo: action.payload
            }
        default:
            return state
    }
}

export default keycapsReducer