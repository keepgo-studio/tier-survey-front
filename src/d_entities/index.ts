import { makeStore } from "./store";
import * as hooks from "./hooks";
import StoreProvider from "./StoreProvider";
import userSlice from "./slices/userSlice";
import surveySlice from "./slices/surveySlice";

const Entities = { 
  makeStore,
  user: {
    ...userSlice.actions,
    ...userSlice.selectors,
  },
  survey: {
    ...surveySlice.actions,
    ...surveySlice.selectors
  },
  hooks: {
    ...hooks
  },
  Provider: StoreProvider
};

export default Entities;

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];