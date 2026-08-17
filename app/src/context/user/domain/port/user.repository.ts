import { IdValueObject } from '@shared/domain/value-object/id.value-object';
import { User } from '../user';

/**
 * UserRepository defines the persistence operations available for the User aggregate.
 */
export interface UserRepository {
    /**
     * Persists the given user, creating or updating it as needed.
     * @param user - The user to persist.
     */
    save(user: User): Promise<void>;

    /**
     * Finds a user by its unique identifier.
     * @param id - The unique identifier of the user.
     * @returns The matching user, or null if none was found.
     */
    findById(id: IdValueObject): Promise<User | null>;
}
