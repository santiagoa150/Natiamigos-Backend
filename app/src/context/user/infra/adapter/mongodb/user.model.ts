import { FactoryProvider } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { DATABASE_NAME } from '@shared/infra/adapter/mongodb/database-name.constant';
import { UserRecord, UserSchema } from './user.schema';

export const USER_MODEL = Symbol('USER_MODEL');

const connectionToken = getConnectionToken(DATABASE_NAME);

export const UserModelProviders: FactoryProvider[] = [
    {
        provide: USER_MODEL,
        inject: [connectionToken],
        useFactory: (connection: Connection): Model<UserRecord> => connection.model<UserRecord>('User', UserSchema),
    },
];
