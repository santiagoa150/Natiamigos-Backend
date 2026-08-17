import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Exception } from '@shared/domain/error/exception';
import { CRYPTO_REPOSITORY } from '@shared/domain/port/crypto.repository';
import type { CryptoRepository } from '@shared/domain/port/crypto.repository';
import { User } from '../domain/user';
import { USER_REPOSITORY } from '../domain/port/user.repository';
import type { UserRepository } from '../domain/port/user.repository';
import { UserErrorMessages } from '../domain/error/user-error.constant';
import { PasswordValueObject } from '../domain/value-object/password.value-object';

/**
 * UserApp orchestrates the user use cases.
 */
@Injectable()
export class UserApp {
    private readonly _logger = new Logger(UserApp.name);

    /**
     * @param _repository - The repository used to persist and query users.
     * @param _cryptoRepository - The repository used to hash sensitive values, such as passwords.
     */
    constructor(
        @Inject(USER_REPOSITORY) private readonly _repository: UserRepository,
        @Inject(CRYPTO_REPOSITORY) private readonly _cryptoRepository: CryptoRepository,
    ) {}

    /**
     * Registers a new user, validating its data through the domain and ensuring its email is not already in use.
     * @param name - The name of the user.
     * @param email - The email of the user.
     * @param password - The password of the user.
     * @returns The newly registered user.
     */
    public async register(name: string, email: string, password: string): Promise<User> {
        PasswordValueObject.validate(password);
        const hashedPassword = await this._cryptoRepository.hash(password);
        const user = User.register(name, email, hashedPassword);

        const existingUser = await this._repository.getByEmail(user.email);
        if (existingUser) {
            throw new Exception(UserErrorMessages.emailAlreadyExists(user.email.toString()), HttpStatus.CONFLICT);
        }

        await this._repository.create(user);
        this._logger.log(`User registered with email: ${user.email.toString()}`);
        return user;
    }
}
