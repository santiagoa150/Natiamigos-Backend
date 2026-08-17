import { HttpStatus } from '@nestjs/common';
import { StringValueObject } from '@shared/domain/value-object/string.value-object';
import { Exception } from '@shared/domain/error/exception';
import { UserErrorMessages } from '../error/user-error.constant';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

/**
 * PasswordValueObject class represents a value object that encapsulates a user's password.
 * It must contain at least 8 characters, one uppercase letter, one lowercase letter, one number,
 * and one special character.
 */
export class PasswordValueObject extends StringValueObject {
    /**
     * Creates a new instance of PasswordValueObject with the provided value.
     * @param value - The password to be encapsulated.
     */
    public static create(value: string): PasswordValueObject {
        return new PasswordValueObject(value);
    }

    /**
     * Validates that the given value meets the required password security criteria.
     * @param value - The password to validate.
     */
    public static validate(value: string): void {
        if (!PASSWORD_REGEX.test(value)) {
            throw new Exception(UserErrorMessages.invalidPassword(), HttpStatus.BAD_REQUEST);
        }
    }
}
