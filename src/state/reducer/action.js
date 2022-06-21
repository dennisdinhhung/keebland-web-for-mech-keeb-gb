import { collection, getDocs } from "firebase/firestore"
import { db } from "../../utils/firebase-config"

export const ACTIONS = {
    SET_KEYBOARD_STATE:  'set-keyboard',
    SET_KEYCAPS_STATE: 'set-keycaps-state',
    SET_SWITCHES_STATE: 'set-switches-state',

    ADD_KEYBOARD: 'add-keyboard',
    ADD_KEYCAPS: 'add-keycaps',
    ADD_SWITCHES: 'add-switches',
    
    SET_KEYBOARD_DATA: 'set-keyboard-data',
    SET_KEYCAPS_DATA: 'set-keycaps-data',
    SET_SWITCHES_DATA: 'set-switches-data'
}

//*SET
export const setKeyboardState = (payload) => ({
    type: ACTIONS.SET_KEYBOARD_STATE,
    payload
})

export const setKeycapsState = (payload) => ({
    type: ACTIONS.SET_KEYCAPS_STATE,
    payload
})

export const setSwitchesState = (payload) => ({
    type: ACTIONS.SET_SWITCHES_STATE,
    payload
})

//* ADD

export const addKeyboard = (payload) => ({
    type: ACTIONS.ADD_KEYBOARD,
    payload
})

export const addKeycaps = (payload) => ({
    type: ACTIONS.ADD_KEYCAPS,
    payload
})

export const addSwitches = (payload) => ({
    type: ACTIONS.ADD_SWITCHES,
    payload
})

//* GET

//? testing

export const getData = (coll_name) => {
    return async (dispatch) => {
        const collectionRef = collection(db, coll_name)
        const data = await getDocs(collectionRef)
        const fullData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))

        fullData.forEach((item) => {
            item.startDate = item.startDate.toDate()
            item.endDate = item.endDate.toDate()
            item.timeCreated = item.timeCreated.toDate()
        })

        if (coll_name === 'keyboards'){
            dispatch(setKeyboardsData(fullData))
        }
        else if (coll_name === 'keycaps'){
            dispatch(setKeycapsData(fullData))
        }
        else if (coll_name === 'switches'){
            dispatch(setSwitchesData(fullData))
        }
    }
}

export const getKeyboardData = () => {
    return async (dispatch) => {

        const collectionRef = collection(db, 'keyboards');
        const data = await getDocs(collectionRef)
        const fullData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))

        fullData.forEach((item) => {
            item.startDate = item.startDate.toDate()
            item.endDate = item.endDate.toDate()
            item.timeCreated = item.timeCreated.toDate()
        })

        dispatch(setKeyboardsData(fullData))
    }
}

export const getKeycaps = () => {
    return async (dispatch) => {
        
        const collectionRef = collection(db, 'keycaps')
        const data = await getDocs(collectionRef)
        const fullData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))

        fullData.forEach((item) => {
            item.startDate = item.startDate.toDate()
            item.endDate = item.endDate.toDate()
            item.timeCreated = item.timeCreated.toDate()
        })

        dispatch(setKeycapsData(fullData))
    }
}

export const getSwitches = () => {
    return async (dispatch) => {
        
        const collectionRef = collection(db, 'switches')
        const data = await getDocs(collectionRef)
        const fullData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))

        fullData.forEach((item) => {
            item.startDate = item.startDate.toDate()
            item.endDate = item.endDate.toDate()
            item.timeCreated = item.timeCreated.toDate()
        })

        dispatch(setSwitchesData(fullData))
    }
}

//*SET

export const setKeyboardsData = (payload) => ({
    type: ACTIONS.SET_KEYBOARD_DATA,
    payload
})

export const setKeycapsData = (payload) => ({
    type: ACTIONS.SET_KEYCAPS_DATA,
    payload
})

export const setSwitchesData = (payload) => ({
    type:   ACTIONS.SET_SWITCHES_DATA,
    payload
})