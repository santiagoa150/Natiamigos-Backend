import { ICommand } from '@nestjs/cqrs';

/**
 * LoginCommand carries the credentials needed to log in a user.
 */
export class LoginCommand implements ICommand {
    /**
     * @param email - The email of the user.
     * @param password - The password of the user.
     */
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) {}
}
