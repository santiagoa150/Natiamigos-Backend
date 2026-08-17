import { ICommand } from '@nestjs/cqrs';

/**
 * RegisterUserCommand carries the data needed to register a new user.
 */
export class RegisterUserCommand implements ICommand {
    /**
     * @param name - The name of the user.
     * @param email - The email of the user.
     * @param password - The password of the user.
     */
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ) {}
}
