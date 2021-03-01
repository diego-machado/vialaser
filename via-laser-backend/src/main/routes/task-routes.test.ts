import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helper/mongo-helper'
import { Collection } from 'mongodb'

let taskCollection: Collection

describe('Task Routes', () => {
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

  describe('POST /task', () => {
    test('Should return 200 and a task', async () => {
      const task = await request(app)
        .post('/api/task')
        .send({
          title: 'any_task',
          description: 'any_task',
          done: 'any_task',
          accountId: 'any_id',
          createdAt: new Date()
        })
        .expect(200)

      expect(task.body.title).toBe('any_task')
    })
  })

  describe('PUT /task', () => {
    test('Should edit a task', async () => {
      const task = await request(app)
        .post('/api/task')
        .send({
          title: 'any_task',
          description: 'any_task',
          done: 'any_task',
          accountId: 'any_id',
          createdAt: new Date()
        })
        .expect(200)

      const edited = await request(app)
        .put('/api/task')
        .send({
          id: task.body.id,
          title: 'other_task',
          description: 'any_task',
          done: 'any_task',
          accountId: 'any_id',
          createdAt: new Date()
        })
        .expect(200)

      expect(edited.body.title).toBe('other_task')
    })
  })
})
