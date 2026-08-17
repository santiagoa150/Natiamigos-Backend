import { ICommand } from '@nestjs/cqrs';

/**
 * ValidateApiKeyCommand carries the API key to be validated.
 */
export class ValidateApiKeyCommand implements ICommand {
    /**
     * @param apiKey - The API key to validate.
     */
    constructor(public readonly apiKey: string) {}
}
