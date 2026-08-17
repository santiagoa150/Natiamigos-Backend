/**
 * AuthErrorMessages contains the error messages used across the Auth domain.
 */
export const AuthErrorMessages = {
    invalidApiKey: (): string => 'The provided API key is not valid.',
    invalidCredentials: (): string => 'The provided email or password is not valid.',
    invalidRefreshToken: (): string => 'The provided refresh token is not valid or has expired.',
};
