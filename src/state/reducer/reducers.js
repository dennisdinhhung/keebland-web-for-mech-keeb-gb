import { combineReducers } from "redux";
import keyboardReducer from "./keyboardReducer";

const reducers = combineReducers({
    keyboard: keyboardReducer
})

export default reducers;