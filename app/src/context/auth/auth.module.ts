import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '@shared/shared.module';
import { ApiKeyApp } from './app/api-key.app';
import { LoginApp } from './app/login.app';
import { LoginCommandHandler } from './app/command/login.command-handler';
import { ValidateApiKeyCommandHandler } from './app/command/validate-api-key.command-handler';
import { API_KEY_REPOSITORY } from './domain/port/api-key.repository';
import { JWT_REPOSITORY } from './domain/port/jwt.repository';
import { AuthController } from './infra/entry-point/http/auth.controller';
import { ApiKeyGuard } from './infra/adapter/nestjs/api-key.guard';
import { NestApiKeyRepository } from './infra/adapter/nestjs/api-key.repository';
import { NestJwtRepository } from './infra/adapter/nestjs/jwt.repository';

@Module({
    imports: [SharedModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [
        { provide: API_KEY_REPOSITORY, useClass: NestApiKeyRepository },
        { provide: JWT_REPOSITORY, useClass: NestJwtRepository },
        ApiKeyApp,
        LoginApp,
        ValidateApiKeyCommandHandler,
        LoginCommandHandler,
        ApiKeyGuard,
    ],
    exports: [ApiKeyGuard],
})
export class AuthModule {}
