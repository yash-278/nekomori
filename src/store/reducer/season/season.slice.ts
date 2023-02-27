import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MediaSeason } from "../../../gql/graphql";
import { getCurrentSeason } from "../../../utils/season";

export interface SeasonState {
  currentSeason: MediaSeason;
  currentStatus: "RELEASING" | "NOT_YET_RELEASED" | "FINISHED" | "CANCELLED" | "HIATUS";
  currentYear: string;
}

export const seasonSlice = createSlice({
  name: "currentSeason",

  initialState: {
    currentSeason: getCurrentSeason(),
    currentStatus: "RELEASING",
    currentYear: new Date().getFullYear().toString(),
  } as SeasonState,

  reducers: {
    setSeason: (state, action: PayloadAction<SeasonState["currentSeason"]>) => {
      state.currentSeason = action.payload;
    },
    setYear: (state, action: PayloadAction<SeasonState["currentYear"]>) => {
      state.currentYear = action.payload;
    },
    setStatus: (state, action: PayloadAction<SeasonState["currentStatus"]>) => {
      state.currentStatus = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { setSeason, setYear, setStatus } = seasonSlice.actions;

export default seasonSlice.reducer;
