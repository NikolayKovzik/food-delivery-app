import axios, { InternalAxiosRequestConfig } from 'axios'

const BASE_URL = 'http://localhost:4001'

export const $authApi = axios.create({
  baseURL: BASE_URL,
})

const authInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
}

$authApi.interceptors.request.use(authInterceptor)
