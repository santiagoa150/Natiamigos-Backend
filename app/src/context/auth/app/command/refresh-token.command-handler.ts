import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenApp } from '../refresh-token.app';
import { RefreshTokenCommand } from './refresh-token.command';

/**
 * RefreshTokenCommandHandler handles the RefreshTokenCommand, delegating to the RefreshTokenApp use case.
 */
@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler implements ICommandHandler<RefreshTokenCommand> {
    /**
     * @param _refreshTokenApp - The application service used to refresh access tokens.
     */
    constructor(private readonly _refreshTokenApp: RefreshTokenApp) {}

    /**
     * Executes the command, issuing a new access token.
     * @param command - The command carrying the refresh token.
     * @returns The newly issued access token.
     */
    public async execute(command: RefreshTokenCommand): Promise<string> {
        return this._refreshTokenApp.refresh(command.refreshToken);
    }
}
