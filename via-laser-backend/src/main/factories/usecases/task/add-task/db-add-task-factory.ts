import { TaskMongoRepository } from '../../../../../infra/db/mongodb/task/task-mongo-repository'
import { AddTask } from '../../../../../domain/usecases/add-task'
import { DbAddTask } from '../../../../../data/usecases/task/add-task/db-add-task'

export const makeDbAddTask = (): AddTask => {
  const taskMongoRepository = new TaskMongoRepository()

  return new DbAddTask(
    taskMongoRepository
  )
}
