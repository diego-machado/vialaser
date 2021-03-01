import { LoadTaskByUserController } from '../../../../../presentation/controllers/survey/load-task-by-user/load-task-by-user-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeLoadTaskByUserTask } from '../../../usecases/task/load-task-by-user/db-load-task-by-user-factory'
import { makeLoadTaskByUserValidation } from './load-task-by-user-validation-factory'

export const makeLoadTaskByUserController = (): Controller => {
  const controller = new LoadTaskByUserController(makeLoadTaskByUserValidation(), makeLoadTaskByUserTask())

  return makeLogControllerDecorator(controller)
}
