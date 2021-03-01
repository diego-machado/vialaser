import { TaskModel } from '../../../../domain/models/task'
import { EditTaskModel } from '../../../../domain/usecases/edit-task'

export interface EditTaskRepository {
  edit (data: EditTaskModel): Promise<TaskModel>
}
