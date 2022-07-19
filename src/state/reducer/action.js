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
    SET_SWITCHES_DATA: 'set-switches-data',
    SET_ALL_DATA: 'set-all-data',
    SET_SAVED_ENTRY: 'set-saved-entry',
    SET_ALL_SAVED_ENTRY: 'set-all-saved-entry',

    SET_KEYBOARD_INFO: 'set-keyboard-info',
    SET_KEYCAPS_INFO: 'set-keycaps-info',
    SET_SWITCHES_INFO: 'set-switches-info'
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

export const setKeyboardsData = (payload) => ({
    type: ACTIONS.SET_KEYBOARD_DATA,
    payload
})

export const setKeycapsData = (payload) => ({
    type: ACTIONS.SET_KEYCAPS_DATA,
    payload
})

export const setSwitchesData = (payload) => ({
    type: ACTIONS.SET_SWITCHES_DATA,
    payload
})

export const setAllData = (payload) => ({
    type: ACTIONS.SET_ALL_DATA,
    payload
})

export const setSavedEntry = (payload) => ({
    type: ACTIONS.SET_SAVED_ENTRY,
    payload
})

export const setAllSavedEntry = (payload) => ({
    type: ACTIONS.SET_ALL_SAVED_ENTRY,
    payload
})

export const setKeyboardInfo = (payload) => ({
    type: ACTIONS.SET_KEYBOARD_INFO,
    payload
})

export const setKeycapsInfo = (payload) => ({
    type: ACTIONS.SET_KEYCAPS_INFO,
    payload
})

export const setSwitchesInfo = (payload) => ({
    type: ACTIONS.SET_SWITCHES_INFO,
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

export const getAllData = (keyboardData, keycapsData, switchesData) => {
    return async (dispatch) => {
        //get KB data
        const kbCollectionRef = collection(db, 'keyboards');
        const kbData = await getDocs(kbCollectionRef)
        const kbFullData = kbData.docs.map((doc) => ({...doc.data(), id: doc.id}))

        kbFullData.forEach((item) => {
            item.startDate = item.startDate.toDate()
            item.endDate = item.endDate.toDate()
            item.timeCreated = item.timeCreated.toDate()
        })

        dispatch(setKeyboardsData(kbFullData))

        //get KC data
        const kcCollectionRef = collection(db, 'keycaps')
        const kcData = await getDocs(kcCollectionRef)
        const kcFullData = kcData.docs.map((doc) => ({...doc.data(), id: doc.id}))

        kcFullData.forEach((item) => {
            item.startDate = item.startDate.toDate()
            item.endDate = item.endDate.toDate()
            item.timeCreated = item.timeCreated.toDate()
        })

        dispatch(setKeycapsData(kcFullData))

        //get SW data
        const swCollectionRef = collection(db, 'switches')
        const swData = await getDocs(swCollectionRef)
        const swFullData = swData.docs.map((doc) => ({...doc.data(), id: doc.id}))

        swFullData.forEach((item) => {
            item.startDate = item.startDate.toDate()
            item.endDate = item.endDate.toDate()
            item.timeCreated = item.timeCreated.toDate()
        })

        dispatch(setSwitchesData(swFullData))

        const allData = [...kbFullData, ...kcFullData, ...swFullData]
        console.log(allData)
        dispatch(setAllData(allData))
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

export const getKeycapsData = () => {
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

export const getSwitchesData = () => {
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

export const getSavedEntry = (uid) => {
    return async (dispatch) => {
        const collectionRef = collection(db, 'savedEntry')
        const data = await getDocs(collectionRef)
        const fullData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))

        fullData.forEach((item) => {
            if (item.uid === uid){
                dispatch(setSavedEntry(item))
            }
        })
    }
}

export const getAllSavedEntry = () => {
    return async (dispatch) => {
        const collectionRef = collection(db, 'savedEntry')
        const data = await getDocs(collectionRef)
        const fullData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))

        dispatch(setAllSavedEntry(fullData)) 
    }
}