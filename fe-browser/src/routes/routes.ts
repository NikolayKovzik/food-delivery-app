import React from 'react'

const RoutesList = {
  DEFAULT: '/',
  AUTH: '/auth',
  SIGNUP: '/signup',
  LOGIN: '/login',
  MENU: '/menu',
  HOME: 'home',
  FAVORITE: 'favorite',
  ORDER: '/order',
  DETAIL: '/details/:productId',
  NOTIFICATION: '/notification',
  PROFILE: 'profile',
  NOT_FOUND: '*',
} as const

export default RoutesList
