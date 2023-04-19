/* eslint-disable no-duplicate-imports */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ThemeState {
  theme: 'dark' | 'light'
}

const initialState: ThemeState = {
  theme: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.theme === 'light') {
        state.theme = 'dark'
      } else {
        state.theme = 'light'
      }
    },
    // logout: (state) => {
    //   localStorage.removeItem(localStorageTokenKey);
    //   state.user = null;
    //   state.isAuthorized = false;
    // },
    // resetError: (state) => {
    //   state.error = null
    // },
    // resetSuccess: (state) => {
    //   state.success = false
    // },
  },
  extraReducers: (builder) => {
    // builder.addCase(registerUser.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.success = false;
    // });
    // builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
    //   state.loading = false;
    //   localStorage.setItem(localStorageTokenKey, action.payload.token);
    //   state.user = action.payload.user;
    //   state.isAuthorized = true;
    //   state.success = true;
    // });
    // builder.addCase(loginUser.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.success = false;
    // });
    // builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
    //   state.loading = false;
    //   localStorage.setItem(localStorageTokenKey, action.payload.token);
    //   state.user = action.payload.user;
    //   state.isAuthorized = true;
    //   state.success = true;
    // });
    // builder.addCase(checkAuth.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    // builder.addCase(checkAuth.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
    //   state.loading = false;
    //   localStorage.setItem(localStorageTokenKey, action.payload.token);
    //   state.user = action.payload.user;
    //   state.isAuthorized = true;
    // });
    // builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
    //   state.loading = false;
    //   state.error = action.payload;
    //   state.success = false;
    // });
  },
})

export const themeActions = themeSlice.actions

export default themeSlice.reducer
