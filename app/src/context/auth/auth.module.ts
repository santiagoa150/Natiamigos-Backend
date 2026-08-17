import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { ApiKeyApp } from './app/api-key.app';
import { API_KEY_REPOSITORY } from './domain/port/api-key.repository';
import { ApiKeyGuard } from './infra/adapter/nestjs/api-key.guard';
import { NestApiKeyRepository } from './infra/adapter/nestjs/api-key.repository';
import { ValidateApiKeyCommandHandler } from './infra/entry-point/cqrs/validate-api-key.command-handler';

@Module({
    imports: [SharedModule],
    providers: [
        { provide: API_KEY_REPOSITORY, useClass: NestApiKeyRepository },
        ApiKeyApp,
        ValidateApiKeyCommandHandler,
        ApiKeyGuard,
    ],
    exports: [ApiKeyGuard],
})
export class AuthModule {}
