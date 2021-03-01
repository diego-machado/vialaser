import { RequiredFieldValidation } from '../../../../../validation/validators'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'
import { Validation } from '../../../../../presentation/protocols/validation'

export const makeAddTaskValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['title', 'description', 'done', 'accountId', 'createdAt']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
