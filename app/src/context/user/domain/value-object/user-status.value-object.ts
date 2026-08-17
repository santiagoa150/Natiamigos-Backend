import { HttpStatus } from '@nestjs/common';
import { StringValueObject } from '@shared/domain/value-object/string.value-object';
import { Exception } from '@shared/domain/error/exception';

/**
 * UserStatus enumerates the valid statuses a user can have.
 */
export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

/**
 * UserStatusValueObject class represents a value object that encapsulates a user's status.
 */
export class UserStatusValueObject extends StringValueObject {
    /**
     * Creates a new instance of UserStatusValueObject with the provided value.
     * @param value - The user status to be encapsulated.
     */
    public static create(value: string): UserStatusValueObject {
        UserStatusValueObject.validate(value);
        return new UserStatusValueObject(value);
    }

    /**
     * Creates a new UserStatusValueObject with the ACTIVE status.
     */
    public static createActive(): UserStatusValueObject {
        return new UserStatusValueObject(UserStatus.ACTIVE);
    }

    /**
     * Creates a new UserStatusValueObject with the INACTIVE status.
     */
    public static createInactive(): UserStatusValueObject {
        return new UserStatusValueObject(UserStatus.INACTIVE);
    }

    /**
     * Validates that the given value is one of the valid user statuses.
     * @param value - The user status to validate.
     */
    public static validate(value: string): void {
        if (!Object.values(UserStatus).includes(value as UserStatus)) {
            throw new Exception(`The user status "${value}" is not valid.`, HttpStatus.BAD_REQUEST);
        }
    }
}
