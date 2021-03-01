import { TaskModel } from '../models/task'

export interface LoadTaskByUserModel {
  accountId: string
}

export interface LoadTaskByUser {
  load (accountId: LoadTaskByUserModel): Promise<TaskModel[]>
}
