/**
 * Exception response class for NestJS.
 */
export class ExceptionResponse {
    readonly success = false;
    timestamp: string = '';
    message: string = '';
    statusCode: number = 500;
}
