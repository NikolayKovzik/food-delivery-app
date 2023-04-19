import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from '../modules/AuthModule/slices/authSlice'
import themeSlice from './slices/themeSlice'
export const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
})
export const store = configureStore({
  reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
