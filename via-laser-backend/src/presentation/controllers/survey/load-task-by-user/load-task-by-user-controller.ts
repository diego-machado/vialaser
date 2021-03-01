import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import { Validation } from '../../../protocols'
import { Controller, HttpRequest, HttpResponse, LoadTaskByUser } from './load-task-by-user-controller-protocols'

export class LoadTaskByUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadTaskByUser: LoadTaskByUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.query)
      if (error) {
        return badRequest(error)
      }
      const { accountId } = httpRequest.query

      const task = await this.loadTaskByUser.load({
        accountId
      })

      return ok(task)
    } catch (error) {
      return serverError(error)
    }
  }
}
