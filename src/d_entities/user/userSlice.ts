import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  currentGame: SupportGame | null;
}

const initialState: UserState = {
  currentGame: null
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
    selectCurrentGame: state => state.currentGame
  }
});

export const userReducer = userSlice.reducer;

export default userSlice;