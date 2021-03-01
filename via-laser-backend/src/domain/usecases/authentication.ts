import { LoginModel } from '../models/authentication'

export interface AuthenticationModel{
  email: string
  password: string
}

export interface Authentication {
  auth (authentication: AuthenticationModel): Promise<LoginModel>
}
