import { TaskModel } from '../models/task'

export interface EditTaskModel {
  id: string
  title: string
  description: string
  accountId: string
  done: boolean
  createdAt: Date
}

export interface EditTask {
  edit (data: EditTaskModel): Promise<TaskModel>
}
