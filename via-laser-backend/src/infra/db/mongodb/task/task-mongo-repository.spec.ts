
import { Collection } from 'mongodb'
import { MongoHelper } from '../helper/mongo-helper'
import { TaskMongoRepository } from './task-mongo-repository'

let taskCollection: Collection

describe('Task Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    taskCollection = await MongoHelper.getCollection('tasks')
    await taskCollection.deleteMany({})
  })

  const makeSut = (): TaskMongoRepository => {
    return new TaskMongoRepository()
  }

  test('Should add a task', async () => {
    const sut = makeSut()

    await sut.add({
      title: 'any_task',
      description: 'any_description',
      done: true,
      accountId: 'any_id',
      createdAt: new Date('2020-02-28')
    })

    const task = await taskCollection.findOne({ title: 'any_task' })
    expect(task).toBeTruthy()
  })

  test('Should load a tasks', async () => {
    const sut = makeSut()

    await sut.add({
      title: 'any_task',
      description: 'any_description',
      done: true,
      accountId: 'any_id',
      createdAt: new Date('2020-02-28')
    })

    await sut.add({
      title: 'any_task',
      description: 'any_description',
      done: true,
      accountId: 'any_id',
      createdAt: new Date('2020-02-28')
    })

    const tasks = await sut.load({ accountId: 'any_id' })

    expect(tasks).toBeTruthy()
    expect(tasks.length).toBe(2)
  })

  test('Should delete a task', async () => {
    const sut = makeSut()

    const task = await sut.add({
      title: 'any_task',
      description: 'any_description',
      done: true,
      accountId: 'any_id',
      createdAt: new Date('2020-02-28')
    })

    await sut.delete({ id: task.id })
    const getTask = await taskCollection.findOne({ _id: task.id })

    expect(getTask).toBeFalsy()
  })

  test('Should edit a task', async () => {
    const sut = makeSut()

    const task = await sut.add({
      title: 'any_task',
      description: 'any_description',
      done: true,
      accountId: 'any_id',
      createdAt: new Date('2020-02-28')
    })

    await sut.edit({
      id: task.id,
      title: 'new_task',
      description: 'any_description',
      done: true,
      accountId: 'any_id',
      createdAt: new Date('2020-02-28')
    })

    const getTask = await taskCollection.findOne({ _id: task.id })

    expect(getTask.title).toBe('new_task')
  })
})
