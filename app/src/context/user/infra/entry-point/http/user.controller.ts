import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { HttpSuccessfulResponse } from '@shared/infra/entry-point/http/http-successful.response';
import { ApiKeyGuard } from '../../../../auth/infra/adapter/nestjs/api-key.guard';
import { User } from '../../../domain/user';
import { RegisterUserCommand } from '../../../app/command/register-user.command';
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
    @UseGuards(ApiKeyGuard)
    @ApiRegisterUser()
    public async register(@Body() request: RegisterUserRequest): Promise<HttpSuccessfulResponse> {
        await this._commandBus.execute<RegisterUserCommand, User>(
            new RegisterUserCommand(request.name, request.email, request.password),
        );
        return new HttpSuccessfulResponse();
    }
}
