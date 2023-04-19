import React from 'react'
import { AuthNav } from '../AuthNav'
import { LoginForm } from '../LoginForm'
import { SignupForm } from '../SignupForm'
import { Navigate, Route, Routes } from 'react-router-dom'
import RoutesList from '../../../../routes/routes'
import { useAppSelector } from '../../../../hooks/redux'

function AuthModule() {
  const { isAuthorized } = useAppSelector((state) => state.auth)
  if (isAuthorized) {
    return <Navigate to={RoutesList.DEFAULT} replace />
  }

  return (
    <div>
      <AuthNav />
      <Routes>
        <Route path={RoutesList.LOGIN} element={<LoginForm />} />
        <Route path={RoutesList.SIGNUP} element={<SignupForm />} />
      </Routes>
    </div>
  )
}

export default AuthModule
