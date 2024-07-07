import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { surveyReducer } from "./slices/surveySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      survey: surveyReducer
    }
  })
}