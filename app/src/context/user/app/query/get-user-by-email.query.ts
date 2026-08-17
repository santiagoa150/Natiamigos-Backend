import { IQuery } from '@nestjs/cqrs';

/**
 * GetUserByEmailQuery carries the email used to look up a user.
 */
export class GetUserByEmailQuery implements IQuery {
    /**
     * @param email - The email of the user to look up.
     */
    constructor(public readonly email: string) {}
}
