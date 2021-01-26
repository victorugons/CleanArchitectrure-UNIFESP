import { UserData, Name, Email } from '@/entities'
import { Either, left, right } from '@/shared'
import { InvalidNameError, InvalidEmailError } from '@/entities/errors'

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
        return left(nameOrError.value)
      }

      if (emailOrError.isLeft()) {
        return left(emailOrError.value)
      }

      const name: Name = nameOrError.value as Name
      const email: Email = emailOrError.value as Email

      return right(new User(name, email))
    }
}
