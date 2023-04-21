import { User } from './user'

type Tokens = {
  refreshToken: string
  accessToken: string
}

export type SignUpDto = {
  username: string
  password: string
  email: string
}

export type SignUpResponse = {
  tokens: Tokens
  user: User
}

export type LoginDto = {
  password: string
  email: string
}

export type LoginResponse = {
  tokens: Tokens
  user: User
}
