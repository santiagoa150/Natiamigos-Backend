import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../../lib/shared/src/shared.module';
import { EnvSchema } from './env.schema';
import { resolve } from 'path';
import { DATABASE_NAME } from '@shared/index';
import { UserModule } from './context/user/user.module';

@Module({
    imports: [
        SharedModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: EnvSchema,
            envFilePath: resolve(process.cwd(), 'app/src/.env'),
        }),
        MongooseModule.forRootAsync({
            connectionName: DATABASE_NAME,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
            }),
        }),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
