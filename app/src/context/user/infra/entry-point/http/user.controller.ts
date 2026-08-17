import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { HttpSuccessfulResponse } from '@shared/infra/entry-point/http/http-successful.response';
import { User } from '../../../domain/user';
import { RegisterUserCommand } from '../cqrs/register-user.command';
import { RegisterUserRequest } from './request/register-user.request';
import { ApiRegisterUser } from './swagger/register-user.swagger';

/**
 * UserController exposes the HTTP endpoints for the User context.
 */
@ApiTags('Users')
@Controller('users')
export class UserController {
    /**
     * @param _commandBus - The command bus used to dispatch user commands.
     */
    constructor(private readonly _commandBus: CommandBus) {}

    /**
     * Registers a new user.
     * @param request - The registration request body.
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiRegisterUser()
    public async register(@Body() request: RegisterUserRequest): Promise<HttpSuccessfulResponse> {
        await this._commandBus.execute<RegisterUserCommand, User>(
            new RegisterUserCommand(request.name, request.email, request.password),
        );
        return new HttpSuccessfulResponse();
    }
}
