import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import { Validation } from '../../../protocols'
import { Controller, HttpRequest, HttpResponse, DeleteTask } from './delete-task-controller-protocols'

export class DeleteTaskController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly editTask: DeleteTask
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)

      if (error) {
        return badRequest(error)
      }
      const { id } = httpRequest.params

      const task = await this.editTask.delete({
        id
      })

      return ok(task)
    } catch (error) {
      return serverError(error)
    }
  }
}
