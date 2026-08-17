import { Schema } from 'mongoose';
import { UserStatus } from '../../../domain/value-object/user-status.value-object';

/**
 * UserRecord represents the shape of a user document persisted in MongoDB.
 */
export interface UserRecord {
    id: string;
    name: string;
    email: string;
    password: string;
    status: string;
}

export const UserSchema = new Schema<UserRecord>(
    {
        id: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        password: { type: String, required: true },
        status: { type: String, enum: Object.values(UserStatus), required: true },
    },
    { collection: 'users', timestamps: false },
);

UserSchema.index({ id: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
