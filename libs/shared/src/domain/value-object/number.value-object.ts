/**
 * NumberValueObject class represents a value object that encapsulates a number value.
 */
export class NumberValueObject {
    /**
     * @param value - The number value to be encapsulated by this value object.
     */
    constructor(protected readonly value: number) {}

    /**
     * Creates a new instance of NumberValueObject with the provided value.
     * @param value - The number value to be encapsulated.
     */
    public static create(value: number): NumberValueObject {
        return new NumberValueObject(value);
    }

    /**
     * @returns The encapsulated number value.
     */
    public toNumber(): number {
        return this.value;
    }
}
