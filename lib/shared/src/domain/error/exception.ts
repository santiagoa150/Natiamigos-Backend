import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Exception is a base class for exceptions that are shared across the application.
 */
export class Exception extends HttpException {
    /**
     * @param message - The message to be displayed in the exception.
     * @param status - The HTTP status code associated with the exception.
     * @param privateError - An optional internal error to be logged, not exposed to the client.
     */
    constructor(
        public readonly message: string,
        status: HttpStatus,
        public readonly privateError?: unknown,
    ) {
        super({ message }, status);
    }
}
