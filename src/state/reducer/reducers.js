import { combineReducers } from "redux";
import keyboardReducer from "./keyboardReducer";
import keycapsReducer from "./keycapsReducer";
import switchesReducer from "./switchesReducer";
import homeReducer from "./homeReducer";
import { savedEntryReducer } from "./savedEntryReducer";

const reducers = combineReducers({
    keyboard: keyboardReducer,
    keycaps: keycapsReducer,
    switches: switchesReducer,
    home: homeReducer,
    savedEntry: savedEntryReducer,
})

export default reducers;