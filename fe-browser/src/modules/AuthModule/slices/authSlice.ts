/* eslint-disable no-duplicate-imports */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../../types/user'
import { LoginDto, SignUpDto } from '../../../types/auth'

export interface AuthState {
  isAuthorized: boolean
  loading: boolean
  success: boolean
  error: string | null
  user: User | null
}

const initialState: AuthState = {
  isAuthorized: !!localStorage.getItem('accessToken'),
  loading: false,
  success: false,
  error: null,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<SignUpDto>) => {
      state.loading = true
    },

    signUpSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthorized = true
      state.user = action.payload
    },

    login: (state, action: PayloadAction<LoginDto>) => {
      state.loading = true
    },

    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthorized = true
      state.user = action.payload
    },

    logout: (state) => {
      state.loading = true
    },

    logoutSuccess: (state) => {
      state.isAuthorized = false
      state.user = null
    },

    resetLoading: (state) => {
      state.loading = false
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    resetError: (state) => {
      state.error = null
    },
    resetSuccess: (state) => {
      state.success = false
    },
  },
})

export const authActions = authSlice.actions

export default authSlice.reducer
