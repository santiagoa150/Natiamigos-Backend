import { User } from '../../../domain/user';
import { UserDto } from './user.dto';

/**
 * UserDtoMapper converts between the User domain entity and its UserDto representation.
 */
export class UserDtoMapper {
    /**
     * Creates a User domain entity from a UserDto.
     * @param dto - The UserDto to convert.
     * @returns The resulting User domain entity.
     */
    public create(dto: UserDto): User {
        return User.create(dto.id, dto.name, dto.email, dto.password, dto.status);
    }

    /**
     * Normalizes a User domain entity into its UserDto representation.
     * @param domain - The User domain entity to convert.
     * @returns The resulting UserDto.
     */
    public normalize(domain: User): UserDto {
        const dto = new UserDto();
        dto.id = domain.id.toString();
        dto.name = domain.name.toString();
        dto.email = domain.email.toString();
        dto.status = domain.status.toString();
        // The password is intentionally left unset to avoid exposing it in API responses.
        return dto;
    }
}
