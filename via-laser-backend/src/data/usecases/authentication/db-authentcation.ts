import { LoginModel } from '../../../domain/models/authentication'
import {
  Authentication,
  HashComparer,
  Encrypter,
  UpdateAccessTokenRepository,
  LoadAccountByEmailRepository,
  AuthenticationModel
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) { }

  async auth (authentication: AuthenticationModel): Promise<LoginModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)

        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)

        return {
          accessToken,
          name: account.name,
          email: account.email,
          id: account.id
        }
      }
    }

    return null
  }
}
