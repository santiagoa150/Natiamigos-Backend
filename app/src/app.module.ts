import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '../../lib/shared/src/shared.module';
import { EnvSchema } from './env.schema';
import { resolve } from 'path';

@Module({
    imports: [
        SharedModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: EnvSchema,
            envFilePath: resolve(process.cwd(), 'app/src/.env'),
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
