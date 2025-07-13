import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// Front
// import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import BlogReducer from "./blog/reducer";

const rootReducer = combineReducers({
    // Layout: LayoutReducer,
    Login: LoginReducer,
    Account: AccountReducer,
    Blog: BlogReducer,
});

export const store = configureStore({ reducer: rootReducer, devTools: true });

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType =typeof store.dispatch;