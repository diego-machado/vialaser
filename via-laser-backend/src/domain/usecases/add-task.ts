import { TaskModel } from '../models/task'

export interface AddTaskModel {
  title: string
  description: string
  done: boolean
  accountId: string
  createdAt: Date
}

export interface AddTask {
  add (data: AddTaskModel): Promise<TaskModel>
}
