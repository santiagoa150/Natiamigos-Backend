import { Module } from '@nestjs/common';
import { UserModelProviders } from './infra/adapter/mongodb/user.model';

@Module({
    providers: [...UserModelProviders],
})
export class UserModule {}
