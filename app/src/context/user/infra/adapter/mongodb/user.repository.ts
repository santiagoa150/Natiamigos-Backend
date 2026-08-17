import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IdValueObject } from '@shared/domain/value-object/id.value-object';
import { Exception } from '@shared/domain/error/exception';
import { SharedErrorMessages } from '@shared/domain/error/shared-error.constant';
import { User } from '../../../domain/user';
import { UserRepository } from '../../../domain/port/user.repository';
import { EmailValueObject } from '../../../domain/value-object/email.value-object';
import { UserRecordMapper } from './user-record.mapper';
import { USER_MODEL } from './user.model';
import { UserRecord } from './user.schema';

/**
 * MongoUserRepository is the MongoDB implementation of the UserRepository port.
 */
@Injectable()
export class MongoUserRepository implements UserRepository {
    private readonly _mapper = new UserRecordMapper();

    /**
     * @param _model - The Mongoose model used to persist and query users.
     */
    constructor(@Inject(USER_MODEL) private readonly _model: Model<UserRecord>) {}

    /**
     * @inheritDoc
     */
    public async create(user: User): Promise<void> {
        try {
            await this._model.create(this._mapper.normalize(user));
        } catch (error) {
            throw new Exception(SharedErrorMessages.unexpectedDatabaseError(), HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    /**
     * @inheritDoc
     */
    public async getById(id: IdValueObject): Promise<User | null> {
        try {
            const record = await this._model.findOne({ id: id.toString() }).lean();
            return record ? this._mapper.create(record) : null;
        } catch (error) {
            throw new Exception(SharedErrorMessages.unexpectedDatabaseError(), HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }

    /**
     * @inheritDoc
     */
    public async getByEmail(email: EmailValueObject): Promise<User | null> {
        try {
            const record = await this._model.findOne({ email: email.toString() }).lean();
            return record ? this._mapper.create(record) : null;
        } catch (error) {
            throw new Exception(SharedErrorMessages.unexpectedDatabaseError(), HttpStatus.INTERNAL_SERVER_ERROR, error);
        }
    }
}
