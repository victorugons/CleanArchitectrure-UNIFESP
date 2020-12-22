import { User } from './user'
import { left } from '../shared/either'
import { InvalidNameError } from './errors/invalid-name-error'
import { InvalidEmailError } from './errors/invalid-email-error'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any_name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })

  test('should not create user with invalid name (too few chracters)', () => {
    const invalidName = 'O        '
    const error = User.create({ name: invalidName, email: 'any@mail.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should not create user with invalid name (too many chracters)', () => {
    const invalidName = 'O'.repeat(257)
    const error = User.create({ name: invalidName, email: 'any@mail.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })
})
