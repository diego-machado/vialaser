import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { makeAddTaskController } from './add-task-controller-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddTaskValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddTaskController()
    const validations: Validation[] = []
    for (const field of ['title', 'description', 'done', 'accountId', 'createdAt']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
