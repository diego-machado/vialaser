import { DeleteTaskModel } from '../../../../domain/usecases/delete-task'

export interface DeleteTaskRepository {
  delete (taskId: DeleteTaskModel): Promise<void>
}
