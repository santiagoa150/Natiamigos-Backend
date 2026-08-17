import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
    ApiBody,
    ApiExtraModels,
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse,
    getSchemaPath,
} from '@nestjs/swagger';
import { ExceptionResponse } from '@shared/infra/adapter/nestjs/exception.response';
import { AuthErrorMessages } from '../../../../domain/error/auth-error.constant';
import { RefreshTokenRequest } from '../request/refresh-token.request';
import { RefreshTokenResponse } from '../response/refresh-token.response';

/**
 * ApiRefreshToken bundles all the Swagger decorators for the refresh token endpoint.
 */
export function ApiRefreshToken(): MethodDecorator {
    return applyDecorators(
        ApiExtraModels(ExceptionResponse),
        ApiOperation({ summary: 'Issues a new access token from a valid refresh token.' }),
        ApiBody({ type: RefreshTokenRequest }),
        ApiOkResponse({ description: 'A new access token was issued successfully.', type: RefreshTokenResponse }),
        ApiUnauthorizedResponse({
            description: 'The provided refresh token is not valid or has expired.',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ExceptionResponse) },
                    {
                        properties: {
                            statusCode: { example: HttpStatus.UNAUTHORIZED },
                            message: { example: AuthErrorMessages.invalidRefreshToken() },
                        },
                    },
                ],
            },
        }),
    );
}
