import { Inject, Injectable } from '@nestjs/common';
import { TOKEN_REPOSITORY } from '../domain/port/token.repository';
import type { TokenRepository } from '../domain/port/token.repository';

/**
 * RefreshTokenApp orchestrates the refresh token use case.
 */
@Injectable()
export class RefreshTokenApp {
    /**
     * @param _tokenRepository - The repository used to verify the refresh token and issue a new access token.
     */
    constructor(@Inject(TOKEN_REPOSITORY) private readonly _tokenRepository: TokenRepository) {}

    /**
     * Issues a new access token from a valid refresh token. The refresh token itself is not rotated.
     * @param refreshToken - The refresh token to verify.
     * @returns The newly issued access token.
     */
    public async refresh(refreshToken: string): Promise<string> {
        const payload = await this._tokenRepository.verifyRefreshToken(refreshToken);
        return this._tokenRepository.generateAccessToken({ sub: payload.sub, email: payload.email });
    }
}
