import { ICommand } from '@nestjs/cqrs';

/**
 * RefreshTokenCommand carries the refresh token used to issue a new access token.
 */
export class RefreshTokenCommand implements ICommand {
    /**
     * @param refreshToken - The refresh token to verify.
     */
    constructor(public readonly refreshToken: string) {}
}
