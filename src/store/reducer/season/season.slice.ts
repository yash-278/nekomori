import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MediaSeason } from "../../../gql/graphql";

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

function getCurrentSeason(): SeasonState["currentSeason"] {
  const date = new Date();
  const month = date.getMonth();
  let season = "";

  if (month >= 11 || month <= 1) {
    season = MediaSeason.Winter;
  } else if (month >= 2 && month <= 4) {
    season = MediaSeason.Spring;
  } else if (month >= 5 && month <= 7) {
    season = MediaSeason.Summer;
  } else {
    season = MediaSeason.Fall;
  }

  return season as SeasonState["currentSeason"];
}

export const { setSeason, setYear, setStatus } = seasonSlice.actions;

export default seasonSlice.reducer;
