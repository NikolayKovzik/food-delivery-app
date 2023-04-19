import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import RoutesList from '../../routes/routes'

interface ProtectedRoutesProps {
  isAuthorized: boolean
}

const ProtectedRoutes = ({ isAuthorized }: ProtectedRoutesProps) => {
  const location = useLocation()

  if (!isAuthorized) {
    return <Navigate to={RoutesList.AUTH + RoutesList.LOGIN} replace state={{ from: location }} />
  }
  return <Outlet />
}

export default ProtectedRoutes
