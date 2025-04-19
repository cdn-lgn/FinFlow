import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { loadState, saveState } from "./sessionStorage";

const persistedStore = loadState()

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState:persistedStore
});


store.subscribe(()=>saveState(store.getState()))

export default store;
