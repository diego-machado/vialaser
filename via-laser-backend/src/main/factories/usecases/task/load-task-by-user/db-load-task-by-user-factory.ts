import { TaskMongoRepository } from '../../../../../infra/db/mongodb/task/task-mongo-repository'
import { LoadTaskByUser } from '../../../../../domain/usecases/load-task-by-user'
import { DbLoadTaskByUser } from '../../../../../data/usecases/task/load-task-by-user/db-load-task-by-user'

export const makeLoadTaskByUserTask = (): LoadTaskByUser => {
  const taskMongoRepository = new TaskMongoRepository()

  return new DbLoadTaskByUser(
    taskMongoRepository
  )
}
