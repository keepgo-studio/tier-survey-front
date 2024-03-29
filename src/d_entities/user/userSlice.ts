import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  hashedId: string | null;
}

const initialState: UserState = {
  hashedId: '123'
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