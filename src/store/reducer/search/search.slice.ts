import { createSlice } from "@reduxjs/toolkit";
import { MediaSeason, MediaType } from "../../../gql/graphql";

export interface SearchState {
  search: string;
  type: MediaType;
  season: MediaSeason;
}

export const searchSlice = createSlice({
  name: "search",

  initialState: {
    search: "",
    type: MediaType.Anime,
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
