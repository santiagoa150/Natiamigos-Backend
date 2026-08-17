import { ApiProperty } from '@nestjs/swagger';

/**
 * Exception response class for NestJS.
 */
export class ExceptionResponse {
    @ApiProperty({ description: 'The response status indicating success.', example: false })
    readonly success = false;

    @ApiProperty({ description: 'The ISO timestamp at which the error occurred.', example: new Date().toISOString() })
    timestamp: string = '';

    @ApiProperty({ description: 'The error message.', example: 'The request could not be processed.' })
    message: string = '';

    @ApiProperty({ description: 'The HTTP status code associated with the error.', example: 400 })
    statusCode: number = 500;
}
