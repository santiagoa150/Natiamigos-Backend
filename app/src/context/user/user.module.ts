import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { UserApp } from './app/user.app';
import { USER_REPOSITORY } from './domain/port/user.repository';
import { RegisterUserCommandHandler } from './app/command/register-user.command-handler';
import { GetUserByEmailQueryHandler } from './app/query/get-user-by-email.query-handler';
import { UserController } from './infra/entry-point/http/user.controller';
import { UserModelProviders } from './infra/adapter/mongodb/user.model';
import { MongoUserRepository } from './infra/adapter/mongodb/user.repository';

@Module({
    imports: [SharedModule, AuthModule],
    controllers: [UserController],
    providers: [
        ...UserModelProviders,
        { provide: USER_REPOSITORY, useClass: MongoUserRepository },
        UserApp,
        RegisterUserCommandHandler,
        GetUserByEmailQueryHandler,
    ],
    exports: [UserApp],
})
export class UserModule {}
