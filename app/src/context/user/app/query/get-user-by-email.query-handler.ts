import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserApp } from '../user.app';
import { User } from '../../domain/user';
import { GetUserByEmailQuery } from './get-user-by-email.query';

/**
 * GetUserByEmailQueryHandler handles the GetUserByEmailQuery, delegating to the UserApp use case.
 */
@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler implements IQueryHandler<GetUserByEmailQuery> {
    /**
     * @param _userApp - The application service used to query users.
     */
    constructor(private readonly _userApp: UserApp) {}

    /**
     * Executes the query, looking up a user by email.
     * @param query - The query carrying the email to look up.
     * @returns The matching user, or null if none was found.
     */
    public async execute(query: GetUserByEmailQuery): Promise<User | null> {
        return this._userApp.getByEmail(query.email);
    }
}
