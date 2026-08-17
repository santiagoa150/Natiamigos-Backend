import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CRYPTO_REPOSITORY } from './domain/port/crypto.repository';
import { Argon2Repository } from './infra/adapter/crypto/argon2.repository';

/**
 * Is a module that provides shared services and utilities across the application.
 */
@Module({
    exports: [CqrsModule, CRYPTO_REPOSITORY],
    imports: [CqrsModule],
    providers: [Logger, { provide: CRYPTO_REPOSITORY, useClass: Argon2Repository }],
})
export class SharedModule {}
