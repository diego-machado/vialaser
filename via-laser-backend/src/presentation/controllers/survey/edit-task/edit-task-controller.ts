import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import { Validation } from '../../../protocols'
import { Controller, HttpRequest, HttpResponse, EditTask } from './edit-task-controller-protocols'

export class EditTaskController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly editTask: EditTask
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }
      const { id, title, description, done, accountId, createdAt } = httpRequest.body

      const task = await this.editTask.edit({
        id, title, description, done, accountId, createdAt
      })

      return ok(task)
    } catch (error) {
      return serverError(error)
    }
  }
}
