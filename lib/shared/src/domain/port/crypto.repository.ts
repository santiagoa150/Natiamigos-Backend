export const CRYPTO_REPOSITORY = Symbol('CRYPTO_REPOSITORY');

/**
 * CryptoRepository defines the cryptographic hashing operations available across the application.
 */
export interface CryptoRepository {
    /**
     * Hashes the given plain value.
     * @param value - The plain value to hash.
     * @returns The resulting hash.
     */
    hash(value: string): Promise<string>;

    /**
     * Compares a plain value against a previously generated hash.
     * @param value - The plain value to compare.
     * @param hash - The hash to compare against.
     * @returns Whether the plain value matches the hash.
     */
    compare(value: string, hash: string): Promise<boolean>;
}
