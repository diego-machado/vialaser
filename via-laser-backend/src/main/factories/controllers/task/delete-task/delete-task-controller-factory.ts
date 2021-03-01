import { DeleteTaskController } from '../../../../../presentation/controllers/survey/delete-task/delete-task-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbDeleteTask } from '../../../usecases/task/delete-task/db-delete-task-factory'
import { makeDeleteTaskValidation } from './delete-task-validation-factory'

export const makeDeleteTaskController = (): Controller => {
  const controller = new DeleteTaskController(makeDeleteTaskValidation(), makeDbDeleteTask())

  return makeLogControllerDecorator(controller)
}
