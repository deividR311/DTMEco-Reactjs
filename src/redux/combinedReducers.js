import { combineReducers } from "redux";

import authReducer from "./authentication/authReducer";
import uiReducer from "./ui/uiReducer";

export default combineReducers({
    auth: authReducer,
    ui: uiReducer
});