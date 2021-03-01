import { RequiredFieldValidation } from '../../../../../validation/validators'
import { ValidationComposite } from '../../../../../validation/validators/validation-composite'
import { Validation } from '../../../../../presentation/protocols/validation'

export const makeLoadTaskByUserValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['accountId']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
