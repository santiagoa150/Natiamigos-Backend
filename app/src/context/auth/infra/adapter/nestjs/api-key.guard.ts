import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { Exception } from '@shared/domain/error/exception';
import { AuthErrorMessages } from '../../../domain/error/auth-error.constant';
import { ValidateApiKeyCommand } from '../../entry-point/cqrs/validate-api-key.command';

export const API_KEY_HEADER = 'x-api-key';

/**
 * ApiKeyGuard protects routes behind a valid API key, dispatching a ValidateApiKeyCommand
 * through the CQRS command bus to perform the actual validation.
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
    /**
     * @param _commandBus - The command bus used to dispatch the ValidateApiKeyCommand.
     */
    constructor(private readonly _commandBus: CommandBus) {}

    /**
     * @inheritDoc
     */
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const apiKey = request.headers[API_KEY_HEADER];

        const isValid =
            typeof apiKey === 'string' &&
            (await this._commandBus.execute<ValidateApiKeyCommand, boolean>(new ValidateApiKeyCommand(apiKey)));

        if (!isValid) {
            throw new Exception(AuthErrorMessages.invalidApiKey(), HttpStatus.UNAUTHORIZED);
        }
        return true;
    }
}
