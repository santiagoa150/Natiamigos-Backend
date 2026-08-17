import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Exception } from '@shared/domain/error/exception';
import { CRYPTO_REPOSITORY } from '@shared/domain/port/crypto.repository';
import type { CryptoRepository } from '@shared/domain/port/crypto.repository';
import { GetUserByEmailQuery } from '../../user/app/query/get-user-by-email.query';
import type { User } from '../../user/domain/user';
import { AuthErrorMessages } from '../domain/error/auth-error.constant';
import { TOKEN_REPOSITORY } from '../domain/port/token.repository';
import type { AuthTokens, TokenRepository } from '../domain/port/token.repository';

/**
 * LoginApp orchestrates the login use case.
 */
@Injectable()
export class LoginApp {
    /**
     * @param _queryBus - The query bus used to look up the user in the User context.
     * @param _cryptoRepository - The repository used to compare the provided password against the stored hash.
     * @param _tokenRepository - The repository used to issue access and refresh tokens.
     */
    constructor(
        private readonly _queryBus: QueryBus,
        @Inject(CRYPTO_REPOSITORY) private readonly _cryptoRepository: CryptoRepository,
        @Inject(TOKEN_REPOSITORY) private readonly _tokenRepository: TokenRepository,
    ) {}

    /**
     * Logs in a user, returning a new pair of access and refresh tokens.
     * The error thrown when the email or the password is not valid is intentionally the same,
     * to avoid leaking whether a given email is registered.
     * @param email - The email of the user.
     * @param password - The password of the user.
     * @returns The issued access and refresh tokens.
     */
    public async login(email: string, password: string): Promise<AuthTokens> {
        const user = await this._queryBus.execute<GetUserByEmailQuery, User | null>(new GetUserByEmailQuery(email));
        if (!user || !(await this._cryptoRepository.compare(password, user.password.toString()))) {
            throw new Exception(AuthErrorMessages.invalidCredentials(), HttpStatus.UNAUTHORIZED);
        }

        return this._tokenRepository.generateTokens({ sub: user.id.toString(), email: user.email.toString() });
    }
}
