import { createSlice } from "@reduxjs/toolkit";
import { MediaSeason } from "../../../gql/graphql";

export interface SearchState {
  search: string;
  type: "ANIME" | "MANGA" | "CHARACTER" | "STAFF" | "STUDIO";
  season: MediaSeason;
}

export const searchSlice = createSlice({
  name: "search",

  initialState: {
    search: "",
    type: "ANIME",
    season: MediaSeason.Winter,
  } as SearchState,

  reducers: {
    setSearchParams: (state, action) => {
      state.search = action.payload;
    },
    setSearchType: (state, action) => {
      state.type = action.payload;
    },
  },

  extraReducers(builder) {},
});

export const { setSearchParams, setSearchType } = searchSlice.actions;

export default searchSlice.reducer;
