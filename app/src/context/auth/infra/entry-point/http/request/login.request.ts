import { ApiProperty } from '@nestjs/swagger';

/**
 * LoginRequest represents the HTTP request body to log in a user.
 */
export class LoginRequest {
    @ApiProperty({
        description: 'The email of the user.',
        example: 'john.doe@example.com',
    })
    email!: string;

    @ApiProperty({
        description: 'The password of the user.',
        example: 'P@ssw0rd!',
    })
    password!: string;
}
