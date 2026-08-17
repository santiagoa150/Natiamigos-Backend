import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CryptoRepository } from '../../../domain/port/crypto.repository';

/**
 * Argon2Repository is the Argon2id implementation of the CryptoRepository port.
 * It appends an application-wide secret pepper to every value before hashing or comparing it.
 */
@Injectable()
export class Argon2Repository implements CryptoRepository {
    /**
     * @param _configService - Used to read the CRYPTO_PEPPER secret.
     */
    constructor(private readonly _configService: ConfigService) {}

    /**
     * @inheritDoc
     */
    public async hash(value: string): Promise<string> {
        return argon2.hash(this._withPepper(value), { type: argon2.argon2id });
    }

    /**
     * @inheritDoc
     */
    public async compare(value: string, hash: string): Promise<boolean> {
        return argon2.verify(hash, this._withPepper(value));
    }

    /**
     * Appends the application-wide pepper to the given value.
     * @param value - The value to pepper.
     */
    private _withPepper(value: string): string {
        return `${value}${this._configService.get<string>('CRYPTO_PEPPER')}`;
    }
}
