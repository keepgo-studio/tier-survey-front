import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  hashedId: string | null;
}

const initialState: UserState = {
  hashedId: process.env.NEXT_PUBLIC_HASHED_ID_INIT ?? null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setHashedId: (state, action: PayloadAction<string>) => {
      state.hashedId = action.payload;
    }
  },
  selectors: {
    selectHashedId: state => state.hashedId
  }
});

export const userReducer = userSlice.reducer;

export default userSlice;