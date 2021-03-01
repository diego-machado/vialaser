
import { TaskModel } from '../../../../domain/models/task'
import { EditTask, EditTaskModel, EditTaskRepository } from './db-edit-task-protocols'

export class DbEditTask implements EditTask {
  constructor (
    private readonly addTaskRepository: EditTaskRepository
  ) {}

  async edit (data: EditTaskModel): Promise<TaskModel> {
    return await this.addTaskRepository.edit(data)
  }
}
