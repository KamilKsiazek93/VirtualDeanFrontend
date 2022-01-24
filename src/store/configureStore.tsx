import { createStore, combineReducers } from "redux";
import { authReducer } from "../reducers/auth";

export const configureStore = () => {
    const store = createStore(combineReducers({
        auth: authReducer
    }),
    )
    return store;
}