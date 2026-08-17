import { HttpStatus } from '@nestjs/common';
import { StringValueObject } from '@shared/domain/value-object/string.value-object';
import { Exception } from '@shared/domain/error/exception';
import { UserErrorMessages } from '../error/user-error.constant';

const EMAIL_REGEX = /^[^\s@+]+@[^\s@+]+\.[^\s@+]+$/;

/**
 * EmailValueObject class represents a value object that encapsulates an email address.
 * Emails containing a "+" character are not allowed.
 */
export class EmailValueObject extends StringValueObject {
    /**
     * Creates a new instance of EmailValueObject with the provided value.
     * @param value - The email address to be encapsulated.
     */
    public static create(value: string): EmailValueObject {
        EmailValueObject.validate(value);
        return new EmailValueObject(value);
    }

    /**
     * Validates that the given value is a well-formed email address without a "+" character.
     * @param value - The email address to validate.
     */
    public static validate(value: string): void {
        if (!EMAIL_REGEX.test(value)) {
            throw new Exception(UserErrorMessages.invalidEmail(value), HttpStatus.BAD_REQUEST);
        }
    }
}
