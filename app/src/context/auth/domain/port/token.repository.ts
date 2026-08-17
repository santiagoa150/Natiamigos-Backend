export const TOKEN_REPOSITORY = Symbol('TOKEN_REPOSITORY');

/**
 * TokenPayload represents the data encoded into the issued tokens.
 */
export interface TokenPayload {
    sub: string;
    email: string;
}

/**
 * AuthTokens represents the pair of tokens issued after a successful authentication.
 */
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

/**
 * TokenRepository defines the operations available to issue and verify authentication tokens.
 */
export interface TokenRepository {
    /**
     * Generates an access token and a refresh token for the given payload.
     * @param payload - The data to encode into the tokens.
     * @returns The generated access and refresh tokens.
     */
    generateTokens(payload: TokenPayload): Promise<AuthTokens>;

    /**
     * Generates a new access token for the given payload.
     * @param payload - The data to encode into the token.
     * @returns The generated access token.
     */
    generateAccessToken(payload: TokenPayload): Promise<string>;

    /**
     * Verifies a refresh token and returns its decoded payload.
     * @param refreshToken - The refresh token to verify.
     * @returns The decoded token payload.
     */
    verifyRefreshToken(refreshToken: string): Promise<TokenPayload>;
}
