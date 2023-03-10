import { createSlice } from "@reduxjs/toolkit";
import { MediaSeason } from "../../../gql/graphql";

export type Genre =
  | "Action"
  | "Adventure"
  | "Comedy"
  | "Drama"
  | "Ecchi"
  | "Fantasy"
  | "Hentai"
  | "Horror"
  | "Mahou Shoujo"
  | "Mecha"
  | "Music"
  | "Mystery"
  | "Psychological"
  | "Romance"
  | "Sci-Fi"
  | "Slice of Life"
  | "Sports"
  | "Supernatural"
  | "Thriller";

export interface AdvancedSearchState {
  genres: Genre[];
  tags: string[];
  year: string[];
  season: MediaSeason[];
}

export const advancedSearch = createSlice({
  name: "search",

  initialState: {
    genres: [],
    tags: [],
    year: [""],
    season: [],
  } as AdvancedSearchState,

  reducers: {
    toggleGenreInSearch(state, action) {
      const genre = action.payload;
      if (state.genres.includes(genre)) {
        state.genres = state.genres.filter((g) => g !== genre);
      } else {
        state.genres.push(genre);
      }
    },
    toggleTagInSearch(state, action) {
      const tag = action.payload;
      if (state.tags.includes(tag)) {
        state.tags = state.tags.filter((t) => t !== tag);
      } else {
        state.tags.push(tag);
      }
    },
    toggleYearInSearch(state, action) {
      const year = action.payload;
      if (state.year[0] === "" || state.year[0] !== year) {
        state.year = [year];
      } else {
        state.year = [""];
      }
    },
    toggleSeasonInSearch(state, action) {
      const season = action.payload;
      if (state.season.includes(season)) {
        state.season = state.season.filter((s) => s !== season);
      } else if (state.season.length === 0) {
        state.season.push(season);
      } else {
        state.season = [season];
      }
    },
    clearAllSearch(state) {
      state.genres = [];
      state.tags = [];
      state.year = [""];
      state.season = [];
    },
  },

  extraReducers(builder) {},
});

export const {
  toggleGenreInSearch,
  toggleTagInSearch,
  toggleYearInSearch,
  toggleSeasonInSearch,
  clearAllSearch,
} = advancedSearch.actions;

export default advancedSearch.reducer;
