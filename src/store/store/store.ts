import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import seasonReducer from "../reducer/season/season.slice";
export const store = configureStore({
  reducer: {
    season: seasonReducer,
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
