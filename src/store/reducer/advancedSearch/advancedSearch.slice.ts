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
  tags: string[];
}

export const advancedSearch = createSlice({
  name: "search",

  initialState: {
    genres: [],
    tags: [],
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
    toggleTagInSearch(state, action) {
      const tag = action.payload;
      if (state.tags.includes(tag)) {
        state.tags = state.tags.filter((t) => t !== tag);
      } else {
        state.tags.push(tag);
      }
    },
    removeAllTagsFromSearch(state) {
      state.tags = [];
    },
  },

  extraReducers(builder) {},
});

export const { toggleGenreInSearch, toggleTagInSearch } = advancedSearch.actions;

export default advancedSearch.reducer;
