import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApiKeyApp } from '../api-key.app';
import { ValidateApiKeyCommand } from './validate-api-key.command';

/**
 * ValidateApiKeyCommandHandler handles the ValidateApiKeyCommand, delegating to the ApiKeyApp use case.
 */
@CommandHandler(ValidateApiKeyCommand)
export class ValidateApiKeyCommandHandler implements ICommandHandler<ValidateApiKeyCommand> {
    /**
     * @param _apiKeyApp - The application service used to validate API keys.
     */
    constructor(private readonly _apiKeyApp: ApiKeyApp) {}

    /**
     * Executes the command, validating the given API key.
     * @param command - The command carrying the API key to validate.
     * @returns Whether the API key is valid.
     */
    public async execute(command: ValidateApiKeyCommand): Promise<boolean> {
        return this._apiKeyApp.validate(command.apiKey);
    }
}
