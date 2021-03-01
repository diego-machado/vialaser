import { TaskModel } from '../../../../domain/models/task'
import { LoadTaskByUserModel } from '../../../../domain/usecases/load-task-by-user'

export interface LoadTaskByUserRepository {
  load (accountId: LoadTaskByUserModel): Promise<TaskModel[]>
}
