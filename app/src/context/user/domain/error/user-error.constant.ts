/**
 * UserErrorMessages contains the error messages used across the User domain.
 */
export const UserErrorMessages = {
    invalidEmail: (value: string): string => `The email "${value}" is not valid.`,
    invalidStatus: (value: string): string => `The user status "${value}" is not valid.`,
    invalidPassword: (): string =>
        'Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.',
    emailAlreadyExists: (email: string): string => `A user with email "${email}" already exists.`,
};
