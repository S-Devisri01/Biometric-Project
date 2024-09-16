import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Corrected import path

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
