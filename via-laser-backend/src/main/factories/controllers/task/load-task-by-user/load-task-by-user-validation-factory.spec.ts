import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { makeLoadTaskByUserValidation } from './load-task-by-user-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddTaskValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadTaskByUserValidation()
    const validations: Validation[] = []
    for (const field of ['accountId']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
