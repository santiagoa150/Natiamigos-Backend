import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'node:crypto';
import { ApiKeyRepository } from '../../../domain/port/api-key.repository';

/**
 * NestApiKeyRepository is the ConfigService-based implementation of the ApiKeyRepository port.
 * It validates API keys against the API_KEY environment variable.
 */
@Injectable()
export class NestApiKeyRepository implements ApiKeyRepository {
    /**
     * @param _configService - Used to read the API_KEY secret.
     */
    constructor(private readonly _configService: ConfigService) {}

    /**
     * @inheritDoc
     */
    public isValid(apiKey: string): Promise<boolean> {
        const expectedApiKey = this._configService.get<string>('API_KEY')!;
        const provided = Buffer.from(apiKey);
        const expected = Buffer.from(expectedApiKey);
        if (provided.length !== expected.length) {
            return Promise.resolve(false);
        }
        return Promise.resolve(timingSafeEqual(provided, expected));
    }
}
