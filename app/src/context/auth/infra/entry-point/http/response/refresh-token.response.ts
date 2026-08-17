import { ApiProperty } from '@nestjs/swagger';

/**
 * RefreshTokenResponse represents the HTTP response body returned after refreshing an access token.
 */
export class RefreshTokenResponse {
    @ApiProperty({
        description: 'The newly issued access token.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMifQ.abc123',
    })
    accessToken!: string;
}
