
import { ObjectId } from 'mongodb'
import { AddTaskModel, AddTaskRepository } from '../../../../data/usecases/task/add-task/db-add-protocols'
import { EditTaskModel, EditTaskRepository } from '../../../../data/usecases/task/edit-task/db-edit-task-protocols'
import { DeleteTaskModel, DeleteTaskRepository } from '../../../../data/usecases/task/delete-task/db-delete-protocols'
import { LoadTaskByUserModel, LoadTaskByUserRepository } from '../../../../data/usecases/task/load-task-by-user/db-load-task-by-user-protocols'
import { TaskModel } from '../../../../domain/models/task'
import { MongoHelper } from '../helper/mongo-helper'
import { QueryBuilder } from '../helper/query-builder'

export class TaskMongoRepository implements AddTaskRepository, EditTaskRepository, DeleteTaskRepository, LoadTaskByUserRepository {
  async add (data: AddTaskModel): Promise<TaskModel> {
    const taskColletion = await MongoHelper.getCollection('tasks')
    const tasks = await taskColletion.insertOne(data)

    return MongoHelper.map(tasks.ops[0])
  }

  async edit (data: EditTaskModel): Promise<TaskModel> {
    const taskColletion = await MongoHelper.getCollection('tasks')
    const id = data.id
    delete data.id

    const tasks = await taskColletion.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        ...data
      }
    })

    if (tasks.result.ok === 1) {
      return MongoHelper.map(await taskColletion.findOne({ _id: new ObjectId(id) }))
    }
  }

  async delete (data: DeleteTaskModel): Promise<void> {
    const taskColletion = await MongoHelper.getCollection('tasks')
    await taskColletion.deleteOne({
      _id: new ObjectId(data.id)
    })
  }

  async load (data: LoadTaskByUserModel): Promise<TaskModel[]> {
    const taskColletion = await MongoHelper.getCollection('tasks')

    const query = new QueryBuilder().match({
      accountId: data.accountId
    }).build()

    const tasks = await taskColletion.aggregate(query).toArray()

    return MongoHelper.mapCollection(tasks)
  }
}
