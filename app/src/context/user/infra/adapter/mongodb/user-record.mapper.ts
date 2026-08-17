import { User } from '../../../domain/user';
import { UserRecord } from './user.schema';

/**
 * UserRecordMapper converts between the User domain entity and its UserRecord persistence representation.
 */
export class UserRecordMapper {
    /**
     * Creates a User domain entity from a UserRecord.
     * @param record - The UserRecord to convert.
     * @returns The resulting User domain entity.
     */
    public create(record: UserRecord): User {
        return User.create(record.id, record.name, record.email, record.status);
    }

    /**
     * Normalizes a User domain entity into its UserRecord representation.
     * @param domain - The User domain entity to convert.
     * @returns The resulting UserRecord.
     */
    public normalize(domain: User): UserRecord {
        return {
            id: domain.id.toString(),
            name: domain.name.toString(),
            email: domain.email.toString(),
            status: domain.status.toString(),
        };
    }
}
