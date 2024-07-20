import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { removeHashedId } from "./actions";

export interface UserState {
  hashedId: Record<SupportGame, string | null>;
}

const initialState: UserState = {
  hashedId: {
    "league of legends": null,
    "teamfight tactics": null,
    "valorant": null
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initState: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    setHashedId: (state, action: PayloadAction<{ game: SupportGame, id: string | null; }>) => {
      state.hashedId[action.payload.game] = action.payload.id;
    },
    logout: (state, action: PayloadAction<SupportGame>) => {
      state.hashedId[action.payload] = null;
      removeHashedId(action.payload);
    }
  },
  selectors: {
    selectHashedId: state => state.hashedId
  }
});

export const userReducer = userSlice.reducer;

export default userSlice;