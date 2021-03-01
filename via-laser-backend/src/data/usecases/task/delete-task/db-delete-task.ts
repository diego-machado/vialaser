
import { DeleteTask, DeleteTaskModel, DeleteTaskRepository } from './db-delete-protocols'

export class DbDeleteTask implements DeleteTask {
  constructor (
    private readonly deleteTaskRepository: DeleteTaskRepository
  ) {}

  async delete (data: DeleteTaskModel): Promise<void> {
    await this.deleteTaskRepository.delete(data)
  }
}
