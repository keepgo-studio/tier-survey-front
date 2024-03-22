import { makeStore } from "./store";
import userSlice from "./user/userSlice";
import * as hooks from "./hooks";
import StoreProvider from "./StoreProvider";

const Entities = { 
  makeStore,
  user: {
    ...userSlice.actions,
    ...userSlice.selectors,
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