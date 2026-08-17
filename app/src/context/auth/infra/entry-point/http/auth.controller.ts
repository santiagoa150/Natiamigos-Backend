import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from '../../../app/command/login.command';
import { JwtTokens } from '../../../domain/port/jwt.repository';
import { LoginRequest } from './request/login.request';
import { LoginResponse } from './response/login.response';
import { ApiLogin } from './swagger/login.swagger';

/**
 * AuthController exposes the HTTP endpoints for the Auth context.
 */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    /**
     * @param _commandBus - The command bus used to dispatch auth commands.
     */
    constructor(private readonly _commandBus: CommandBus) {}

    /**
     * Logs in a user.
     * @param request - The login request body.
     */
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiLogin()
    public async login(@Body() request: LoginRequest): Promise<LoginResponse> {
        const tokens = await this._commandBus.execute<LoginCommand, JwtTokens>(
            new LoginCommand(request.email, request.password),
        );

        const response = new LoginResponse();
        response.accessToken = tokens.accessToken;
        response.refreshToken = tokens.refreshToken;
        return response;
    }
}
