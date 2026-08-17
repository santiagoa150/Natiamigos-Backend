import { IdValueObject } from '@shared/domain/value-object/id.value-object';
import { StringValueObject } from '@shared/domain/value-object/string.value-object';
import { EmailValueObject } from './value-object/email.value-object';
import { PasswordValueObject } from './value-object/password.value-object';
import { UserStatusValueObject } from './value-object/user-status.value-object';

/**
 * User represents a user in the domain model.
 */
export class User {
    /**
     * @param _id - The unique identifier of the user.
     * @param _name - The name of the user.
     * @param _email - The email of the user.
     * @param _password - The password of the user.
     * @param _status - The status of the user.
     */
    constructor(
        private readonly _id: IdValueObject,
        private readonly _name: StringValueObject,
        private readonly _email: EmailValueObject,
        private readonly _password: PasswordValueObject,
        private readonly _status: UserStatusValueObject,
    ) {}

    /**
     * Creates a new User instance.
     */
    public static create(id: string, name: string, email: string, password: string, status: string): User {
        return new User(
            IdValueObject.create(id),
            StringValueObject.create(name),
            EmailValueObject.create(email),
            PasswordValueObject.create(password),
            UserStatusValueObject.create(status),
        );
    }

    /**
     * Registers a new User, generating its identifier and setting it as ACTIVE.
     */
    public static register(name: string, email: string, password: string): User {
        return new User(
            IdValueObject.generate(),
            StringValueObject.create(name),
            EmailValueObject.create(email),
            PasswordValueObject.create(password),
            UserStatusValueObject.createActive(),
        );
    }

    get id(): IdValueObject {
        return this._id;
    }

    get name(): StringValueObject {
        return this._name;
    }

    get email(): EmailValueObject {
        return this._email;
    }

    get password(): PasswordValueObject {
        return this._password;
    }

    get status(): UserStatusValueObject {
        return this._status;
    }
}
