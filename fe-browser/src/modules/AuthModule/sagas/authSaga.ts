import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { authService } from '../../../http/services/authService'
import { authActions } from '../slices/authSlice'
import { LoginDto, LoginResponse, SignUpDto, SignUpResponse } from '../../../types/auth'
import { PayloadAction } from '@reduxjs/toolkit'
import { AxiosError, AxiosResponse } from 'axios'

function* handleLogin(action: PayloadAction<LoginDto>) {
  try {
    const { data }: AxiosResponse<LoginResponse> = yield call(authService.login, action.payload)
    const { tokens, user } = data
    localStorage.setItem('accessToken', tokens.accessToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
    yield put(authActions.signUpSuccess(user))
    yield put(authActions.resetError())
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError
      console.log(error)
      if (axiosError.response) {
        const errorMessage = (axiosError.response.data as any).message
        yield put(authActions.setError(errorMessage))
        console.log('HTTP error:', axiosError.response.status)
      } else if (axiosError.request) {
        console.log('Request error:', axiosError.request)
        yield put(authActions.setError(axiosError.message))
      } else {
        yield put(authActions.setError(error.message))
      }
    }
  } finally {
    yield put(authActions.resetLoading())
  }
}

function* handleLogout() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  yield put(authActions.logoutSuccess())
  yield put(authActions.resetError())
  yield put(authActions.resetLoading())
}

function* handleSignUp(action: PayloadAction<SignUpDto>) {
  try {
    const { data }: AxiosResponse<SignUpResponse> = yield call(authService.signUp, action.payload)
    const { tokens, user } = data

    localStorage.setItem('accessToken', tokens.accessToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
    yield put(authActions.signUpSuccess(user))
    yield put(authActions.resetError())
  } catch (error: unknown) {
    if (error instanceof Error) {
      const axiosError = error as AxiosError
      console.log(error)
      if (axiosError.response) {
        const errorMessage = (axiosError.response.data as any).message
        yield put(authActions.setError(errorMessage))
        console.log('HTTP error:', axiosError.response.status)
      } else if (axiosError.request) {
        console.log('Request error:', axiosError.request)
        yield put(authActions.setError(axiosError.message))
      } else {
        yield put(authActions.setError(error.message))
      }
    }
  } finally {
    yield put(authActions.resetLoading())
  }
}

export function* authSaga() {
  yield takeLatest('auth/signUp', handleSignUp)
  yield takeLatest('auth/login', handleLogin)
  yield takeLatest('auth/logout', handleLogout)
}
