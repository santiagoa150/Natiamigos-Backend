/**
 * StringValueObject class represents a value object that encapsulates a string value.
 */
export class StringValueObject {
    /**
     * @param value - The string value to be encapsulated by this value object.
     */
    constructor(protected readonly value: string) {}

    /**
     * Creates a new instance of StringValueObject with the provided value.
     * @param value - The string value to be encapsulated.
     */
    public static create(value: string): StringValueObject {
        return new StringValueObject(value);
    }

    /**
     * @returns The encapsulated string value.
     */
    public toString(): string {
        return this.value;
    }
}
