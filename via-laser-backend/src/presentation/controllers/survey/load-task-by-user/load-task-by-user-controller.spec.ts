import { HttpRequest, LoadTaskByUser, LoadTaskByUserModel, Validation } from './load-task-by-user-controller-protocols'
import { LoadTaskByUserController } from './load-task-by-user-controller'
import { badRequest, serverError } from '../../../helpers/http/http-helper'
import { TaskModel } from '../../../../domain/models/task'

const makeFakeTask = (): TaskModel[] => ([{
  id: 'any_id',
  title: 'any_task',
  description: 'any_description',
  done: true,
  accountId: 'any_id',
  createdAt: new Date('2020-02-28')
}])

const makeFakeTaskRequest = (): HttpRequest => ({
  params: {
    accountId: 'any_id'
  }
})

interface SutTypes {
  sut: LoadTaskByUserController
  validationStub: Validation
  loadTaskByUserStub: LoadTaskByUser
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const loadTaskByUserStub = makeLoadTaskByUser()
  const sut = new LoadTaskByUserController(validationStub, loadTaskByUserStub)
  return {
    sut,
    validationStub,
    loadTaskByUserStub
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

const makeLoadTaskByUser = (): LoadTaskByUser => {
  class LoadTaskByUserStub implements LoadTaskByUser {
    async load (data: LoadTaskByUserModel): Promise<TaskModel[]> {
      return new Promise(resolve => resolve(makeFakeTask()))
    }
  }

  return new LoadTaskByUserStub()
}

describe('LoadTaskByUser Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validadeSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeTaskRequest()
    await sut.handle(httpRequest)

    expect(validadeSpy).toHaveBeenCalledWith(httpRequest.query)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

    const httpResponse = await sut.handle(makeFakeTaskRequest())

    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should return 500 if LoadTaskByUser throws', async () => {
    const { sut, loadTaskByUserStub } = makeSut()
    jest.spyOn(loadTaskByUserStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpResponse = await sut.handle(makeFakeTaskRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

})
