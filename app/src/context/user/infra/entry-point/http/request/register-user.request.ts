import { ApiProperty } from '@nestjs/swagger';

/**
 * RegisterUserRequest represents the HTTP request body to register a new user.
 */
export class RegisterUserRequest {
    @ApiProperty({
        description: 'The name of the user.',
        example: 'John Doe',
    })
    name!: string;

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
