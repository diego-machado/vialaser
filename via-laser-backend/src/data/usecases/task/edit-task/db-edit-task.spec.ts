import { DbEditTask } from './db-edit-task'
import { EditTaskModel, EditTaskRepository } from './db-edit-task-protocols'
import { TaskModel } from '../../../../domain/models/task'

const makeFakeTaskData = (): EditTaskModel => ({
  id: 'any_id',
  title: 'any_task',
  description: 'any_description',
  done: true,
  accountId: 'any_id',
  createdAt: new Date('2020-02-28')
})

const makeEditTaskRepository = (): EditTaskRepository => {
  class EditTaskRepositoryStub implements EditTaskRepository {
    async edit (data: EditTaskModel): Promise<TaskModel> {
      return new Promise(resolve => resolve(makeFakeTaskData()))
    }
  }

  return new EditTaskRepositoryStub()
}

interface SutTypes {
  sut: DbEditTask
  EditTaskRepositoryStub: EditTaskRepository
}

const makeSut = (): SutTypes => {
  const EditTaskRepositoryStub = makeEditTaskRepository()
  const sut = new DbEditTask(EditTaskRepositoryStub)

  return {
    sut,
    EditTaskRepositoryStub
  }
}

describe('DbEditTask Usecase', () => {
  test('Should call EditTaskRepository with correct values', async () => {
    const { sut, EditTaskRepositoryStub } = makeSut()

    const EditSpy = jest.spyOn(EditTaskRepositoryStub, 'edit')

    const taskData = makeFakeTaskData()
    await sut.edit(taskData)

    expect(EditSpy).toHaveBeenCalledWith(taskData)
  })

  test('Should throw if EditTaskRepository throws', async () => {
    const { sut, EditTaskRepositoryStub } = makeSut()
    jest.spyOn(EditTaskRepositoryStub, 'edit').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.edit(makeFakeTaskData())
    await expect(promise).rejects.toThrow()
  })
})
