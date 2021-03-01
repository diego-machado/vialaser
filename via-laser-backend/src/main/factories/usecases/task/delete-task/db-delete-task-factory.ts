import { TaskMongoRepository } from '../../../../../infra/db/mongodb/task/task-mongo-repository'
import { DeleteTask } from '../../../../../domain/usecases/delete-task'
import { DbDeleteTask } from '../../../../../data/usecases/task/delete-task/db-delete-task'

export const makeDbDeleteTask = (): DeleteTask => {
  const taskMongoRepository = new TaskMongoRepository()

  return new DbDeleteTask(
    taskMongoRepository
  )
}
