export const JWT_REPOSITORY = Symbol('JWT_REPOSITORY');

/**
 * JwtPayload represents the data encoded into the issued tokens.
 */
export interface JwtPayload {
    sub: string;
    email: string;
}

/**
 * JwtTokens represents the pair of tokens issued after a successful authentication.
 */
export interface JwtTokens {
    accessToken: string;
    refreshToken: string;
}

/**
 * JwtRepository defines the operations available to issue JWT tokens.
 */
export interface JwtRepository {
    /**
     * Generates an access token and a refresh token for the given payload.
     * @param payload - The data to encode into the tokens.
     * @returns The generated access and refresh tokens.
     */
    generateTokens(payload: JwtPayload): Promise<JwtTokens>;
}
