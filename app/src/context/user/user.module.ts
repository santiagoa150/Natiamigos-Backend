import { Module } from '@nestjs/common';
import { SharedModule } from '@shared/shared.module';
import { UserApp } from './app/user.app';
import { USER_REPOSITORY } from './domain/port/user.repository';
import { UserModelProviders } from './infra/adapter/mongodb/user.model';
import { MongoUserRepository } from './infra/adapter/mongodb/user.repository';

@Module({
    imports: [SharedModule],
    providers: [...UserModelProviders, { provide: USER_REPOSITORY, useClass: MongoUserRepository }, UserApp],
    exports: [UserApp],
})
export class UserModule {}
