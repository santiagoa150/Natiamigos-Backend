/**
 * BooleanValueObject class represents a value object that encapsulates a boolean value.
 */
export class BooleanValueObject {
    /**
     * @param value - The boolean value to be encapsulated by this value object.
     */
    constructor(protected readonly value: boolean) {}

    /**
     * Creates a new instance of BooleanValueObject with the provided value.
     * @param value - The boolean value to be encapsulated.
     */
    public static create(value: boolean): BooleanValueObject {
        return new BooleanValueObject(value);
    }

    /**
     * @returns The encapsulated boolean value.
     */
    public toBoolean(): boolean {
        return this.value;
    }
}
