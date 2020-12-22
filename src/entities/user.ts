import { UserData } from './user-data'
import { Either, left, right } from '../shared/either'
import { InvalidNameError } from './errors/invalid-name-error'
import { InvalidEmailError } from './errors/invalid-email-error'
import { Name } from './name'
import { Email } from './email'

export class User {
    public readonly email: Email
    public readonly name: Name

    private constructor (name: Name, email: Email) {
      this.name = name
      this.email = email
    }

    static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
      const nameOrError = Name.create(userData.name)
      const emailOrError = Email.create(userData.email)

      if (nameOrError.isLeft()) {
        return left(new InvalidNameError())
      }

      if (emailOrError.isLeft()) {
        return left(new InvalidEmailError())
      }

      const name: Name = nameOrError.value as Name
      const email: Email = emailOrError.value as Email

      return right(new User(name, email))
    }
}
