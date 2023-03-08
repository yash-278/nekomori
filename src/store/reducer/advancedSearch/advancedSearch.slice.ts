import { createSlice } from "@reduxjs/toolkit";

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
}

export const advancedSearch = createSlice({
  name: "search",

  initialState: {
    genres: [],
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
    removeAllGenresFromSearch(state) {
      state.genres = [];
    },
  },

  extraReducers(builder) {},
});

export const { toggleGenreInSearch } = advancedSearch.actions;

export default advancedSearch.reducer;
