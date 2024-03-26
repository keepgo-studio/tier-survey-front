import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  currentGame: SupportGame | null;
  hashedId: string | null;
}

const initialState: UserState = {
  currentGame: null,
  hashedId: '123'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<SupportGame>) => {
      state.currentGame = action.payload;
    }
  },
  selectors: {
    selectCurrentGame: state => state.currentGame,
    selectHashedId: state => state.hashedId
  }
});

export const userReducer = userSlice.reducer;

export default userSlice;