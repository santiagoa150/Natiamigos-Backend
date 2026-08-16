import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Exception is a base class for exceptions that are shared across the application.
 */
export class Exception extends HttpException {
    /**
     * @param message - The message to be displayed in the exception.
     * @param status - The HTTP status code associated with the exception.
     * @param isWarning - Whether the exception should is a warning instead of an error.
     */
    constructor(
        public readonly message: string,
        status: HttpStatus,
        public readonly isWarning: boolean = false,
    ) {
        super({ message }, status);
    }
}
