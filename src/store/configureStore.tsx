import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "../reducers/auth";
import thunk from "redux-thunk";

export const configureStore = () => {
    const store = createStore(combineReducers({
            auth: authReducer
        }),
        applyMiddleware(thunk)
    )
    return store;
}