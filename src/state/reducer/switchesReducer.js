import { ACTIONS } from "./action"

const initialState = {
    switches: {
        imgUrls: [],
        name: '',
        tag: {
            status: '',
            type: 'switches'
        },
        startDate: '',
        endDate: '',
        basePrice: '',

        vendors: [],
        geekhack: ''
    },
    switchesInfo: {},
    switchesData: []
}

const switchesReducer = (state = initialState, action) => {
    switch (action.type){
        case ACTIONS.SET_SWITCHES_STATE:
            return{
                ...state,
                switches: action.payload
            }
        case ACTIONS.SET_SWITCHES_DATA:
            return {
                ...state,
                switchesData: action.payload
            }
        case ACTIONS.SET_SWITCHES_INFO:
            return {
                ...state,
                switchesInfo: action.payload
            }
        default:
            return state
    }
}

export default switchesReducer