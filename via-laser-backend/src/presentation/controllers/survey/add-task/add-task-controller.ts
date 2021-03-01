import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import { Validation } from '../../../protocols'
import { Controller, HttpRequest, HttpResponse, AddTask } from './add-task-controller-protocols'

export class AddTaskController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addTask: AddTask
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }
      const { title, description, done, accountId, createdAt } = httpRequest.body

      const task = await this.addTask.add({
        title, description, done, accountId, createdAt
      })

      return ok(task)
    } catch (error) {
      return serverError(error)
    }
  }
}
