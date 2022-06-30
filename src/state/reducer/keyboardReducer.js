import { ACTIONS } from './action'

const initialState = {
    keyboard: {
        imgUrls: [],
        name: '',
        tag: {
            status: '',
        },
        startDate: '',
        endDate: '',
        basePrice: '',

        vendors: [],
        geekhack: ''
    },
    keyboardInfo: {},
    keyboardData: [],
}

const keyboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_KEYBOARD_STATE:
            return {
                ...state,
                keyboard: action.payload
            }
        case ACTIONS.SET_KEYBOARD_DATA:
            return {
                ...state,
                keyboardData: action.payload
            }
        case ACTIONS.SET_KEYBOARD_INFO:
            return {
                ...state,
                keyboardInfo: action.payload
            }
        default:
            return state
    }
}

export default keyboardReducer