import { AddTaskController } from '../../../../../presentation/controllers/survey/add-task/add-task-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbAddTask } from '../../../usecases/task/add-task/db-add-task-factory'
import { makeAddTaskValidation } from './add-task-validation-factory'

export const makeAddTaskController = (): Controller => {
  const controller = new AddTaskController(makeAddTaskValidation(), makeDbAddTask())

  return makeLogControllerDecorator(controller)
}
