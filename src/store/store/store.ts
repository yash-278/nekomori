import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import searchReducer from "../reducer/search/search.slice";
import seasonReducer from "../reducer/season/season.slice";
import advancedSearchReducer from "../reducer/advancedSearch/advancedSearch.slice";
export const store = configureStore({
  reducer: {
    season: seasonReducer,
    search: searchReducer,
    advancedSearch: advancedSearchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Path: src/store/store/index.ts
