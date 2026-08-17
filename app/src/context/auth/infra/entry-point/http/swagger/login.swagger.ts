import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
    ApiBody,
    ApiExtraModels,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
    getSchemaPath,
} from '@nestjs/swagger';
import { ExceptionResponse } from '@shared/infra/adapter/nestjs/exception.response';
import { SharedErrorMessages } from '@shared/domain/error/shared-error.constant';
import { AuthErrorMessages } from '../../../../domain/error/auth-error.constant';
import { LoginRequest } from '../request/login.request';
import { LoginResponse } from '../response/login.response';

/**
 * ApiLogin bundles all the Swagger decorators for the login endpoint.
 */
export function ApiLogin(): MethodDecorator {
    return applyDecorators(
        ApiExtraModels(ExceptionResponse),
        ApiOperation({ summary: 'Logs in a user, returning a new pair of access and refresh tokens.' }),
        ApiBody({ type: LoginRequest }),
        ApiOkResponse({ description: 'The user was logged in successfully.', type: LoginResponse }),
        ApiUnauthorizedResponse({
            description: 'The provided email or password is not valid.',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ExceptionResponse) },
                    {
                        properties: {
                            statusCode: { example: HttpStatus.UNAUTHORIZED },
                            message: { example: AuthErrorMessages.invalidCredentials() },
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
