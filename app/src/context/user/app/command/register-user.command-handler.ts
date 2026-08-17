import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserApp } from '../user.app';
import { User } from '../../domain/user';
import { RegisterUserCommand } from './register-user.command';

/**
 * RegisterUserCommandHandler handles the RegisterUserCommand, delegating to the UserApp use case.
 */
@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
    /**
     * @param _userApp - The application service used to register users.
     */
    constructor(private readonly _userApp: UserApp) {}

    /**
     * Executes the command, registering a new user.
     * @param command - The command carrying the registration data.
     * @returns The newly registered user.
     */
    public async execute(command: RegisterUserCommand): Promise<User> {
        return this._userApp.register(command.name, command.email, command.password);
    }
}
