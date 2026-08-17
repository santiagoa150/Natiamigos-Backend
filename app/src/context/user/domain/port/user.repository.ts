import { IdValueObject } from '@shared/domain/value-object/id.value-object';
import { User } from '../user';
import { EmailValueObject } from '../value-object/email.value-object';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

/**
 * UserRepository defines the persistence operations available for the User aggregate.
 */
export interface UserRepository {
    /**
     * Persists a new user.
     * @param user - The user to persist.
     */
    create(user: User): Promise<void>;

    /**
     * Finds a user by its unique identifier.
     * @param id - The unique identifier of the user.
     * @returns The matching user, or null if none was found.
     */
    getById(id: IdValueObject): Promise<User | null>;

    /**
     * Finds a user by its email.
     * @param email - The email of the user.
     * @returns The matching user, or null if none was found.
     */
    getByEmail(email: EmailValueObject): Promise<User | null>;
}
