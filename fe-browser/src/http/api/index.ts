import axios, { InternalAxiosRequestConfig } from 'axios'

const BASE_URL = 'https://food-delivery-app-production.up.railway.app'

export const $authApi = axios.create({
  baseURL: BASE_URL,
})

const authInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
}

$authApi.interceptors.request.use(authInterceptor)
