import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from '../../../app/command/login.command';
import { RefreshTokenCommand } from '../../../app/command/refresh-token.command';
import { AuthTokens } from '../../../domain/port/token.repository';
import { LoginRequest } from './request/login.request';
import { LoginResponse } from './response/login.response';
import { RefreshTokenRequest } from './request/refresh-token.request';
import { RefreshTokenResponse } from './response/refresh-token.response';
import { ApiLogin } from './swagger/login.swagger';
import { ApiRefreshToken } from './swagger/refresh-token.swagger';

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
        const tokens = await this._commandBus.execute<LoginCommand, AuthTokens>(
            new LoginCommand(request.email, request.password),
        );

        const response = new LoginResponse();
        response.accessToken = tokens.accessToken;
        response.refreshToken = tokens.refreshToken;
        return response;
    }

    /**
     * Issues a new access token from a valid refresh token.
     * @param request - The refresh token request body.
     */
    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    @ApiRefreshToken()
    public async refreshToken(@Body() request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
        const accessToken = await this._commandBus.execute<RefreshTokenCommand, string>(
            new RefreshTokenCommand(request.refreshToken),
        );

        const response = new RefreshTokenResponse();
        response.accessToken = accessToken;
        return response;
    }
}
