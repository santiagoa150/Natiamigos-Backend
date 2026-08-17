export const API_KEY_REPOSITORY = Symbol('API_KEY_REPOSITORY');

/**
 * ApiKeyRepository defines the operations available to validate an API key.
 */
export interface ApiKeyRepository {
    /**
     * Checks whether the given API key is valid.
     * @param apiKey - The API key to validate.
     * @returns Whether the API key is valid.
     */
    isValid(apiKey: string): Promise<boolean>;
}
