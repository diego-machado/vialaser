import { TaskMongoRepository } from '../../../../../infra/db/mongodb/task/task-mongo-repository'
import { EditTask } from '../../../../../domain/usecases/edit-task'
import { DbEditTask } from '../../../../../data/usecases/task/edit-task/db-edit-task'

export const makeDbEditTask = (): EditTask => {
  const taskMongoRepository = new TaskMongoRepository()

  return new DbEditTask(
    taskMongoRepository
  )
}
