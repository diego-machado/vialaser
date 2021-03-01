import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddTaskController } from '../factories/controllers/task/add-task/add-task-controller-factory'
import { makeEditTaskController } from '../factories/controllers/task/edit-task/edit-task-controller-factory'
import { makeDeleteTaskController } from '../factories/controllers/task/delete-task/delete-task-controller-factory'
import { makeLoadTaskByUserController } from '../factories/controllers/task/load-task-by-user/load-task-by-user-controller-factory'

export default (router: Router): void => {
  router.post('/task', adaptRoute(makeAddTaskController()))
  router.put('/task', adaptRoute(makeEditTaskController()))
  router.delete('/task/:id', adaptRoute(makeDeleteTaskController()))
  router.get('/task', adaptRoute(makeLoadTaskByUserController()))
}
