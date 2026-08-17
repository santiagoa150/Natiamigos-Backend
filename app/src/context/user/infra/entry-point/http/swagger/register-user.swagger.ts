import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiHeader,
    ApiInternalServerErrorResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
    getSchemaPath,
} from '@nestjs/swagger';
import { ExceptionResponse } from '@shared/infra/adapter/nestjs/exception.response';
import { SharedErrorMessages } from '@shared/domain/error/shared-error.constant';
import { HttpSuccessfulResponse } from '@shared/infra/entry-point/http/http-successful.response';
import { AuthErrorMessages } from '../../../../../auth/domain/error/auth-error.constant';
import { API_KEY_HEADER } from '../../../../../auth/infra/adapter/nestjs/api-key.guard';
import { UserErrorMessages } from '../../../../domain/error/user-error.constant';
import { RegisterUserRequest } from '../request/register-user.request';

/**
 * ApiRegisterUser bundles all the Swagger decorators for the register user endpoint.
 */
export function ApiRegisterUser(): MethodDecorator {
    return applyDecorators(
        ApiExtraModels(ExceptionResponse),
        ApiOperation({ summary: 'Registers a new user.' }),
        ApiHeader({ name: API_KEY_HEADER, description: 'The API key used to authenticate the request.' }),
        ApiBody({ type: RegisterUserRequest }),
        ApiCreatedResponse({ description: 'The user was registered successfully.', type: HttpSuccessfulResponse }),
        ApiUnauthorizedResponse({
            description: 'The provided API key is missing or not valid.',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ExceptionResponse) },
                    {
                        properties: {
                            statusCode: { example: HttpStatus.UNAUTHORIZED },
                            message: { example: AuthErrorMessages.invalidApiKey() },
                        },
                    },
                ],
            },
        }),
        ApiBadRequestResponse({
            description: 'The provided data is not valid.',
            content: {
                'application/json': {
                    schema: {
                        allOf: [
                            { $ref: getSchemaPath(ExceptionResponse) },
                            { properties: { statusCode: { example: HttpStatus.BAD_REQUEST } } },
                        ],
                    },
                    examples: {
                        invalidEmail: {
                            summary: 'Invalid email',
                            value: {
                                success: false,
                                statusCode: HttpStatus.BAD_REQUEST,
                                message: UserErrorMessages.invalidEmail('john.doe'),
                            },
                        },
                        invalidPassword: {
                            summary: 'Invalid password',
                            value: {
                                success: false,
                                statusCode: HttpStatus.BAD_REQUEST,
                                message: UserErrorMessages.invalidPassword(),
                            },
                        },
                    },
                },
            },
        }),
        ApiConflictResponse({
            description: 'A user with the given email already exists.',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ExceptionResponse) },
                    {
                        properties: {
                            statusCode: { example: HttpStatus.CONFLICT },
                            message: { example: UserErrorMessages.emailAlreadyExists('john.doe@example.com') },
                        },
                    },
                ],
            },
        }),
        ApiInternalServerErrorResponse({
            description: 'An unexpected error occurred while processing the request.',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ExceptionResponse) },
                    {
                        properties: {
                            statusCode: { example: HttpStatus.INTERNAL_SERVER_ERROR },
                            message: { example: SharedErrorMessages.unexpectedDatabaseError() },
                        },
                    },
                ],
            },
        }),
    );
}
