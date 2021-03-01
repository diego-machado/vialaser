import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { makeEditTaskController } from './edit-task-controller-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddTaskValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeEditTaskController()
    const validations: Validation[] = []
    for (const field of ['id', 'title', 'description', 'done', 'accountId', 'createdAt']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
