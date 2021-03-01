import { DbAddTask } from './db-add-task'
import { AddTaskModel, AddTaskRepository } from './db-add-protocols'
import { TaskModel } from '../../../../domain/models/task'

const makeFakeTaskData = (): TaskModel => ({
  id: 'any_id',
  title: 'any_task',
  description: 'any_description',
  done: true,
  accountId: 'any_id',
  createdAt: new Date('2020-02-28')
})

const makeFakeAddTaskData = (): AddTaskModel => ({
  title: 'any_task',
  description: 'any_description',
  done: true,
  accountId: 'any_id',
  createdAt: new Date('2020-02-28')
})

const makeAddTaskRepository = (): AddTaskRepository => {
  class AddTaskRepositoryStub implements AddTaskRepository {
    async add (data: AddTaskModel): Promise<TaskModel> {
      return new Promise(resolve => resolve(makeFakeTaskData()))
    }
  }

  return new AddTaskRepositoryStub()
}

interface SutTypes {
  sut: DbAddTask
  addTaskRepositoryStub: AddTaskRepository
}

const makeSut = (): SutTypes => {
  const addTaskRepositoryStub = makeAddTaskRepository()
  const sut = new DbAddTask(addTaskRepositoryStub)

  return {
    sut,
    addTaskRepositoryStub
  }
}

describe('DbAddTask Usevase', () => {
  test('Should call AddTaskRepository with correct values', async () => {
    const { sut, addTaskRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addTaskRepositoryStub, 'add')

    const taskData = makeFakeAddTaskData()
    await sut.add(taskData)

    expect(addSpy).toHaveBeenCalledWith(taskData)
  })

  test('Should throw if AddTaskRepository throws', async () => {
    const { sut, addTaskRepositoryStub } = makeSut()
    jest.spyOn(addTaskRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.add(makeFakeAddTaskData())
    await expect(promise).rejects.toThrow()
  })
})
