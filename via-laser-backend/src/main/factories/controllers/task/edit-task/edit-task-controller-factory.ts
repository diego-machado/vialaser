import { EditTaskController } from '../../../../../presentation/controllers/survey/edit-task/edit-task-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbEditTask } from '../../../usecases/task/edit-task/db-edit-task-factory'
import { makeEditTaskValidation } from './edit-task-validation-factory'

export const makeEditTaskController = (): Controller => {
  const controller = new EditTaskController(makeEditTaskValidation(), makeDbEditTask())

  return makeLogControllerDecorator(controller)
}
