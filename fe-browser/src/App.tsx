import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './styles/main.scss'
import RoutesList from './routes/routes'
import AuthPage from './pages/AuthPage'
import { useAppSelector } from './hooks/redux'
import ProtectedRoutes from './components/ProtectedRoutes'
import MenuPage from './pages/MenuPage'
import MenuLayout from './layouts/MenuLayout/MenuLayout'
import DetailPage from './pages/DetailPage'
import CartPage from './pages/CartPage'
import NotificationPage from './pages/NotificationPage'

function App() {
  const { isAuthorized } = useAppSelector((state) => state.auth)
  const { theme } = useAppSelector((state) => state.theme)
  return (
    <div className={`App app-theme--${theme}`}>
      <Routes>
        <Route path={RoutesList.AUTH + '/*'} element={<AuthPage />} />
        <Route path={RoutesList.DEFAULT} element={<ProtectedRoutes isAuthorized={isAuthorized} />}>
          <Route path={RoutesList.DEFAULT} element={<MenuLayout />}>
            <Route path={RoutesList.DEFAULT} element={<MenuPage />} />
            <Route path={RoutesList.FAVORITE} element={<MenuPage />} />
          </Route>
          <Route path={RoutesList.ORDER} element={<CartPage />} />
          <Route path={RoutesList.DETAIL} element={<DetailPage />} />
          <Route path={RoutesList.NOTIFICATION} element={<NotificationPage />} />
          <Route path={RoutesList.PROFILE} element={<div>Profile</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
