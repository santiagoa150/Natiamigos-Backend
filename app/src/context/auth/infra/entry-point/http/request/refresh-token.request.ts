import { ApiProperty } from '@nestjs/swagger';

/**
 * RefreshTokenRequest represents the HTTP request body to refresh an access token.
 */
export class RefreshTokenRequest {
    @ApiProperty({
        description: 'The refresh token previously issued at login.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMifQ.def456',
    })
    refreshToken!: string;
}
