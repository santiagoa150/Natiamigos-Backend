import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

/**
 * Is a module that provides shared services and utilities across the application.
 */
@Module({
    exports: [CqrsModule],
    imports: [CqrsModule],
    providers: [Logger],
})
export class SharedModule {}
