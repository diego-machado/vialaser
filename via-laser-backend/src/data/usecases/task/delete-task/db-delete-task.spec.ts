import { DbDeleteTask } from './db-delete-task'
import { DeleteTaskModel, DeleteTaskRepository } from './db-delete-protocols'

const makedeleteTaskRepository = (): DeleteTaskRepository => {
  class DeleteTaskRepositoryStub implements DeleteTaskRepository {
    async delete (data: DeleteTaskModel): Promise<void> {

    }
  }

  return new DeleteTaskRepositoryStub()
}

interface SutTypes {
  sut: DbDeleteTask
  deleteTaskRepositoryStub: DeleteTaskRepository
}

const makeSut = (): SutTypes => {
  const deleteTaskRepositoryStub = makedeleteTaskRepository()
  const sut = new DbDeleteTask(deleteTaskRepositoryStub)

  return {
    sut,
    deleteTaskRepositoryStub
  }
}

describe('DbDeleteTask Usevase', () => {
  test('Should call DeleteTaskRepository with correct values', async () => {
    const { sut, deleteTaskRepositoryStub } = makeSut()

    const deleteSpy = jest.spyOn(deleteTaskRepositoryStub, 'delete')

    await sut.delete({ id: 'any_id' })

    expect(deleteSpy).toHaveBeenCalledWith({ id: 'any_id' })
  })

  test('Should throw if DeleteTaskRepository throws', async () => {
    const { sut, deleteTaskRepositoryStub } = makeSut()
    jest.spyOn(deleteTaskRepositoryStub, 'delete').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.delete({ id: 'any_id' })
    await expect(promise).rejects.toThrow()
  })
})
