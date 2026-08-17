import { ApiProperty } from '@nestjs/swagger';

/**
 * LoginResponse represents the HTTP response body returned after a successful login.
 */
export class LoginResponse {
    @ApiProperty({
        description: 'The access token used to authenticate subsequent requests.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMifQ.abc123',
    })
    accessToken!: string;

    @ApiProperty({
        description: 'The refresh token used to obtain a new access token once it expires.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMifQ.def456',
    })
    refreshToken!: string;
}
