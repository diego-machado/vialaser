import { TaskModel } from '../../../../domain/models/task'
import { DbLoadTaskByUser } from './db-load-task-by-user'
import { LoadTaskByUserRepository } from '../../../protocols/db/task/load-task-repository'
import { LoadTaskByUserModel } from '../../../../domain/usecases/load-task-by-user'

interface SutTypes {
  sut: DbLoadTaskByUser
  loadTaskByUserRepositoryStub: LoadTaskByUserRepository
}

const makeLoadTaskByUserRepositoryRepository = (): LoadTaskByUserRepository => {
  class LoadTaskByUserRepositoryStub implements LoadTaskByUserRepository {
    async load (accountId: LoadTaskByUserModel): Promise<TaskModel[]> {
      return new Promise(resolve => resolve(makeFakeData()))
    }
  }
  return new LoadTaskByUserRepositoryStub()
}

const makeFakeData = (): TaskModel[] => ([
  {
    id: 'any_id',
    title: 'any_task',
    description: 'any_description',
    done: true,
    accountId: 'any_id',
    createdAt: new Date('2020-02-28')
  },
  {
    id: 'any_id',
    title: 'any_task',
    description: 'any_description',
    done: true,
    accountId: 'any_id',
    createdAt: new Date('2020-02-28')
  }
])

const makeSut = (): SutTypes => {
  const loadTaskByUserRepositoryStub = makeLoadTaskByUserRepositoryRepository()
  const sut = new DbLoadTaskByUser(loadTaskByUserRepositoryStub)

  return {
    sut,
    loadTaskByUserRepositoryStub
  }
}

describe('LoadTaskByUserRepository Usecase', () => {
  test('Should call LoadAccountByTokenRepository witg correct values', async () => {
    const { sut, loadTaskByUserRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadTaskByUserRepositoryStub, 'load')
    await sut.load({ accountId: 'any_id' })

    expect(loadSpy).toHaveBeenCalledWith({ accountId: 'any_id' })
  })

  test('Should return null if LoadTaskByUserRepository returns null', async () => {
    const { sut, loadTaskByUserRepositoryStub } = makeSut()
    jest.spyOn(loadTaskByUserRepositoryStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load({ accountId: 'any_id' })
    expect(account).toBeNull()
  })

  test('Should return tasks on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load({ accountId: 'any_id' })
    expect(account).toEqual(makeFakeData())
  })

  test('Should throw if LoadTaskByUserRepository throws', async () => {
    const { sut, loadTaskByUserRepositoryStub } = makeSut()
    jest.spyOn(loadTaskByUserRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load({ accountId: 'any_id' })
    await expect(promise).rejects.toThrow()
  })
})
