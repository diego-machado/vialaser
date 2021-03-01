import { TaskModel } from '../../../../domain/models/task'
import { AddTaskModel } from '../../../../domain/usecases/add-task'

export interface AddTaskRepository {
  add (data: AddTaskModel): Promise<TaskModel>
}
