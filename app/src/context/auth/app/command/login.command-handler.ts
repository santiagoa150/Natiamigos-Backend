import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginApp } from '../login.app';
import { JwtTokens } from '../../domain/port/jwt.repository';
import { LoginCommand } from './login.command';

/**
 * LoginCommandHandler handles the LoginCommand, delegating to the LoginApp use case.
 */
@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
    /**
     * @param _loginApp - The application service used to log in users.
     */
    constructor(private readonly _loginApp: LoginApp) {}

    /**
     * Executes the command, logging in a user.
     * @param command - The command carrying the login credentials.
     * @returns The issued access and refresh tokens.
     */
    public async execute(command: LoginCommand): Promise<JwtTokens> {
        return this._loginApp.login(command.email, command.password);
    }
}
