import { HttpRequest, DeleteTask, DeleteTaskModel, Validation } from './delete-task-controller-protocols'
import { DeleteTaskController } from './delete-task-controller'
import { badRequest, serverError } from '../../../helpers/http/http-helper'

const makeFakeTaskRequest = (): HttpRequest => ({
  params: {
    id: 'any_id'
  }
})

interface SutTypes {
  sut: DeleteTaskController
  validationStub: Validation
  deleteTaskStub: DeleteTask
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const deleteTaskStub = makeDeleteTask()
  const sut = new DeleteTaskController(validationStub, deleteTaskStub)
  return {
    sut,
    validationStub,
    deleteTaskStub
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

const makeDeleteTask = (): DeleteTask => {
  class DeleteTaskStub implements DeleteTask {
    async delete (data: DeleteTaskModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new DeleteTaskStub()
}

describe('DeleteTask Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validadeSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeTaskRequest()
    await sut.handle(httpRequest)

    expect(validadeSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 400 if validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

    const httpResponse = await sut.handle(makeFakeTaskRequest())

    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call DeleteTask with correct values', async () => {
    const { sut, deleteTaskStub } = makeSut()
    const DeleteSpy = jest.spyOn(deleteTaskStub, 'delete')
    const httpRequest = makeFakeTaskRequest()
    await sut.handle(httpRequest)

    expect(DeleteSpy).toHaveBeenCalledWith(httpRequest.params)
  })

  test('Should return 500 if DeleteTask throws', async () => {
    const { sut, deleteTaskStub } = makeSut()
    jest.spyOn(deleteTaskStub, 'delete').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpResponse = await sut.handle(makeFakeTaskRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on delete task success', async () => {
    const { sut } = makeSut()
    const task = makeFakeTaskRequest()
    const httpResponse = await sut.handle(task)

    expect(httpResponse.statusCode).toEqual(200)
  })
})
