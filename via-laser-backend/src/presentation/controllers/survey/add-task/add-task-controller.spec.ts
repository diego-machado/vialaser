import { HttpRequest, AddTask, AddTaskModel, Validation } from './add-task-controller-protocols'
import { AddTaskController } from './add-task-controller'
import { badRequest, serverError } from '../../../helpers/http/http-helper'
import { TaskModel } from '../../../../domain/models/task'

const makeFakeTask = (): TaskModel => ({
  id: 'any_id',
  title: 'any_task',
  description: 'any_description',
  done: true,
  accountId: 'any_id',
  createdAt: new Date('2020-02-28')
})

const makeFakeTaskRequest = (): HttpRequest => ({
  body: {
    title: 'any_task',
    description: 'any_description',
    done: true,
    accountId: 'any_id',
    createdAt: new Date('2020-02-28')
  }
})

interface SutTypes {
  sut: AddTaskController
  validationStub: Validation
  addTaskStub: AddTask
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addTaskStub = makeAddTask()
  const sut = new AddTaskController(validationStub, addTaskStub)
  return {
    sut,
    validationStub,
    addTaskStub
  }
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

const makeAddTask = (): AddTask => {
  class AddTaskStub implements AddTask {
    async add (data: AddTaskModel): Promise<TaskModel> {
      return new Promise(resolve => resolve(makeFakeTask()))
    }
  }

  return new AddTaskStub()
}

describe('AddTask Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validadeSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeTaskRequest()
    await sut.handle(httpRequest)

    expect(validadeSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

    const httpResponse = await sut.handle(makeFakeTaskRequest())

    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddTask with correct values', async () => {
    const { sut, addTaskStub } = makeSut()
    const addSpy = jest.spyOn(addTaskStub, 'add')
    const httpRequest = makeFakeTaskRequest()
    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddTask throws', async () => {
    const { sut, addTaskStub } = makeSut()
    jest.spyOn(addTaskStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpResponse = await sut.handle(makeFakeTaskRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return a task on success', async () => {
    const { sut } = makeSut()
    const task = makeFakeTaskRequest()
    const httpResponse = await sut.handle(task)

    expect(httpResponse.body.title).toEqual(task.body.title)
  })
})
