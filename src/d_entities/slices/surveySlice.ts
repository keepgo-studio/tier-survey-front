import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SurveyState {
  open: boolean;
  endTime: number | null;
  limitMinute: number | null;
  statExist: boolean;
}

const initialState: SurveyState = {
  open: false,
  endTime: null,
  limitMinute: null,
  statExist: false,
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setEndTime: (state, action: PayloadAction<number>) => {
      state.endTime = action.payload;
    },
    setLimitMinute: (state, action: PayloadAction<number>) => {
      state.limitMinute = action.payload;
    },
    setStatExist: (state, action: PayloadAction<boolean>) => {
      state.statExist = action.payload;
    },
  },
  selectors: {
    selectOpen: state => state.open,
    selectEndTime: state => state.endTime,
    selectLimitMinute: state => state.limitMinute,
    selectStatExist: state => state.statExist
  }
});

export const surveyReducer = surveySlice.reducer;

export default surveySlice;