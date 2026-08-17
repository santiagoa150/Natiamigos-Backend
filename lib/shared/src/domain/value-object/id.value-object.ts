import { StringValueObject } from './string.value-object';
import { v4 as uuid } from 'uuid';

/**
 * IdValueObject class represents a value object that encapsulates a unique identifier (UUID).
 * It extends the StringValueObject to provide a specific implementation for IDs.
 */
export class IdValueObject extends StringValueObject {
    /**
     * Creates an instance of IdValueObject.
     * @returns The encapsulated UUID as a string.
     */
    static generate(): IdValueObject {
        return new IdValueObject(uuid());
    }
}
