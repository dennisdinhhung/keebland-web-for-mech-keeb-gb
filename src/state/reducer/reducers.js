import { combineReducers } from "redux";
import keyboardReducer from "./keyboardReducer";
import keycapsReducer from "./keycapsReducer";
import switchesReducer from "./switchesReducer";
import homeReducer from "./homeReducer";

const reducers = combineReducers({
    keyboard: keyboardReducer,
    keycaps: keycapsReducer,
    switches: switchesReducer,
    home: homeReducer,
})

export default reducers;