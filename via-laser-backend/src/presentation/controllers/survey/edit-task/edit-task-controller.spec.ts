import { HttpRequest, EditTask, EditTaskModel, Validation } from './edit-task-controller-protocols'
import { EditTaskController } from './edit-task-controller'
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
  sut: EditTaskController
  validationStub: Validation
  EditTaskStub: EditTask
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const EditTaskStub = makeEditTask()
  const sut = new EditTaskController(validationStub, EditTaskStub)
  return {
    sut,
    validationStub,
    EditTaskStub
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

const makeEditTask = (): EditTask => {
  class EditTaskStub implements EditTask {
    async edit (data: EditTaskModel): Promise<TaskModel> {
      return new Promise(resolve => resolve(makeFakeTask()))
    }
  }

  return new EditTaskStub()
}

describe('EditTask Controller', () => {
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

  test('Should call EditTask with correct values', async () => {
    const { sut, EditTaskStub } = makeSut()
    const EditSpy = jest.spyOn(EditTaskStub, 'edit')
    const httpRequest = makeFakeTaskRequest()
    await sut.handle(httpRequest)

    expect(EditSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if EditTask throws', async () => {
    const { sut, EditTaskStub } = makeSut()
    jest.spyOn(EditTaskStub, 'edit').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpResponse = await sut.handle(makeFakeTaskRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return an edited task on success', async () => {
    const { sut } = makeSut()
    const task = makeFakeTaskRequest()
    const httpResponse = await sut.handle(task)

    expect(httpResponse.body.title).toEqual(task.body.title)
  })
})
