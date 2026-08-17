import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { Exception } from '@shared/domain/error/exception';
import { AuthErrorMessages } from '../../../domain/error/auth-error.constant';
import { AuthTokens, TokenPayload, TokenRepository } from '../../../domain/port/token.repository';

/**
 * NestJwtRepository is the @nestjs/jwt-based implementation of the TokenRepository port.
 * It signs the access and refresh tokens with independent secrets and expirations.
 */
@Injectable()
export class NestJwtRepository implements TokenRepository {
    /**
     * @param _jwtService - Used to sign and verify the tokens.
     * @param _configService - Used to read the JWT secrets and expirations.
     */
    constructor(
        private readonly _jwtService: JwtService,
        private readonly _configService: ConfigService,
    ) {}

    /**
     * @inheritDoc
     */
    public async generateTokens(payload: TokenPayload): Promise<AuthTokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(payload),
            this._signToken(payload, 'JWT_REFRESH_TOKEN_SECRET', 'JWT_REFRESH_TOKEN_EXPIRATION'),
        ]);
        return { accessToken, refreshToken };
    }

    /**
     * @inheritDoc
     */
    public async generateAccessToken(payload: TokenPayload): Promise<string> {
        return this._signToken(payload, 'JWT_ACCESS_TOKEN_SECRET', 'JWT_ACCESS_TOKEN_EXPIRATION');
    }

    /**
     * @inheritDoc
     */
    public async verifyRefreshToken(refreshToken: string): Promise<TokenPayload> {
        try {
            return await this._jwtService.verifyAsync<TokenPayload>(refreshToken, {
                secret: this._configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            });
        } catch (error) {
            throw new Exception(AuthErrorMessages.invalidRefreshToken(), HttpStatus.UNAUTHORIZED, error);
        }
    }

    /**
     * Signs a token with the secret and expiration read from the given environment variable names.
     * @param payload - The data to encode into the token.
     * @param secretKey - The environment variable name holding the signing secret.
     * @param expirationKey - The environment variable name holding the token expiration.
     */
    private async _signToken(payload: TokenPayload, secretKey: string, expirationKey: string): Promise<string> {
        return this._jwtService.signAsync(payload, {
            secret: this._configService.get<string>(secretKey),
            expiresIn: this._configService.get<string>(expirationKey) as StringValue,
        });
    }
}
