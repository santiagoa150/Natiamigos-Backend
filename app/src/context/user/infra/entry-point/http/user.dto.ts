import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../../../domain/value-object/user-status.value-object';

/**
 * UserDto represents the data transfer object for a user.
 */
export class UserDto {
    @ApiProperty({
        description: 'The unique identifier of the user.',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    id!: string;

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
        description: 'The status of the user.',
        enum: UserStatus,
        example: UserStatus.ACTIVE,
    })
    status!: string;
}
