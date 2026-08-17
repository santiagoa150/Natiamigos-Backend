import { ApiProperty } from '@nestjs/swagger';

/**
 * This class represents a successful HTTP response.
 */
export class HttpSuccessfulResponse {
    @ApiProperty({ description: 'The response status indicating success' })
    success: boolean = true;
}
