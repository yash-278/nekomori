import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface SeasonState {
  currentSeason: "SPRING" | "SUMMER" | "AUTUMN" | "WINTER";
  currentYear: number;
}

export const seasonSlice = createSlice({
  name: "currentSeason",

  initialState: {
    currentSeason: "SPRING",
    currentYear: new Date().getFullYear(),
  } as SeasonState,

  reducers: {
    setSeason: (state, action: PayloadAction<SeasonState["currentSeason"]>) => {
      state.currentSeason = action.payload;
    },
  },
});

export const { setSeason } = seasonSlice.actions;

export default seasonSlice.reducer;
