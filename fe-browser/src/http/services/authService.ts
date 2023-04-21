import { AxiosResponse } from 'axios'
import { LoginDto, LoginResponse, SignUpDto, SignUpResponse } from '../../types/auth'
import { $authApi } from '../api'

const signUpPath = '/auth/signup'
const loginPath = '/auth/signin'
// const loginPath = '/auth/login'

export class authService {
  static async signUp(signUpData: SignUpDto): Promise<AxiosResponse<SignUpResponse>> {
    return $authApi.post<SignUpResponse>(signUpPath, signUpData)
  }

  static async login(loginData: LoginDto): Promise<AxiosResponse<SignUpResponse>> {
    return $authApi.post<LoginResponse>(loginPath, loginData)
  }

  // static async logout(signUpData: SignUpDto): Promise<AxiosResponse<SignUpResponse>> {
  //   return $authApi.post<SignUpResponse>(signUpPath, signUpData)
  // }
}
