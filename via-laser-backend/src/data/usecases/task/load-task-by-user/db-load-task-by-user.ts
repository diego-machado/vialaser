import { TaskModel } from '../../../../domain/models/task'
import { LoadTaskByUserModel , LoadTaskByUser } from '../../../../domain/usecases/load-task-by-user'

import { LoadTaskByUserRepository } from '../../../protocols/db/task/load-task-repository'

export class DbLoadTaskByUser implements LoadTaskByUser {
  constructor (
    private readonly loadTaskByUserRepository: LoadTaskByUserRepository
  ) {}

  async load (data: LoadTaskByUserModel): Promise<TaskModel[]> {
    return await this.loadTaskByUserRepository.load(data)
  }
}
