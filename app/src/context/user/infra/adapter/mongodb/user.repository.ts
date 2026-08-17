import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IdValueObject } from '@shared/domain/value-object/id.value-object';
import { User } from '../../../domain/user';
import { UserRepository } from '../../../domain/port/user.repository';
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
    public async save(user: User): Promise<void> {
        const record = this._mapper.normalize(user);
        await this._model.updateOne({ id: record.id }, record, { upsert: true });
    }

    /**
     * @inheritDoc
     */
    public async findById(id: IdValueObject): Promise<User | null> {
        const record = await this._model.findOne({ id: id.toString() }).lean();
        return record ? this._mapper.create(record) : null;
    }
}
