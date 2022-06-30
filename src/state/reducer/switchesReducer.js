import { ACTIONS } from "./action"

const initialState = {
    switches: {
        timeCreated: '',

        imgUrls: [],
        name: '',
        tag: {
            status: '',
            type: ''
        },
        startDate: '',
        endDate: '',
        basePrice: '',

        vendors: [],
        geekhack: ''
    },
    switchesData: []
}

const switchesReducer = (state = initialState, action) => {
    switch (action.type){
        case ACTIONS.SET_SWITCHES_STATE:
            return{
                ...state,
                switches: action.payload
            }
        default:
            return state
    }
}

export default switchesReducer