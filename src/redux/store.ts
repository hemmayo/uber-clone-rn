import { combineReducers, configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";

const rootReducer = combineReducers({
  nav: navReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
