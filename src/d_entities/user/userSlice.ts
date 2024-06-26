import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  hashedId: string | null;
}

const initialState: UserState = {
  hashedId: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initState: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    setHashedId: (state, action: PayloadAction<string | null>) => {
      state.hashedId = action.payload;
    },
  },
  selectors: {
    selectHashedId: state => state.hashedId
  }
});

export const userReducer = userSlice.reducer;

export default userSlice;