import { Inject, Injectable } from '@nestjs/common';
import { API_KEY_REPOSITORY } from '../domain/port/api-key.repository';
import type { ApiKeyRepository } from '../domain/port/api-key.repository';

/**
 * ApiKeyApp orchestrates the API key use cases.
 */
@Injectable()
export class ApiKeyApp {
    /**
     * @param _repository - The repository used to validate API keys.
     */
    constructor(@Inject(API_KEY_REPOSITORY) private readonly _repository: ApiKeyRepository) {}

    /**
     * Validates the given API key.
     * @param apiKey - The API key to validate.
     * @returns Whether the API key is valid.
     */
    public async validate(apiKey: string): Promise<boolean> {
        return this._repository.isValid(apiKey);
    }
}
