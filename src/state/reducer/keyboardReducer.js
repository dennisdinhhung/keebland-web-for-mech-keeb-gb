import { ACTIONS } from './action'
import { collection, getDocs } from 'firebase/firestore'

export const initialState = {
    keyboard: {
        timeCreated: '',

        seflID: '',
        imgUrls: '',
        name: '',
        tag: {
            status: '',
            type: ''
        },
        startDate: '',
        endDate: '',
        basePrice: '',

        vendors: {},
        geekhack: ''
    },
    
    keyboardData: [],
    
    keycaps: {},
    switches: {},

    keycapsData: [],
    switchesData: []
}

const keyboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_KEYBOARD_STATE:
            return {
                ...state,
                keyboard: action.payload
            }
        case ACTIONS.SET_KEYCAPS_STATE:
            return {
                ...state,
                keycaps: action.payload
            }

        case ACTIONS.SET_KEYBOARD_DATA:
            return {
                ...state,
                keyboardData: action.payload
            }
        default:
            return state
    }
}

export default keyboardReducer