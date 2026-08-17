import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import { JwtPayload, JwtRepository, JwtTokens } from '../../../domain/port/jwt.repository';

/**
 * NestJwtRepository is the @nestjs/jwt-based implementation of the JwtRepository port.
 * It signs the access and refresh tokens with independent secrets and expirations.
 */
@Injectable()
export class NestJwtRepository implements JwtRepository {
    /**
     * @param _jwtService - Used to sign the tokens.
     * @param _configService - Used to read the JWT secrets and expirations.
     */
    constructor(
        private readonly _jwtService: JwtService,
        private readonly _configService: ConfigService,
    ) {}

    /**
     * @inheritDoc
     */
    public async generateTokens(payload: JwtPayload): Promise<JwtTokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this._jwtService.signAsync(payload, {
                secret: this._configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                expiresIn: this._configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION') as StringValue,
            }),
            this._jwtService.signAsync(payload, {
                secret: this._configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
                expiresIn: this._configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION') as StringValue,
            }),
        ]);
        return { accessToken, refreshToken };
    }
}
