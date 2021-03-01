import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { makeDeleteTaskController } from './delete-task-controller-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddTaskValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeDeleteTaskController()
    const validations: Validation[] = []
    for (const field of ['id']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
