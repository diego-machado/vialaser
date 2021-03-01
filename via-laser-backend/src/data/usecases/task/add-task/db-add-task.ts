
import { TaskModel } from '../../../../domain/models/task'
import { AddTask, AddTaskModel, AddTaskRepository } from './db-add-protocols'

export class DbAddTask implements AddTask {
  constructor (
    private readonly addTaskRepository: AddTaskRepository
  ) {}

  async add (data: AddTaskModel): Promise<TaskModel> {
    return await this.addTaskRepository.add(data)
  }
}
